import axios from 'axios';
import {useState, useEffect} from 'react';

import Player from '../../Types/Player';

const OK_STATUS: number = 200;
const apiUrl: string = 'https://www.balldontlie.io/api/v1/players';
const playersPerPage: number = 10;

const usePlayers = (playersInput: usePlayersInput): usePlayersOutput => {
    const { page } = playersInput;
    const [players, setPlayers] = useState<Player[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getPlayers = async () => {
        setIsLoading(true);
        const response = await axios.get(apiUrl, {
            params: {
                page: page, 
                per_page: playersPerPage, 
            }
        })
        if(response.status !== OK_STATUS || !response.data.data) {}
        else {
            const allPlayersMapped: Player[] = mapPlayersToArray(response.data.data);
            setPlayers([...players, ...allPlayersMapped]);
            setHasMore(response.data.data.length > 0);
            setIsLoading(false);
        }
    }

    const mapPlayersToArray = (data: any) => {
        return data.map((currPlayerData: any) => {
            return {
                firstName: currPlayerData.first_name,
                lastName: currPlayerData.last_name,
                feet: currPlayerData.height_feet,
                inches: currPlayerData.height_inches,
                weight: currPlayerData.weight,
                position: currPlayerData.position,
                team: currPlayerData.team.full_name,
            }
        })
    }

    useEffect(() => { getPlayers() }, [page])

    return { hasMore, isLoading, players }
}

interface usePlayersInput {
    page: number;
}

interface usePlayersOutput {
    hasMore: boolean,
    isLoading: boolean,
    players: Player[]
}

export default usePlayers;