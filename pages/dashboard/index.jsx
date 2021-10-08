import Head from 'next/head'
import { withStyles } from '@mui/styles'
import { Grid, Container, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import { Header, DashboardBox, CharacterBox } from '../../components'

import { PrismaClient } from '@prisma/client';

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
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Dashboard do Mestre | RPG</title>
      </Head>

      <Grid container item spacing={3}>
        <Header title="Dashboard do Mestre" />

        <Grid item xs={12}>
          <DashboardBox
            title="Fichas e personagens"
            renderAddButton={() => (
              <Button variant="contained">
                <AddIcon />
              </Button>
            )}
          >
            <Grid item container xs={12} spacing={3}>
              {
                characters.map((character, index) => (
                    <CharacterBox
                      key={index}
                      character={character}
                    />
                ))
              }
            </Grid>
          </DashboardBox>
        </Grid>

      </Grid>
    </Container>
  )
}

const styles = theme => ({ });

export default withStyles(styles)(Dashboard);
