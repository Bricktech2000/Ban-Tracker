import React, { Component } from 'react';
import Head from 'next/head';

import styles from '../components/Home.module.css';

export default function Home() {
  return (
    <div className={styles.Home}>
      <Head>
        <title>User Tracker</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>asdf</main>
    </div>
  );
}
