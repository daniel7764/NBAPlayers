import React, { useState, createContext, useContext} from 'react';

import {Player as PlayerType} from '../Types/Player';
import { FavoritePlayersContextType } from './FavoritePlayersContextType';

export const FavoritePlayersContext = createContext<FavoritePlayersContextType | null>(null);
export const useFavoritesContext = () => useContext(FavoritePlayersContext);

const FavoritePlayersProvider: React.FC = ({children}) => {
    const [favorites, setFavorites] = useState<PlayerType[]>([]);

    return (
        <FavoritePlayersContext.Provider value={{favorites, setFavorites}}>
            { children }
        </FavoritePlayersContext.Provider>
    );
}

export default FavoritePlayersProvider;