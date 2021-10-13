import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withStyles } from '@mui/styles';
import { Grid, Container } from '@mui/material';

import { Header, DashboardBox, CharacterBox, AddBox,
  CreateCharacterModal, ConfirmationModal
} from '../../components';

import { PrismaClient } from '@prisma/client';

import { api } from '../../utils';

const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const characters = await prisma.character.findMany();

  const serialized = JSON.parse(JSON.stringify(characters));

  return {
    props: {
      characters: serialized
    }
  }
}

function Dashboard({
  classes,
  characters
}) {
  const router = useRouter();

  const refreshData = () => {
    return router.replace(router.asPath);
  }

  // Modals
  const [createCharacterModal, setCreateCharacterModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  // State Modals
  const [dataToConfirmationModal, setDataToConfirmationModal] = useState({
    title: '',
    text: '',
    data: null
  });

  const openConfirmationModal = (title, text, data) => {
    setDataToConfirmationModal({
      title,
      text,
      data
    });

    setConfirmationModal(true);
  }

  return (
    <>
      <CreateCharacterModal
        open={createCharacterModal}
        handleClose={() => setCreateCharacterModal(false)}
        onCharacterCreated={() => {
          refreshData();
        }}
      />
      <ConfirmationModal
        title={dataToConfirmationModal.title}
        text={dataToConfirmationModal.text}
        data={dataToConfirmationModal.data}
        open={confirmationModal}
        handleClose={() => setConfirmationModal(false)}
        onConfirmation={data => {
          const { id } = data;

          api.delete(`/character/${id}`)
            .then(() => {
              refreshData();
            })
            .catch(() => {
              alert('Erro ao apagar este personagem!');
            });
        }}
      />
      

      <Container maxWidth="lg" style={{ marginBottom: '30px' }}>
        <Head>
          <title>Dashboard do Mestre | RPG</title>
        </Head>

        <Grid container item spacing={3}>
          <Header title="Dashboard do Mestre" />

          <Grid item xs={12}>
            <DashboardBox
              title="Fichas e personagens"
            >
              <Grid item container xs={12} spacing={3}>
                {
                  characters.map((character, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <CharacterBox
                        character={character}
                        deleteCharacter={() => openConfirmationModal('Apagar personagem', 'Deseja apagar este personagem?', { id: character.id })}
                      />
                    </Grid>
                  ))
                }
                <Grid item xs={12} md={4}>
                  <AddBox onClick={() => setCreateCharacterModal(true)} />
                </Grid>
              </Grid>
            </DashboardBox>
          </Grid>

        </Grid>
      </Container>
    </>
  )
}

const styles = theme => ({ });

export default withStyles(styles)(Dashboard);
