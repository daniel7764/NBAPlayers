import { useContext } from 'react';

import Player from '../../Types/Player';
import { FavoritePlayersContext } from '../../Context/FavoritePlayersContext';
import { FavoritePlayersContextType } from '../../Context/FavoritePlayersContextType';

const useSinglePlayer = (): useSinglePlayerOutput => {
    const {favorites, setFavorites} = useContext(FavoritePlayersContext) as FavoritePlayersContextType;

    const alterFavorites = (playerToChnge: Player, add: boolean) => {
        if(add) {
            setFavorites([...favorites, playerToChnge]);
        } else {
            const playerIndexToRemove = favorites.indexOf(playerToChnge);
            if(playerIndexToRemove > -1) {
                const favArr = favorites;
                favArr.splice(playerIndexToRemove, 1);
                setFavorites([...favArr]);
            }
        }
    }

    return { alterFavorites };
}

interface useSinglePlayerOutput {
    alterFavorites: (playerToChange: Player, add: boolean) => void;
}

export default useSinglePlayer;