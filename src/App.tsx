import { Divider } from '@material-ui/core';

import './App.css';
import Players from './modules/Players/Players';
import Favorites from './modules/Favorites/Favorites';
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
