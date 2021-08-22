import { Divider } from '@material-ui/core';

import './App.css';
import Players from './modules/players/Players';
import Favorites from './modules/favorites/Favorites';
import FavoritePlayersProvider from './context/FavoritePlayersContext';

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
