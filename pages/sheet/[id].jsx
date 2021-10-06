import Head from 'next/head';

import styles from '../../styles/Sheet.module.css';

import { PrismaClient } from '@prisma/client';

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

export default function Sheet({ character }) {
  if(!character) {
    return (
      <div>Personagem não existe!</div>
    );
  }

  return (
    <div>
      <Head>
        <title>Ficha de Personagem</title>
      </Head>

      <h1 className={styles.title}>
        {JSON.stringify(character)}
      </h1>
    </div>
  )
}
