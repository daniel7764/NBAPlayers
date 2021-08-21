import React from 'react';

import { Player as PlayerType} from '../Types/Player';

export type FavoritePlayersContextType = {
    favorites: PlayerType[];
    setFavorites: React.Dispatch<React.SetStateAction<PlayerType[]>>;
}