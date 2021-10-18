import React, { useState } from 'react';
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

const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const characters = await prisma.character.findMany({
    orderBy: [
        {
            name: 'asc',
        }
    ]
  });

  const attributes = await prisma.attribute.findMany({
    orderBy: [
        {
            name: 'asc',
        }
    ]
  });
  
  const skills = await prisma.skill.findMany({
    orderBy: [
        {
            name: 'asc',
        }
    ]
  });

  const serializedCharacters = JSON.parse(JSON.stringify(characters));
  const serializedAttributes = JSON.parse(JSON.stringify(attributes));
  const serializedSkills = JSON.parse(JSON.stringify(skills));

  return {
    props: {
      characters: serializedCharacters,
      attributes: serializedAttributes,
      skills: serializedSkills
    }
  }
}

function Dashboard({
  classes,

  characters,
  attributes,
  skills
}) {
  const router = useRouter();

  const refreshData = () => {
    return router.replace(router.asPath);
  }

  // Modals
  const [createCharacterModal, setCreateCharacterModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [attributeModal, setAttributeModal] = useState(false);
  const [skillModal, setSkillModal] = useState(false);

  // State Modals
  const [dataToConfirmationModal, setDataToConfirmationModal] = useState({
    title: '',
    text: '',
    data: null
  });

  const [dataToAttributeModal, setDataToAttributeModal] = useState(null);
  const [attributeModalOperation, setAttributeModalOperation] = useState(null);

  const [dataToSkillModal, setDataToSkillModal] = useState(null);
  const [skillModalOperation, setSkillModalOperation] = useState(null);

  const openConfirmationModal = (title, text, data) => {
    setDataToConfirmationModal({
      title,
      text,
      data
    });

    setConfirmationModal(true);
  }

  const openAttributeModal = (operation, data = null) => {
    setDataToAttributeModal(data);

    setAttributeModal(true);

    setAttributeModalOperation(operation);
  }

  const openSkillModal = (operation, data = null) => {
    setDataToSkillModal(data);

    setSkillModal(true);

    setSkillModalOperation(operation);
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
          const { id, type } = data;

          api.delete(`/${type}/${id}`)
            .then(() => {
              refreshData();
            })
            .catch(() => {
              alert(`Erro ao apagar: ${type}`);
            });
        }}
      />

      <AttributeModal
        open={attributeModal}
        handleClose={() => setAttributeModal(false)}
        data={dataToAttributeModal}
        onSubmit={() => {
          refreshData();
        }}
        operation={attributeModalOperation}
      />

      <SkillModal
        open={skillModal}
        handleClose={() => setSkillModal(false)}
        data={dataToSkillModal}
        onSubmit={() => {
          refreshData();
        }}
        operation={skillModalOperation}
      />
      
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
                {
                  characters.map((character, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <CharacterBox
                        character={character}
                        deleteCharacter={() => openConfirmationModal('Apagar personagem', 'Deseja apagar este personagem?', { id: character.id, type: 'character' })}
                      />
                    </Grid>
                  ))
                }
                <Grid item xs={12} md={4}>
                  <AddBox onClick={() => setCreateCharacterModal(true)} />
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
                    alignSelf: 'center'
                  }}
                  onClick={() => openAttributeModal('create')}
                >
                  <AddIcon />
                </Button>
              )}
            >
              <Grid item container xs={12} spacing={2} className={classes.scrollableBox}>
                {
                  attributes.map((attribute, index) => (
                    <Grid item xs={12} key={index}>
                      <EditableRow
                        data={attribute}
                        editRow={data => {
                          openAttributeModal('edit', data);
                        }}
                        deleteRow={data => {
                          openConfirmationModal('Apagar atributo', 'Deseja apagar este atributo?', { id: data.id, type: 'attribute' })
                        }}
                      />
                    </Grid>
                  ))
                }
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
                    alignSelf: 'center'
                  }}
                  onClick={() => openSkillModal('create')}
                >
                  <AddIcon />
                </Button>
              )}
            >
              <Grid item container xs={12} spacing={2} className={classes.scrollableBox}>
                {
                  skills.map((skill, index) => (
                    <Grid item xs={12} key={index}>
                      <EditableRow
                        data={skill}
                        editRow={data => {
                          openSkillModal('edit', data);
                        }}
                        deleteRow={data => {
                          openConfirmationModal('Apagar perícia', 'Deseja apagar esta perícia?', { id: data.id, type: 'skill' })
                        }}
                      />
                    </Grid>
                  ))
                }
              </Grid>
            </Section>
          </Grid>

        </Grid>
      </Container>
    </>
  )
}

const styles = theme => ({
  scrollableBox: {
    overflow: 'auto',
    maxHeight: '300px',
    paddingRight: '10px'
  }
});

export default withStyles(styles)(Dashboard);
