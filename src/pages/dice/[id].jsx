import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { withStyles } from '@mui/styles';
import { PrismaClient } from '@prisma/client';

import socket from '../../utils/socket';

const prisma = new PrismaClient();

export const getServerSideProps = async ({ params }) => {
  const characterId = isNaN(params.id) ? null : Number(params.id);

  if(!characterId) {
    return {
      props: {
        character: null
      }
    }
  }

  const character = await prisma.character.findUnique({
    where: {
      id: characterId
    }
  });

  if(!character) {
    return {
      props: {
        character: null
      }
    }
  }

  const serialized = JSON.parse(JSON.stringify(character));

  return {
    props: {
        character: serialized
    }
  }
}

function Dice({
  classes,
  character
}) {
  const [currentDice, setCurrentDice] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
  }, []);

  if(!character) {
    return (
        <div>Personagem não existe!</div>
    )
  }

  useEffect(() => {
    socket.emit('room:join', `dice_character_${character.id}`);

    socket.on('dice_roll', data => {
      if(data.rolls.length > 1) {
        return;
      }

      setCurrentDice(data.rolls[0]);

      setTimeout(() => {
        setCurrentDice(null);
      }, 5 * 1000);
    });
  }, [socket]);

  return (
    <React.Fragment>
      <Head>
          <title>Dados de {character.name} | RPG</title>
      </Head>
      <div className={classes.container}>
        {
          currentDice && (
            <h1 style={{ fontSize: '100px', color: '#fff' }}>{currentDice.rolled_number}</h1>
          )
        }
      </div>
    </React.Fragment>
  )
}

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Fruktur'
  }
});

export default withStyles(styles)(Dice);
