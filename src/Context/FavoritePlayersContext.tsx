import React, { useState, createContext, useContext } from 'react';

import {Player as PlayerType} from '../types/Player';
import FavoritePlayersContextType from './FavoritePlayersContextType';

export const FavoritePlayersContext = createContext<FavoritePlayersContextType | null>(null);
export const useFavoritesContext = () => useContext(FavoritePlayersContext);

const FavoritePlayersProvider: React.FC = ({children}) => {
    const [favorites, setFavorites] = useState<PlayerType[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    const addPlayer = (addedPlayer: PlayerType) => {    
        setFavorites([...favorites, addedPlayer]);
        setFavoriteIds([...favoriteIds, addedPlayer.id]);
    }

    const removePlayer = (removedPlayer: PlayerType) => {
        const playerIndexToRemove = favorites.findIndex(f => f.id === removedPlayer.id);
        if(playerIndexToRemove > -1) {
            const favArr = [...favorites];
            favArr.splice(playerIndexToRemove, 1);
            const idIndex = favoriteIds.indexOf(removedPlayer.id);
            if(idIndex > -1) {
                const idArr = [...favoriteIds];
                idArr.splice(idIndex, 1);
                setFavoriteIds([...idArr]);
                setFavorites([...favArr]);
            }
        }
    }

    return (
        <FavoritePlayersContext.Provider value={{favoriteIds, setFavoriteIds, favorites, setFavorites, addPlayer, removePlayer}}>
            { children }
        </FavoritePlayersContext.Provider>
    );
}

export default FavoritePlayersProvider;