import express from 'express';
import geoip from 'geoip-lite';
import uaparser from 'ua-parser-js';
const app = express();

const port = 8080;

app.get('/', async function (req, res) {
  res.end('Hello World');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
