import express from 'express';
import geoip from 'geoip-lite';
import uaparser from 'ua-parser-js';
const app = express();

const port = 80;

app.get('/', async function (req, res) {
  //https://www.npmjs.com/package/ua-parser-js
  //https://github.com/geoip-lite/node-geoip
  //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties

  //exclude: ua
  var { ua, ...rest } = uaparser(req.headers['user-agent']);
  var ua = rest;

  //include: city, timezone, ll
  var { city, timezone, ll, ...rest } = geoip.lookup(
    req.connection.remoteAddress
  );
  var ip = { city, timezone, ll };

  //combine ip and ua
  var obj = { ua, ip };

  var result = compareValues(obj, obj);
  console.log(result);
  res.end('Hello World');
});

//count differences between all values of two objects
function compareValues(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 != obj2;

  //https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
  return [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].reduce(
    (acc, key) => acc + compareValues(obj1[key], obj2[key]),
    0
  );
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
