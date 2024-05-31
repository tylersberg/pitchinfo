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
export default async function Home() {
  const cd = await fetchCardData();
  return (
    <main>
      <div className='flex'>
        <h1 className=''>
          Pitchinfo
        </h1>
        <input>
        </input>
      </div>
      <div className='flex'>
        <Card className='flex-1 justify-center m-4'>
          Swing decisions
          <ProgressBar className='py-2' value={(cd.swing/cd.total) * 100} label='Swing' />
          <ProgressBar className='py-2 pl-2' value={(cd.whiff/cd.total) * 100} label='Whiff' />
          <ProgressBar className='py-2 pl-2' value={(cd.foul/cd.total) * 100} label='Foul' />
          <ProgressBar className='py-2 pl-2' value={(cd.in_play/cd.total) * 100} label='In play' />
          <ProgressBar className='py-2' value={(cd.take/cd.total) * 100} label='Take' />
          <ProgressBar className='py-2 pl-2' value={(cd.ball/cd.total) * 100} label='Ball' />
          <ProgressBar className='py-2 pl-2' value={(cd.strike/cd.total) * 100} label='Strike' />
        </Card>
        <Card className='flex-1 justify-center m-4'>
          Balls & Strikes
          <ProgressBar className='py-2' value={(cd.strike/cd.total) * 100} label='Strike' />
          <ProgressBar className='py-2 pl-2' value={(cd.whiff/cd.total) * 100} label='Whiff' />
          <ProgressBar className='py-2 pl-2' value={(cd.foul/cd.total) * 100} label='Foul' />
          <ProgressBar className='py-2 pl-2' value={(cd.called_strike/cd.total) * 100} label='Called' />
          <ProgressBar className='py-2' value={(cd.ball/cd.total) * 100} label='Ball' />
        </Card>
      </div>
    </main>
  );
}
