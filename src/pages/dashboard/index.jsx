import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withStyles } from '@mui/styles';
import { Grid, Container, Button, TextField } from '@mui/material';
import {
  Add as AddIcon
} from '@mui/icons-material';

import { Header, Section, CharacterBox, AddBox,
  CreateCharacterModal, ConfirmationModal, EditableRow,
  AttributeModal, SkillModal
} from '../../components';

import { api } from '../../utils';
import useModal from '../../hooks/useModal';

import { prisma } from '../../database';

export const getServerSideProps = async () => {
  function parseConfigs(array) {
    return array.map(config => {
      if(config.name === 'DICE_ON_SCREEN_TIMEOUT_IN_MS' || 'TIME_BETWEEN_DICES_IN_MS') {
        return {
          ...config,
          value: parseInt(config.value) / 1000
        }
      }

      return config;
    });
  }

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

  const configs = await prisma.config.findMany();

  const serializedCharacters = JSON.parse(JSON.stringify(characters));
  const serializedAttributes = JSON.parse(JSON.stringify(attributes));
  const serializedSkills = JSON.parse(JSON.stringify(skills));
  const serializedConfigs = JSON.parse(JSON.stringify(parseConfigs(configs)));

  return {
    props: {
      characters: serializedCharacters,
      attributes: serializedAttributes,
      skills: serializedSkills,
      configs: serializedConfigs
    },
  };
}

function Dashboard({
  classes,

  characters,
  attributes,
  skills,
  configs
}) {
  const router = useRouter();

  const [updatedConfigs, setUpdatedConfigs] = useState({
    DICE_ON_SCREEN_TIMEOUT_IN_MS: null,
    TIME_BETWEEN_DICES_IN_MS: null
  });

  useEffect(() => {
    configs.forEach(config => {
      setUpdatedConfigs(prevState => ({
        ...prevState,
        [config.name]: config.value
      }));
    });
  }, [configs]);

  const refreshData = () => {
    return router.replace(router.asPath);
  }

  const updateConfigs = () => {
    api.put('/config/DICE_ON_SCREEN_TIMEOUT_IN_MS', {
      value: `${parseInt(updatedConfigs.DICE_ON_SCREEN_TIMEOUT_IN_MS) * 1000}`
    });

    api.put('/config/TIME_BETWEEN_DICES_IN_MS', {
      value: `${parseInt(updatedConfigs.TIME_BETWEEN_DICES_IN_MS) * 1000}`
    });
  }

  const runInitialSetup = () => {
    api.post('/setup')
      .then(res => {
        if(res.data.success) {
          return window.location.reload();
        }
      });
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

          {
            configs.length > 0 ? (
              <>
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

                <Grid item xs={12}>
                  <Section
                    title="Configurações"
                  >
                    <Grid
                      item
                      container
                      xs={12}
                      spacing={2}
                    >
                        <Grid container spacing={2} item xs={12}>
                          <Grid item xs={12}>
                            <h4>Integração com OBS</h4>
                          </Grid>

                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              type="number"
                              label="Tempo do dado em tela"
                              helperText="Em segundos"
                              value={updatedConfigs.DICE_ON_SCREEN_TIMEOUT_IN_MS}
                              onChange={(e) => {
                                const value = e.target.value;

                                setUpdatedConfigs(prevState => ({
                                  ...prevState,
                                  DICE_ON_SCREEN_TIMEOUT_IN_MS: value
                                }));
                              }}
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              type="number"
                              label="Tempo entre cada dado"
                              helperText="Em segundos"
                              value={updatedConfigs.TIME_BETWEEN_DICES_IN_MS}
                              onChange={(e) => {
                                const value = e.target.value;

                                setUpdatedConfigs(prevState => ({
                                  ...prevState,
                                  TIME_BETWEEN_DICES_IN_MS: value
                                }));
                              }}
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <Button variant="contained" onClick={updateConfigs}>
                              Salvar
                            </Button>
                          </Grid>
                        </Grid>
                    </Grid>
                    </Section>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                  <Button variant="contained" onClick={runInitialSetup} fullWidth>
                    REALIZAR CONFIGURAÇÃO INICIAL
                  </Button>
              </Grid>
            )
          }
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
