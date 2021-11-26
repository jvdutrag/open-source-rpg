import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Queue from 'js-queue';

import { withStyles } from '@mui/styles';

import socket from '../../utils/socket';

import { prisma } from '../../database';

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

  const configs = await prisma.config.findMany();

  const serialized = JSON.parse(JSON.stringify(character));

  return {
    props: {
        character: serialized,
        config: {
          diceOnScreenTimeoutInMS: parseInt(configs.find(config => config.name === 'DICE_ON_SCREEN_TIMEOUT_IN_MS').value),
          timeBetweenDicesInMS: parseInt(configs.find(config => config.name === 'TIME_BETWEEN_DICES_IN_MS').value),
        }
    }
  }
}

function Dice({
  classes,
  character,
  config
}) {
  const queue = useMemo(() => new Queue(), []);

  const [currentDice, setCurrentDice] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
  }, []);

  useEffect(() => {
    function showDiceOnScreen(roll) {
      setCurrentDice(roll);
  
      setTimeout(() => {
        // Remove Dice
        setCurrentDice(null);
      }, config.diceOnScreenTimeoutInMS);
  
      setTimeout(() => {
        this.next();
      }, config.diceOnScreenTimeoutInMS + config.timeBetweenDicesInMS);
    }

    socket.emit('room:join', `dice_character_${character.id}`);

    socket.on('dice_roll', data => {
      data.rolls.forEach(roll => {
        queue.add(showDiceOnScreen.bind(queue, roll));
      });
    });
  }, [character, queue, config]);

  if(!character) {
    return (
        <div>Personagem não existe!</div>
    )
  }

  return (
    <React.Fragment>
      <Head>
          <title>Dados de {character.name} | RPG</title>
      </Head>
      <div className={classes.container}>
          {
            currentDice && (
              <div className={classes.diceContainer}>
                  <div>
                    <video width="600" height="600" autoPlay muted className={classes.diceVideo}>
                      <source src="/assets/dice.webm" type="video/webm" />
                    </video>
                  </div>
                  <div className={classes.diceResult}>
                    <span className={classes.diceNumber}>{currentDice.rolled_number}</span>
                  </div>
              </div>
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
    fontFamily: 'Fruktur',
    userSelect: 'none'
  },
  diceContainer: {
    position: 'relative'
  },
  diceResult: {
    position: 'absolute',
    top: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  diceNumber: {
    zIndex: 2,
    fontSize: '150px',
    textShadow: '0 0 10px #FFFFFF'
  }
});

export default withStyles(styles)(Dice);
