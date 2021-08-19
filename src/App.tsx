import { Divider } from '@material-ui/core';

import './App.css';
import Players from '../src/Components/Players/Players';
import Favorites from '../src/Components/Favorites/Favorites';
import FavoritePlayersProvider from './Context/FavoritePlayersContext';

const App = () => {
  return (
    <div className='App'>
      <FavoritePlayersProvider>
          <Players />
          <Divider orientation="vertical" flexItem />
          <Favorites />
      </FavoritePlayersProvider>
    </div>
  );
}

export default App;
