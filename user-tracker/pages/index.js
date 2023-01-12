import React, { Component } from 'react';
import Head from 'next/head';
import UserID from '../components/UserID.js';

import styles from '../components/Home.module.css';

export default function Home(props) {
  return (
    <div className={styles.Home}>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0"
        />
        <meta property="og:title" content="User Tracker" />
        <meta property="og:description" content="Try and trick the server!" />
        <meta property="og:image" content="/icon.png" />
        <link rel="icon" href="/icon.png" />

        <title>User Tracker</title>
        <meta name="description" content="Try and trick the server!" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <main>
        <h1>User Tracker</h1>
        <div>
          This program is meant to track users very aggressively without using
          any client-side logic. Your goal is to trick the server into assigning
          you a new <i>User ID</i>.
        </div>
        <div>
          <h2>Your User ID</h2>
          <UserID id={props.id} />
        </div>
        <div>
          <h2>A Few Ideas to Get You Started</h2>
          <ul>
            <li>Use a VPN or a proxy</li>
            <li>Clear your cookies</li>
            <li>Go to a private/incognito window</li>
            <li>Use a different browser</li>
            <li>Use a different device</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

//https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
import getUserID from '../components/getUserID';
export async function getServerSideProps({ req, res }) {
  let id = await getUserID(req, res, 8);
  return {
    props: { id: id },
  };
}
