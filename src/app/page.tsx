//import {Card, CategoryBar, Color} from '@tremor/react';
//import Papa from 'papaparse';
import {Card, ProgressBar} from '@tremor/react'
import { fetchCardData } from './data';

// async function GetFromDate({searchDate}: {searchDate: string}) {
//
//   const searchURL = `https://baseballsavant.mlb.com/statcast_search/csv?all=true&game_date_gt=${searchDate}&type=details`
//
//   const pitchData =await fetch(searchURL)
//     .then((res) => res.text())
//     // Resolve duplicate Headers
//     .then(text => text.replace('pitcher', 'pitcher_duplicate_header'))
//     .then(text => text.replace('fielder_2', 'catcher'))
//     .then((csv) => Papa.parse(csv, {header: true, delimiter: ',', dynamicTyping: true}))
//
//   const firstPitch = pitchData.data[0] as Object;
//   let columnList: React.JSX.Element[] = [];
//   for (const key in firstPitch) {
//     columnList.push(<li key={key}>{`${key}: ${firstPitch[key as keyof Object]}`}</li>)
//   }
//   return (
//     <div>
//       <ul>{columnList}</ul>
//     </div>
//   )
// }
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
  return (    <main>
      <div className='flex justify-between mx-8 mt-6'>
        <h1 className='text-xl pl-8'>
          Pitchinfo
        </h1>
        <input className='rounded' type='search'>
        </input>
      </div>
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
            <PercentBar label='Strike'  value={cd.strike} total={cd.total}/>
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
