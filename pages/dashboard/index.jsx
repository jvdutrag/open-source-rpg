import Head from 'next/head';
import { useRouter } from 'next/router';
import { withStyles } from '@mui/styles';
import { Grid, Container } from '@mui/material';

import { Header, DashboardBox, CharacterBox, AddBox } from '../../components';

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

  const createCharacter = async () => {
    const name = prompt('Digite o nome do personagem');

    if(!name) {
      return;
    }
    
    api.post('/character', { name })
      .then(() => {
        refreshData();
      })
      .catch(() => {
        alert('Erro ao criar o personagem!');
      });
  }

  const deleteCharacter = async id => {
    const confirmation = confirm('Deseja apagar este personagem?');

    if(!confirmation) {
      return;
    }

    api.delete(`/character/${id}`)
      .then(() => {
        refreshData();
      })
      .catch(() => {
        alert('Erro ao apagar este personagem!');
      });
  }

  return (
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
                      deleteCharacter={deleteCharacter}
                    />
                  </Grid>
                ))
              }
              <Grid item xs={12} md={4}>
                <AddBox onClick={createCharacter} />
              </Grid>
            </Grid>
          </DashboardBox>
        </Grid>

      </Grid>
    </Container>
  )
}

const styles = theme => ({ });

export default withStyles(styles)(Dashboard);
