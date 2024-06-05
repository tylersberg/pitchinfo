import { uuid, pgTable, text, integer, numeric, smallint, } from 'drizzle-orm/pg-core';

export const pitches = pgTable('pitches',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    player_name: text('player_name').notNull(),
    batter: integer('batter').notNull(),
    catcher: integer('catcher').notNull(),
    pitch_type: text('pitch_type').notNull(),
    pitch_name: text('pitch_name').notNull(),
    release_speed: numeric('release_speed').notNull(),
    release_pos_x: numeric('release_pos_x').notNull(),
    release_pos_z: numeric('release_pos_z').notNull(),
    type: text('type').notNull(),
    balls: smallint('balls').notNull(),
    strikes: smallint('strikes').notNull(),
    events: text('events'),
    description: text('description').notNull(),
    zone: smallint('zone').notNull(),
    des: text('des').notNull(),
    stand: text('stand').notNull(),
    p_throws: text('p_throws').notNull(),
    hit_location: smallint('hit_location'),
    pfx_x: numeric('pfx_x').notNull(),
    pfx_z: numeric('pfx_z').notNull(),
    plate_x: numeric('plate_x').notNull(),
    plate_z: numeric('plate_z').notNull(),
    on_3b: integer('on_3b'),
    on_2b: integer('on_2b'),
    on_1b: integer('on_1b'),
    game_pk: integer('game_pk').notNull(),
    inning: smallint('inning').notNull(),
    inning_topbot: text('inning_topbot').notNull(),
    outs_when_up: smallint('outs_when_up').notNull(),
    at_bat_number: smallint('at_bat_number').notNull(),
    pitch_number: smallint('pitch_number').notNull(),
    home_score: smallint('home_score').notNull(),
    away_score: smallint('away_score').notNull(),
    bat_score: smallint('bat_score').notNull(),
    fld_score: smallint('fld_score').notNull(),
    post_away_score: smallint('post_away_score').notNull(),
    post_home_score: smallint('post_home_score').notNull(),
    post_bat_score: smallint('post_bat_score').notNull(),
    post_fld_score: smallint('post_fld_score').notNull(),
    vx0: numeric('vx0').notNull(),
    vy0: numeric('vy0').notNull(),
    vz0: numeric('vz0').notNull(),
    ax: numeric('ax').notNull(),
    ay: numeric('ay').notNull(),
    az: numeric('az').notNull(),
    sz_top: numeric('sz_top'),
    sz_bot: numeric('sz_bot'),
    effective_speed: numeric('effective_speed'),
    release_pos_y: numeric('release_pos_y'),
    spin_axis: smallint('spin_axis'),
    release_spin_rate: numeric('release_spin_rate'),
    release_extension: numeric('release_extension'),
    pitcher: integer('pitcher').notNull(),
    fielder_2: integer('fielder_2').notNull(),
    fielder_3: integer('fielder_3').notNull(),
    fielder_4: integer('fielder_4').notNull(),
    fielder_5: integer('fielder_5').notNull(),
    fielder_6: integer('fielder_6').notNull(),
    fielder_7: integer('fielder_7').notNull(),
    fielder_8: integer('fielder_8').notNull(),
    fielder_9: integer('fielder_9').notNull(),
    if_fielding_alignment: text('if_fielding_alignment'),
    of_fielding_alignment: text('of_fielding_alignment'),
    delta_home_win_exp: numeric('delta_home_win_exp'),
    delta_run_exp: numeric('delta_run_exp'),
    bat_speed: numeric('bat_speed'),
    swing_length: numeric('swing_length'),
    bb_type: text('bb_type'),
    hc_x: numeric('hc_x'),
    hc_y: numeric('hc_y'),
    sv_id: integer('sv_id'),
    hit_distance_sc: numeric('hit_distance_sc'),
    launch_speed: numeric('launch_speed'),
    launch_angle: numeric('launch_angle'),
    estimated_ba_using_speedangle: numeric('estimated_ba_using_speedangle'),
    estimated_woba_using_speedangle: numeric('estimated_woba_using_speedangle'),
    woba_value: numeric('woba_value'),
    woba_denom: numeric('woba_denom'),
    babip_value: numeric('babip_value'),
    iso_value: numeric('iso_value'),
    launch_speed_angle: text('launch_speed_angle')
  });

export const games = pgTable('games', 
  {
    game_pk: integer('game_pk').primaryKey(),
    game_date: text('game_date').notNull(),
    game_type: text('game_type').notNull(),
    home_team: text('home_team').notNull(),
    away_team: text('away_team').notNull(),
    game_year: text('game_year').notNull(),
  });

export const players = pgTable('players', 
  {
    key_uuid: uuid('key_uuid').primaryKey(),
    key_mlbam: integer('key_mlbam').notNull().unique(),
    key_bbref_minors: text('key_bbref_minors'),
    name_last: text('name_last').notNull(),
    name_first: text('name_first').notNull(),
    name_given: text('name_given'),
    birth_year: smallint('birth_year').notNull(),
    birth_month: smallint('birth_month').notNull(),
    birth_day: smallint('birth_day').notNull(),
  });
