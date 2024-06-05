const Papa = require('papaparse');
const { db } = require('@vercel/postgres');

main().catch((err) => {
  console.error(
    'An error occurred while attempting to add pitch data to the database:',
    err,
  );
});

async function main() {
  const client = await db.connect();

  const pitchData = await getFromDate('2024-05-22');
  console.log(pitchData.length);
  await insertPitchData(client, pitchData);

  await client.end();

};

async function getFromDate(searchDate) {

  const searchURL = `https://baseballsavant.mlb.com/statcast_search/csv?all=true&game_date_gt=${searchDate}&type=details`

  const pitchData =await fetch(searchURL)
    .then((res) => res.text())
    // Resolve duplicate Headers
    .then(text => text.replace('pitcher', 'pitcher_duplicate_header'))
    .then(text => text.replace('fielder_2', 'catcher'))
    .then((csv) => Papa.parse(csv, {header: true, delimiter: ',', dynamicTyping: true}))

  console.log(`Retreived pitch data from ${searchDate}`);
  return pitchData.data;
};

async function insertPitchData(client, pitchData) {

  console.log(`Beginning game data insert`);

  // await Promise.all(
  //   pitchData.map(
  //     (pitch) => client.sql`
  //     INSERT INTO games (game_pk, game_date, game_type, home_team, away_team, game_year)
  //     VALUES (
  //       ${pitch.game_pk}, 
  //       ${pitch.game_date}, 
  //       ${pitch.game_type}, 
  //       ${pitch.home_team}, 
  //       ${pitch.away_team}, 
  //       ${pitch.game_year})
  //     ON CONFLICT (game_pk) DO NOTHING;
  //   `,
  //   ),
  // );

  console.log(`Game data insert complete`);
  console.log(`Pitch data insert start`);

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await Promise.all(
    pitchData.map(
      (pitch) => client.sql`
      INSERT INTO pitches (
        id,
        player_name,
        batter,
        catcher,
        pitch_type,
        pitch_name,
        release_speed,
        release_pos_x,
        release_pos_z,
        type,
        balls,
        strikes,
        events,
        description,
        zone,
        des,
        stand,
        p_throws,
        hit_location,
        pfx_x,
        pfx_z,
        plate_x,
        plate_z,
        on_3b,
        on_2b,
        on_1b,
        game_pk,
        inning,
        inning_topbot,
        outs_when_up,
        at_bat_number,
        pitch_number,
        home_score,
        away_score,
        bat_score,
        fld_score,
        post_away_score,
        post_home_score,
        post_bat_score,
        post_fld_score,
        vx0,
        vy0,
        vz0,
        ax,
        ay,
        az,
        sz_top,
        sz_bot,
        effective_speed,
        release_pos_y,
        spin_axis,
        release_spin_rate,
        release_extension,
        pitcher,
        fielder_2,
        fielder_3,
        fielder_4,
        fielder_5,
        fielder_6,
        fielder_7,
        fielder_8,
        fielder_9,
        if_fielding_alignment,
        of_fielding_alignment,
        delta_home_win_exp,
        delta_run_exp,
        bat_speed,
        swing_length,
        bb_type,
        hc_x,
        hc_y,
        sv_id,
        hit_distance_sc,
        launch_speed,
        launch_angle,
        estimated_ba_using_speedangle,
        estimated_woba_using_speedangle,
        woba_value,
        woba_denom,
        babip_value,
        iso_value,
        launch_speed_angle
        )
      VALUES (
        uuid_generate_v4(),
        ${pitch.player_name},
        ${pitch.batter},
        ${pitch.catcher},
        ${pitch.pitch_type},
        ${pitch.pitch_name},
        ${pitch.release_speed},
        ${pitch.release_pos_x},
        ${pitch.release_pos_z},
        ${pitch.type},
        ${pitch.balls},
        ${pitch.strikes},
        ${pitch.events},
        ${pitch.description},
        ${pitch.zone},
        ${pitch.des},
        ${pitch.stand},
        ${pitch.p_throws},
        ${pitch.hit_location},
        ${pitch.pfx_x},
        ${pitch.pfx_z},
        ${pitch.plate_x},
        ${pitch.plate_z},
        ${pitch.on_3b},
        ${pitch.on_2b},
        ${pitch.on_1b},
        ${pitch.game_pk},
        ${pitch.inning},
        ${pitch.inning_topbot},
        ${pitch.outs_when_up},
        ${pitch.at_bat_number},
        ${pitch.pitch_number},
        ${pitch.home_score},
        ${pitch.away_score},
        ${pitch.bat_score},
        ${pitch.fld_score},
        ${pitch.post_away_score},
        ${pitch.post_home_score},
        ${pitch.post_bat_score},
        ${pitch.post_fld_score},
        ${pitch.vx0},
        ${pitch.vy0},
        ${pitch.vz0},
        ${pitch.ax},
        ${pitch.ay},
        ${pitch.az},
        ${pitch.sz_top},
        ${pitch.sz_bot},
        ${pitch.effective_speed},
        ${pitch.release_pos_y},
        ${pitch.spin_axis},
        ${pitch.release_spin_rate},
        ${pitch.release_extension},
        ${pitch.pitcher},
        ${pitch.fielder_2},
        ${pitch.fielder_3},
        ${pitch.fielder_4},
        ${pitch.fielder_5},
        ${pitch.fielder_6},
        ${pitch.fielder_7},
        ${pitch.fielder_8},
        ${pitch.fielder_9},
        ${pitch.if_fielding_alignment},
        ${pitch.of_fielding_alignment},
        ${pitch.delta_home_win_exp},
        ${pitch.delta_run_exp},
        ${pitch.bat_speed},
        ${pitch.swing_length},
        ${pitch.bb_type},
        ${pitch.hc_x},
        ${pitch.hc_y},
        ${pitch.sv_id},
        ${pitch.hit_distance_sc},
        ${pitch.launch_speed},
        ${pitch.launch_angle},
        ${pitch.estimated_ba_using_speedangle},
        ${pitch.estimated_woba_using_speedangle},
        ${pitch.woba_value},
        ${pitch.woba_denom},
        ${pitch.babip_value},
        ${pitch.iso_value},
        ${pitch.launch_speed_angle}
        );
    `,
    ),
  );

  console.log(`Pitch data insert end`);

};

