import express from 'express';
import geoip from 'geoip-lite';
import uaparser from 'ua-parser-js';
const app = express();

const port = 90;
const threshold = 8;

var db = {};
app.get('/', async function (req, res) {
  //https://www.npmjs.com/package/ua-parser-js
  //https://github.com/geoip-lite/node-geoip
  //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties

  //exclude: ua
  var { ua, ...rest } = uaparser(req.headers['user-agent']);
  var ua = rest;

  //include: region, city, timezone, ll
  var { region, city, timezone, ll, ...rest } =
    geoip.lookup(req.connection.remoteAddress) || {};
  var ip = { region, city, timezone, ll };

  //combine ip and ua
  var obj = { ua, ip };

  var id = null;
  Object.entries(db).forEach(([key, objs]) => {
    for (var obj2 of objs) {
      var result = compareValues(obj, obj2);
      if (result == 0) {
        id = key;
        return;
      }
    }
    for (var obj2 of objs) {
      var result = compareValues(obj, obj2);
      if (result <= threshold) {
        db[key].push(obj);
        id = key;
        return;
      }
    }
  });

  if (typeof req.query.clear !== 'undefined') {
    delete db[id];
    res.redirect('/');
  } else {
    var html = `
    <body>
      <h1><a href="https://github.com/Bricktech2000/Ban-Tracker" target="_blank" rel="noreferrer">Ban Tracker</a></h1>
      <p>This program is ment to track bans very aggressively. Try to bypass it!</p>
      <p>
        Here are a few ideas to try to do:
        <ul>
          <li>Use a VPN</li>
          <li>Clear your cookies</li>
          <li>Go to a private/incognito window</li>
          <li>Use a different browser</li>
          <li>Use a different device</li>
        </ul>
      </p>
      <p><MESSAGE></p>
    </body>
    `;
    if (id === null) {
      id = genRandomHex(256 / 16);
      db[id] = [obj];
      res.end(
        html.replace(
          '<MESSAGE>',
          `<h3>You are a new user<br>ID: ${id}</h3> If this is not the first time visiting this site and haven't cleared your ban, you just bypassed the system! Your status has now been changed to 'banned'. Refresh the page once you have read this message.`
        )
      );
    } else {
      res.end(
        html.replace(
          '<MESSAGE>',
          `<h3>You are a known user<br>ID: ${id}</h3> Your status is still 'banned' and you haven't bypassed the system. <a href="?clear">Simulate a ban appeal</a>`
        )
      );
    }
  }

  // console.log(db);
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

//https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
function genRandomHex(size) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
