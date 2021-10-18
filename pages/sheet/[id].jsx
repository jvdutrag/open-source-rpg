import React, { useState } from 'react';
import { Formik } from 'formik';
import Head from 'next/head';

import { Grid, Container } from '@mui/material';
import { PrismaClient } from '@prisma/client';
import { api } from '../../utils';

import {
  Header, Section
} from '../../components';

import {
  CharacterInfoForm
} from '../../components/forms'

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
      rawCharacter: serialized
    }
  }
}

export default function Sheet({ rawCharacter }) {
  if(!rawCharacter) {
    return (
      <div>Personagem não existe!</div>
    );
  }

  const [character, setCharacter] = useState(rawCharacter);

  const onCharacterInfoSubmit = async values => {
    return new Promise((resolve, reject) => {
      api.put(`/character/${character.id}`, values)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
    });
  }

  return (
    <Container maxWidth="lg" style={{ marginBottom: '30px' }}>
        <Head>
          <title>Ficha de {character.name} | RPG</title>
        </Head>

        <Grid container item spacing={3}>
          <Header title={`Ficha de ${character.name}`} />

          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={6}>
              <Section
                title="Detalhes pessoais"
              >
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={12}>
                    <CharacterInfoForm
                      initialValues={character}
                      onSubmit={onCharacterInfoSubmit}
                    />
                  </Grid>
                </Grid>
              </Section>
            </Grid>
            <Grid item xs={12} md={6}>
              ...
            </Grid>
          </Grid>

        </Grid>
      </Container>
  )
}
