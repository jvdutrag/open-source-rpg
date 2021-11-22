import React, { useEffect } from 'react'

import Head from 'next/head'
import Router from 'next/router'

export default function Home() {
  useEffect(() => {
    Router.push('/dashboard');
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <h1>Redirecionando...</h1>
    </div>
  )
}
