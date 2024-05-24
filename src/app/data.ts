'use server'
import { sql } from 'drizzle-orm';
import db from '@/db/drizzle';
import {pitches} from '@/db/schema';

export async function fetchCardData() {
  try {
    const pitchCounts = await db.select({
      description: pitches.description,
      count: sql<number>`cast(count(*) as int)`
    })
    .from(pitches)
    .groupBy(pitches.description);

    pitchCounts.forEach(row => console.log(row));
    let cardData = {
      total: 0,
      swing: 0,
      take: 0,
      ball: 0,
      strike: 0,
      whiff: 0,
      foul: 0,
      in_play: 0,
      called_strike: 0,
    };
    for (const row of pitchCounts) {
      cardData.total += row.count;
      switch (row.description) {
        case 'foul_bunt':
        case 'foul_tip':
        case 'foul':
          cardData.swing += row.count;
          cardData.foul += row.count;
          cardData.strike += row.count;
          break;
        case 'swinging_strike_blocked':
        case 'swinging_strike':
          cardData.swing += row.count;
          cardData.whiff += row.count;
          cardData.strike += row.count;
          break;
        case 'hit_into_play':
          cardData.swing += row.count;
          cardData.in_play += row.count;
          break;
        case 'called_strike':
          cardData.take += row.count;
          cardData.strike += row.count;
          cardData.called_strike += row.count;
          break;
        case 'hit_by_pitch':
        case 'blocked_ball':
        case 'ball':
          cardData.take += row.count;
          cardData.ball += row.count;
          break;
      }
    }
    return cardData;

  } catch(error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
};

