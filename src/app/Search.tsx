import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchPlayers } from './data';
 
export default async function Search() {
  const playerList = await fetchPlayers();
  const playerLabels = playerList.map((player) => {
    return {
      label: `${player.name_first} ${player.name_last}`,
      id: player.key_uuid
    };
  });

  return (
    <div>
      <Autocomplete
        id='player search'
        options={playerLabels}
        sx={{ width: 300 }}
        renderInput={(params) => (<TextField {...params} label='Enter Player' />)}
      />
    </div>
  );
}
