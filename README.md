# User Tracker

An aggressive user tracker without any client-side logic

## Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and is currently live at [https://track.emilien.ca/](https://track.emilien.ca/).

This tracker is only a POC to show how hard it is to stay totally anonymous online. It assigns every user a unique ID and tracks them regardless of which device or IP address they are using. It is ideal for specific applications such as a ban tracking system.

## Getting Started

To get started with this program, first run the development server:

```bash
cd user-tracker/
npm install
npm run dev -- -p 3000
```

Then, navigate to [http://localhost:3000](http://localhost:3000) to see the live website.

## Deployment

To deploy the website, build the project and run the server:

```bash
cd user-tracker/
npm install
npm run build
npm start -- -p 3000
```

Then, navigate to [http://localhost:3000](http://localhost:3000) to see the live website.
