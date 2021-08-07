import React, { Component } from 'react';
import Head from 'next/head';
import UserID from '../components/UserID.js';

import styles from '../components/Home.module.css';

export default function Home(props) {
  return (
    <div className={styles.Home}>
      <Head>
        <title>User Tracker</title>
        <meta name="description" content="" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <h1>User Tracker</h1>
        <div>
          This program is ment to track users very aggressively without using
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
  var id = await getUserID(req, res, 8);
  return {
    props: { id: id },
  };
}
