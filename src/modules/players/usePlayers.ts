import axios from 'axios';
import Swal from 'sweetalert2';
import React, {useState, useEffect, useContext} from 'react';

import { Player as PlayerType} from '../../types/Player';
import { FullPlayerData } from '../../types/FullPlayerData';
import { FavoritePlayersContext } from '../../context/FavoritePlayersContext';
import FavoritePlayersContextType from '../../context/FavoritePlayersContextType';

const playersPerPage: number = 10;
const apiUrl: string = 'https://www.balldontlie.io/api/v1/players';

interface usePlayersOutput {
    query: string;
    pageCount: number;
    isLoading: boolean;
    players: PlayerType[];
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleFavoriteStatusChange: (fav: boolean, playerChanged: PlayerType) => void;
}

const usePlayers = (page: number): usePlayersOutput => {
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const contextFavoritesObj: FavoritePlayersContextType | null = useContext(FavoritePlayersContext);

    const getPlayers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(apiUrl, {
            params: {
                page: page, 
                per_page: playersPerPage, 
            }})
            const allPlayersMapped: PlayerType[] = mapPlayersToArray(response.data.data);
            if(response.data.meta.current_page === 1) {
                setPageCount(response.data.meta.total_pages);
            }
            setPlayers([...allPlayersMapped]);
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error fetching data from the Api',
              })
        } finally {
            setIsLoading(false);
        }
    }

    const isPlayerFavorite = (id: number) => {
        if(contextFavoritesObj?.favoriteIds && contextFavoritesObj?.favoriteIds.indexOf(id) > -1) {
            return true;
        } return false;
    }

    const mapPlayersToArray = (data: FullPlayerData[]) => {
        return data.map((currPlayerData: FullPlayerData) => {
            return {
                id: currPlayerData.id,
                isFav: isPlayerFavorite(currPlayerData.id),
                firstName: currPlayerData.first_name,
                lastName: currPlayerData.last_name,
                feet: currPlayerData.height_feet,
                inches: currPlayerData.height_inches,
                weight: currPlayerData.weight_pounds,
                position: currPlayerData.position,
                team: currPlayerData.team.full_name,
            }
        })
    }

    const handleFavoriteStatusChange = (fav: boolean, playerChanged: PlayerType) => {
        const allPlayers: PlayerType[] = [...players];
        const changedPlayerIndex = allPlayers.findIndex((p: PlayerType) => p.id === playerChanged.id);
        const favPlayer: PlayerType = allPlayers[changedPlayerIndex];
        favPlayer.isFav = fav;
        allPlayers.splice(changedPlayerIndex, 1, favPlayer);
        fav ? contextFavoritesObj?.addPlayer(favPlayer) : contextFavoritesObj?.removePlayer(favPlayer);
        setPlayers(allPlayers);
    }

    useEffect(() => { getPlayers() }, [page])

    return { isLoading, players, query, setQuery, pageCount, handleFavoriteStatusChange }
}

export default usePlayers;