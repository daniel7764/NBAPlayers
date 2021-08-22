import React from 'react';

import { Player as PlayerType} from '../types/Player';

type FavoritePlayersContextType = {
    favoriteIds: number[];
    setFavoriteIds: React.Dispatch<React.SetStateAction<number[]>>;
    favorites: PlayerType[];
    setFavorites: React.Dispatch<React.SetStateAction<PlayerType[]>>;
    addPlayer: (addedPlayer: PlayerType) => void;
    removePlayer: (removedPlayer: PlayerType) => void;
}

export default FavoritePlayersContextType;