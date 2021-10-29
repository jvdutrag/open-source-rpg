import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { Container } from '@mui/material';
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

function Portrait({
  classes,
  character
}) {
    const [isDead, setIsDead] = useState(false);

    const [hitPoints, setHitPoints] = useState({
      current: 0,
      max: 0
    });

    const updateHitPoints = data => {
      if(data.current === 0) {
        setIsDead(true);
      } else {
        setIsDead(false);
      }

      setHitPoints({
        current: data.current,
        max: data.max
      });
    }

    const getCharacterPicture = () => {
      let pictureNumber;

      if(hitPoints.current > (hitPoints.max / 2)) {
        pictureNumber = 1;
      }
      else {
        pictureNumber = 2;
      }

      return `/assets/characters/${character.id}/${pictureNumber}.png`;
    }

    useEffect(() => {
      updateHitPoints({
        current: character.current_hit_points,
        max: character.max_hit_points
      });
    }, [character]);

    if(!character) {
      return (
          <div>Personagem não existe!</div>
      );
    }

    useEffect(() => {
      socket.emit('room:join', 'portrait');

      socket.on('update_hit_points', data => {
        updateHitPoints(data);
      });
    }, [socket]);

    return (
      <Container className={classes.root}>
        <Head>
            <title>Portrait de {character.name} | RPG</title>
        </Head>
        <div style={{ backgroundColor: 'lightblue', color: 'black', fontSize: '50px' }}>
            <Image
              width={300}
              height={300}
              src={getCharacterPicture()}
              className={isDead ? classes.deadCharacterPicture : ''}
            />
            {hitPoints.current}/{hitPoints.max}
        </div>
      </Container>
    )
}

const styles = (theme) => ({
  root: {
    backgroundColor: 'transparent'
  },

  deadCharacterPicture: {
    filter: 'brightness(0%)'
  }
});

export default withStyles(styles)(Portrait);
