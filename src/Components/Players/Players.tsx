import { Pagination } from '@material-ui/lab';
import { List, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import '../ListStyles.css';
import usePlayers from './usePlayers';
import Player from '../Player/Player';
import SearchPlayer from './SearchPlayer/SearchPlayer';

const Players: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const { players, isLoading, playersFoundByName, searchedName, setSearchedName, pageCount } = usePlayers({page});

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const getPlayersToDisplay = () => {
        return (searchedName ? playersFoundByName: players); 
    }

    return (
        <div className='PlayersList'>
            <Typography className='Title'>NBA Players</Typography>
            <SearchPlayer searchedName={searchedName} setSearchedName={setSearchedName}/>
            <List>
                {
                    getPlayersToDisplay().map(player =>  <Player playerToDisplay={player} showCheckBox={true}/>)
                }
            </List>
            {
                isLoading &&
                    <Typography>Loading</Typography>
            }
            <Pagination count={pageCount} onChange={handlePageChange}/>
        </div>
    );
}

export default Players;