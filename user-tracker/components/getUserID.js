import geoip from 'geoip-lite';
import uaparser from 'ua-parser-js';
import { promises as fs } from 'fs';

const cookieName = '_user_tracker_id';

let db;
export default async function getUserID(req, res, threshold) {
  if (!db) db = await loadDb();
  //https://www.npmjs.com/package/ua-parser-js
  //https://github.com/geoip-lite/node-geoip
  //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
  //https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server

  //exclude: ua, engine, browser
  let { _ua, engine, browser, ...rest } = uaparser(req.headers['user-agent']);
  //include: browser.name, browser.version
  browser = { name: browser.name, version: browser.version };
  let ua = { ...rest, browser };

  //include: region, city, timezone, ll
  let { region, city, timezone, ll, ..._rest } =
    geoip.lookup(req.connection.remoteAddress) || {};
  let ip = { region, city, timezone, ll };

  //include cookie (and double its weight)
  let ck = {};
  ck.ck1 = req.cookies[cookieName] || '';
  ck.ck2 = ck.ck1;

  //combine ip, ua and ck
  let obj = { ua, ip, ck };

  let diff = Object.fromEntries(
    Object.entries(db).map(([key, objs]) => [
      key,
      Math.min(...objs.map((obj2) => compareValues(obj, obj2))),
    ])
  );
  //https://stackoverflow.com/questions/27376295/getting-key-with-the-highest-value-from-object
  let id = Object.keys(diff).reduce(
    (a, b) => (diff[a] < diff[b] ? a : b),
    null
  );

  // console.log(obj, id, db, diff[id]);
  if (diff[id] <= threshold) {
    if (diff[id] > 0) db[id].push(obj);
  } else {
    id = genRandomHex(256 / 16);
    db[id] = [obj];
  }
  res.cookie(cookieName, id, {
    maxAge: 1000 * 60 * 60 * 24 * 100, //expire after 100 years
    httpOnly: true, //make the cookie only accessible by the web server
    signed: false, //sign the cookie
  });

  await storeDb(db);

  return id;
}

//count differences between all values of two objects
function compareValues(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 != obj2;

  //https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
  return [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].reduce(
    (acc, key) => acc + compareValues(obj1[key], obj2[key]),
    0
  );
}

//https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
function genRandomHex(size) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}

async function loadDb() {
  //https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
  await fs.writeFile(process.cwd() + '/db.json', '', {
    flag: 'a+',
  });
  return JSON.parse(
    (await fs.readFile(process.cwd() + '/db.json')).toString() || '{}'
  );
}

async function storeDb(db) {
  //https://stackoverflow.com/questions/12899061/creating-a-file-only-if-it-doesnt-exist-in-node-js
  await fs.writeFile(process.cwd() + '/db.json', JSON.stringify(db), {
    flag: 'w',
  });
}
