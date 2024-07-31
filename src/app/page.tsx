//import {Card, CategoryBar, Color} from '@tremor/react';
//import Papa from 'papaparse';
'use server';
import {Card, ProgressBar} from '@tremor/react'
import { fetchCardData, fetchPitchList } from './data';
import Search from "./Search";

function PercentBar({label, value, total}: {label: string, value: number, total: number}) {
  return (
    <div>
      <p className='flex justify-between'>
        <span>{label}</span>
        <span className='justify-end'>{((value / total) * 100).toFixed(2)}% &bull; {value}/{total}</span>
      </p>
      <ProgressBar className='py-2' value={(value / total) * 100} />
    </div>
  )
}
export default async function Home() {
  const cd = await fetchCardData();
  //const pitches = await fetchPitchList();
  return (    
    <main>
      <Search/>
      <div className='flex'>
        <Card className='flex-1 m-4'>
          <h1 className='text-center'>Swing decisions</h1>
          <PercentBar label='Swing' value={cd.swing} total={cd.total}/>
          <div className='pl-4'>
            <PercentBar label='Whiff'  value={cd.whiff} total={cd.total}/>
            <PercentBar label='Foul'  value={cd.foul} total={cd.total}/>
            <PercentBar label='In play'  value={cd.in_play} total={cd.total}/>
          </div>
          <PercentBar label='Take'  value={cd.take} total={cd.total}/>
          <div className='pl-4'>
            <PercentBar label='Ball'  value={cd.ball} total={cd.total}/>
            <PercentBar label='Strike'  value={cd.called_strike} total={cd.total}/>
          </div>
        </Card>
        <Card className='flex-1 m-4'>
          <h1 className='text-center'>Balls & Strikes</h1>
          <PercentBar label='Strike'  value={cd.strike} total={cd.total}/>
          <div className='pl-4'>
            <PercentBar label='Whiff'  value={cd.whiff} total={cd.total}/>
            <PercentBar label='Foul'  value={cd.foul} total={cd.total}/>
            <PercentBar label='Called'  value={cd.called_strike} total={cd.total}/>
          </div>
          <PercentBar label='Ball'  value={cd.ball} total={cd.total}/>
        </Card>
      </div>
    </main>
  );
}
