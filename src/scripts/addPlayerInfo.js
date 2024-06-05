const Papa = require('papaparse');
const { db } = require('@vercel/postgres');
const fs = require('fs')

main().catch((err) => {
  console.error(
    'An error occurred while attempting to add player data to the database:',
    err,
  );
});

async function main() {
  const playerFiles = [
  './public/register-master/data/people-0.csv',
  './public/register-master/data/people-1.csv',
  './public/register-master/data/people-2.csv',
  './public/register-master/data/people-3.csv',
  './public/register-master/data/people-4.csv',
  './public/register-master/data/people-5.csv',
  './public/register-master/data/people-6.csv',
  './public/register-master/data/people-7.csv',
  './public/register-master/data/people-8.csv',
  './public/register-master/data/people-9.csv',
  './public/register-master/data/people-a.csv',
  './public/register-master/data/people-b.csv',
  './public/register-master/data/people-c.csv',
  './public/register-master/data/people-d.csv',
  './public/register-master/data/people-e.csv',
  './public/register-master/data/people-f.csv',
  ]
  const playerInfo = readPlayerFiles(playerFiles);
  console.log(playerInfo.length);
  // const client = await db.connect();
  // await client.end();

};

function readPlayerFiles(playerFiles) {
  var allPlayers = []
  for (const file of playerFiles) {
    var players = fs.readFileSync(file, 'utf8');
    players = Papa.parse(players, {header: true, delimiter: ',', dynamicTyping: true}).data;
    console.log(players.length);
    players = players.filter(player => !!player.key_mlbam);
    console.log(players.length);
    allPlayers.push(...players)
  }

  return allPlayers;
};

async function insertPitchData(client, pitchData) {

  console.log(`Beginning player data insert`);


  console.log(`Player data insert complete`);

  // await Promise.all(
  //   pitchData.map(
  //     (pitch) => client.sql`
  //   `,
  //   ),
  // );

};

