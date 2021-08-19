import axios from 'axios';
import {useState, useEffect} from 'react';

import { Player as PlayerType} from '../../Types/Player';
import { FullPlayerData } from '../../Types/FullPlayerData';

const OK_STATUS: number = 200;
const playersPerPage: number = 10;
const apiUrl: string = 'https://www.balldontlie.io/api/v1/players';

interface usePlayersInput {
    page: number;
}

interface usePlayersOutput {
    hasMore: boolean,
    isLoading: boolean,
    players: PlayerType[]
}

const usePlayers = (playersInput: usePlayersInput): usePlayersOutput => {
    const { page } = playersInput;
    const [players, setPlayers] = useState<PlayerType[]>([]);
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
        if(response.status !== OK_STATUS || !response.data.data) {

        }
        else {
            const allPlayersMapped: PlayerType[] = mapPlayersToArray(response.data.data);
            setPlayers([...players, ...allPlayersMapped]);
            setHasMore(response.data.data.length > 0);
            setIsLoading(false);
        }
    }

    const mapPlayersToArray = (data: FullPlayerData[]) => {
        return data.map((currPlayerData: FullPlayerData) => {
            return {
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

    useEffect(() => { getPlayers() }, [page])

    return { hasMore, isLoading, players }
}

export default usePlayers;