const next = require('next');
const express = require('express');
const cookieParser = require('cookie-parser');

const argv = require('process').argv;
const port = argv.length == 4 && argv[2] == '-p' ? argv[3] : 3000;
const dev = process.env.NODE_ENV === 'development';

const app = next({ dev });
const handle = app.getRequestHandler();

//start the server and log to the console
app.prepare().then(() => {
  //https://stackoverflow.com/questions/49321566/nextjs-cookie-parser-middleware-absent-from-production-build
  const server = express();
  server.use(cookieParser()); // use cookieParser

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    let host = 'localhost';
    console.log(`listening on ${host}:${port}\n`);
  });
});
