import React, { useState, createContext} from 'react';

import Player from '../Types/Player';
import { FavoritePlayersContextType } from './FavoritePlayersContextType';

export const FavoritePlayersContext = createContext<FavoritePlayersContextType | null>(null);

const FavoritePlayersProvider: React.FC = ({children}) => {
    const [favorites, setFavorites] = useState<Player[]>([]);

    return (
        <FavoritePlayersContext.Provider value={{favorites, setFavorites}}>
            { children }
        </FavoritePlayersContext.Provider>
    );
}

export default FavoritePlayersProvider;