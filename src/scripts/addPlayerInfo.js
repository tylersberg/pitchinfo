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
  const client = await db.connect();
  await insertPlayerData(client, playerInfo)
  await client.end();

};

function readPlayerFiles(playerFiles) {
  var allPlayers = []
  for (const file of playerFiles) {
    var players = fs.readFileSync(file, 'utf8');
    players = Papa.parse(players, {header: true, delimiter: ',', dynamicTyping: true}).data;
    console.log(`Players before filtering for MLBAM id: ${players.length}`);
    players = players.filter(player => !!player.key_mlbam);
    console.log(`Players after filtering for MLBAM id: ${players.length}`);
    allPlayers.push(...players)
  }

  return allPlayers;
};

async function insertPlayerData(client, players) {

  console.log(`Beginning player data insert`);
  try {
    const pitcherIDs = await client.sql`SELECT DISTINCT pitcher FROM pitches`;
    const batterIDs = await client.sql`SELECT DISTINCT batter FROM pitches`;

    var playerIDSet = new Set()
    pitcherIDs.rows.forEach(player => playerIDSet.add(player.pitcher));
    batterIDs.rows.forEach(player => playerIDSet.add(player.batter));

    players = players.filter(player => playerIDSet.has(player.key_mlbam));
    console.log(`Players for which there is pitch data: ${players.length}`);

    await Promise.all(
      players.map(
        (player) => client.sql`
          INSERT INTO players (
            key_uuid,
            key_mlbam,
            key_bbref_minors,
            name_last,
            name_first,
            name_given,
            birth_year,
            birth_month,
            birth_day)
          VALUES (
            ${player.key_uuid},
            ${player.key_mlbam},
            ${player.key_bbref_minors},
            ${player.name_last},
            ${player.name_first},
            ${player.name_given},
            ${player.birth_year},
            ${player.birth_month},
            ${player.birth_day});`
      )
    );
  } catch(error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  console.log(`Player data insert complete`);
};

