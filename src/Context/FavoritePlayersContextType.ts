import React from 'react';

import Player from '../Types/Player';

export interface FavoritePlayersContextType {
    favorites: Player[],
    setFavorites: React.Dispatch<React.SetStateAction<Player[]>>
}