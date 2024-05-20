//import {Card, CategoryBar, Color} from '@tremor/react';
import Papa from 'papaparse';

async function GetFromDate({searchDate}: {searchDate: string}) {

  const searchURL = `https://baseballsavant.mlb.com/statcast_search/csv?all=true&game_date_gt=${searchDate}&type=details`

  const pitchData =await fetch(searchURL)
    .then((res) => res.text())
    // Resolve duplicate Headers
    .then(text => text.replace('pitcher', 'pitcher_duplicate_header'))
    .then(text => text.replace('fielder_2', 'catcher'))
    .then((csv) => Papa.parse(csv, {header: true, delimiter: ',', dynamicTyping: true}))

  const firstPitch = pitchData.data[0] as Object;
  let columnList: React.JSX.Element[] = [];
  for (const key in firstPitch) {
    columnList.push(<li key={key}>{`${key}: ${firstPitch[key as keyof Object]}`}</li>)
  }
  return (
    <div>
      <ul>{columnList}</ul>
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <GetFromDate searchDate={'2024-05-18'} />
      </div>
    </main>
  );
}
