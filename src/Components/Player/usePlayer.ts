import { useContext } from 'react';

import { Player as PlayerType } from '../../Types/Player';
import { FavoritePlayersContext } from '../../Context/FavoritePlayersContext';
import { FavoritePlayersContextType } from '../../Context/FavoritePlayersContextType';

interface usePlayerOutput {
    addFavoritePlayer: (addedPlayer: PlayerType) => void;
    removeFavoritePlayer: (removedPlayer: PlayerType) => void;
}

const usePlayer = (): usePlayerOutput => {
    const {favorites, setFavorites} = useContext(FavoritePlayersContext) as FavoritePlayersContextType;

    const addFavoritePlayer = (addedPlayer: PlayerType) => {
        setFavorites([...favorites, addedPlayer]);
    }

    const removeFavoritePlayer = (removedPlayer: PlayerType) => {
        const playerIndexToRemove = favorites.indexOf(removedPlayer);
        if(playerIndexToRemove > -1) {
            const favArr = favorites;
            favArr.splice(playerIndexToRemove, 1);
            setFavorites([...favArr]);
        }
    }

    return { addFavoritePlayer, removeFavoritePlayer };
}

export default usePlayer;