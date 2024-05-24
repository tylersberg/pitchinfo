//import {Card, CategoryBar, Color} from '@tremor/react';
//import Papa from 'papaparse';
import {Card, ProgressBar} from '@tremor/react'

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
export default function Home() {
  return (
    <main>
      <div className='grid grid-cols-2 gap-4 pt-8'>
        <Card className='flex-1 justify-center m-4'>
          Swing decisions
          <ProgressBar className='py-2' value={60} label='Swing' />
          <ProgressBar className='py-2 pl-2' value={60} label='Whiff' />
          <ProgressBar className='py-2 pl-2' value={60} label='Foul' />
          <ProgressBar className='py-2 pl-2' value={60} label='In play' />
          <ProgressBar className='py-2' value={60} label='Take' />
          <ProgressBar className='py-2 pl-2' value={60} label='Ball' />
          <ProgressBar className='py-2 pl-2' value={60} label='Called Strike' />
        </Card>
        <Card className='flex-1 justify-center m-4'>
          Balls & Strikes
          <ProgressBar className='py-2' value={60} label='Strike' />
          <ProgressBar className='py-2 pl-2' value={60} label='Swinging' />
          <ProgressBar className='py-2 pl-2' value={60} label='Called' />
          <ProgressBar className='py-2 pl-2' value={60} label='Foul' />
          <ProgressBar className='py-2' value={60} label='Ball' />
        </Card>
      </div>
    </main>
  );
}
