import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
    const router = useRouter();

    const showOptions = router.query.show || '';
    
    const [isDead, setIsDead] = useState(false);

    const [showOnly, setShowOnly] = useState({
      picture: false,
      name: false,
      stats: false
    });

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
      if(character.standard_character_picture_url && character.injured_character_picture_url) {
        if(hitPoints.current > (hitPoints.max / 2)) {
          return character.standard_character_picture_url;
        }
        else {
          return character.injured_character_picture_url;
        }
      } else {
        return `/assets/user.png`
      }
    }

    useEffect(() => {
      document.body.style.backgroundColor = 'transparent';

      const splitShowOptions = showOptions.split(',');

      splitShowOptions.forEach(option => {
        setShowOnly(prevState => ({
          ...prevState,
          [option]: true
        }));
      });

      updateHitPoints({
        current: character.current_hit_points,
        max: character.max_hit_points
      });
    }, [character, showOptions]);

    useEffect(() => {
      socket.emit('room:join', `portrait_character_${character.id}`);

      socket.on('update_hit_points', data => {
        updateHitPoints(data);
      });
    }, [character]);

    if(!character) {
      return (
          <div>Personagem não existe!</div>
      );
    }

    return (
      <React.Fragment>
        <Head>
            <title>Portrait de {character.name} | RPG</title>
        </Head>
        <div className={classes.container}>
          <div style={{ display: showOnly.picture ? 'block' : 'none' }}>
            <Image
              width={400}
              height={600}
              layout="fixed"
              src={getCharacterPicture()}
              alt=""
              className={isDead ? classes.deadPicture : ''}
            />
          </div>
          <div>
              <div className={classes.name} style={{ display: showOnly.name ? 'block' : 'none' }}>
                {character.name}
              </div>
              <div style={{ display: showOnly.stats ? 'block' : 'none' }}>
                <span className={classes.hitPoints}>
                  {hitPoints.current}/{hitPoints.max}
                </span>
              </div>
          </div>
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
  },

  name: {
    textTransform: 'uppercase',
    fontSize: '72px',
    color: '#fff',
    textShadow: '0 0 10px #FFFFFF'
  },

  hitPoints: {
    textTransform: 'uppercase',
    fontSize: '62px',
    color: '#ffe2e2',
    textShadow: '0 0 10px #ff0000'
  },

  deadPicture: {
    filter: 'brightness(0%)'
  }
});

export default withStyles(styles)(Portrait);
