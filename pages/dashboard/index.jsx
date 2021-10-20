import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withStyles } from '@mui/styles';
import { Grid, Container, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { Header, Section, CharacterBox, AddBox,
  CreateCharacterModal, ConfirmationModal, EditableRow,
  AttributeModal, SkillModal
} from '../../components';

import { PrismaClient } from '@prisma/client';

import { api } from '../../utils';
import useModal from '../../hooks/useModal';

const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const characters = await prisma.character.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  const attributes = await prisma.attribute.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  const skills = await prisma.skill.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });

  const serializedCharacters = JSON.parse(JSON.stringify(characters));
  const serializedAttributes = JSON.parse(JSON.stringify(attributes));
  const serializedSkills = JSON.parse(JSON.stringify(skills));

  return {
    props: {
      characters: serializedCharacters,
      attributes: serializedAttributes,
      skills: serializedSkills,
    },
  };
};

function Dashboard({
  classes,

  characters,
  attributes,
  skills,
}) {
  const router = useRouter();

  const refreshData = () => {
    return router.replace(router.asPath);
  }

  const confirmationModal = useModal(({ close, custom }) => (
    <ConfirmationModal
      title={custom.title}
      text={custom.text}
      data={custom.data}
      handleClose={close}
      onConfirmation={(data) => {
        const { id, type } = data;

        api
          .delete(`/${type}/${id}`)
          .then(() => {
            refreshData();
          })
          .catch(() => {
            alert(`Erro ao apagar: ${type}`);
          });
      }}
    />
  ));

  const createCharacterModal = useModal(({ close }) => (
    <CreateCharacterModal
      handleClose={close}
      onCharacterCreated={() => {
        refreshData();
      }}
    />
  ));

  const attributeModal = useModal(({ close, custom }) => (
    <AttributeModal
      handleClose={close}
      data={custom.data || null}
      onSubmit={() => {
        refreshData();
      }}
      operation={custom.operation}
    />
  ));

  const skillModal = useModal(({ close, custom }) => (
    <SkillModal
      handleClose={close}
      data={custom.data || null}
      onSubmit={() => {
        refreshData();
      }}
      operation={custom.operation}
    />
  ));

  return (
    <>
      <Container maxWidth="lg" style={{ marginBottom: '30px' }}>
        <Head>
          <title>Dashboard do Mestre | RPG</title>
        </Head>

        <Grid container item spacing={3}>
          <Header title="Dashboard do Mestre" />

          <Grid item xs={12}>
            <Section
              title="Fichas e personagens"
            >
              <Grid item container xs={12} spacing={3}>
                {characters.map((character, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <CharacterBox
                      character={character}
                      deleteCharacter={() =>
                        confirmationModal.appear({
                          title: 'Apagar personagem',
                          text: 'Deseja apagar este personagem?',
                          data: { id: character.id, type: 'character' },
                        })
                      }
                    />
                  </Grid>
                ))}
                <Grid item xs={12} md={4}>
                  <AddBox onClick={() => createCharacterModal.appear()} />
                </Grid>
              </Grid>
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              title="Atributos"
              renderButton={() => (
                <Button
                  variant="outlined"
                  style={{
                    display: 'flex',
                    alignSelf: 'center',
                  }}
                  onClick={() => attributeModal.appear({ operation: 'create' })}
                >
                  <AddIcon />
                </Button>
              )}
            >
              <Grid
                item
                container
                xs={12}
                spacing={2}
                className={classes.scrollableBox}
              >
                {attributes.map((attribute, index) => (
                  <Grid item xs={12} key={index}>
                    <EditableRow
                      data={attribute}
                      editRow={(data) => {
                        attributeModal.appear({ operation: 'edit', data });
                      }}
                      deleteRow={(data) => {
                        confirmationModal.appear({
                          title: 'Apagar atributo',
                          text: 'Deseja apagar este atributo?',
                          data: { id: data.id, type: 'attribute' },
                        });
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              title="Perícias"
              renderButton={() => (
                <Button
                  variant="outlined"
                  style={{
                    display: 'flex',
                    alignSelf: 'center',
                  }}
                  onClick={() => skillModal.appear({ operation: 'create' })}
                >
                  <AddIcon />
                </Button>
              )}
            >
              <Grid
                item
                container
                xs={12}
                spacing={2}
                className={classes.scrollableBox}
              >
                {skills.map((skill, index) => (
                  <Grid item xs={12} key={index}>
                    <EditableRow
                      data={skill}
                      editRow={(data) => {
                        skillModal.appear({ operation: 'edit', data })
                      }}
                      deleteRow={(data) => {
                        confirmationModal.appear({
                          title: 'Apagar perícia',
                          text: 'Deseja apagar esta perícia?',
                          data: { id: data.id, type: 'skill' },
                        });
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Section>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const styles = (theme) => ({
  scrollableBox: {
    overflow: 'auto',
    maxHeight: '300px',
    paddingRight: '10px',
  },
});

export default withStyles(styles)(Dashboard);
