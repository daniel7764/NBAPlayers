import React, { useState } from 'react';
import { Pagination } from '@material-ui/lab';
import { List, Typography } from '@material-ui/core';

import '../ListStyles.css';
import usePlayers from './usePlayers';
import Player from '../../components/Player/Player';
import Search from '../../components/Search/Search';

const Players: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const { players, isLoading, query, setQuery, pageCount, handleFavoriteStatusChange } = usePlayers(page);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const getPlayersToDisplay = () => {
        if(Boolean(query)) {
            return [...players].filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(query));
        }
        return players; 
    }

    return (
        <div className='PlayersList'>
            <Typography className='Title'>NBA Players</Typography>
            <Search query={query} setQuery={setQuery}/>
            <List>
                {
                    getPlayersToDisplay().map(player => {
                            return <Player
                            playerToDisplay={player} 
                            showCheckBox={true}
                            handleFavoriteStatusChange={handleFavoriteStatusChange}
                        />
                    })
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