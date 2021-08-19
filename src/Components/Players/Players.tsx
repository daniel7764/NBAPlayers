import { List, Typography } from '@material-ui/core';
import React, { useState, useRef, useCallback } from 'react';

import '../ListStyles.css';
import usePlayers from './usePlayers';
import Player from '../Player/Player';

const Players: React.FC = () => {
    const observer = useRef<IntersectionObserver>();
    const [page, setPage] = useState<number>(0);
    const { players, hasMore, isLoading } = usePlayers({page});

    const lastPlayerElementRef = useCallback((node: Element) => {
        if(isLoading) return;
        observer.current &&
            observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        })
        node &&
            observer.current.observe(node);
    }, [isLoading, hasMore]);

    return (
        <div className='PlayersList'>
            <Typography className='Title'>NBA Players</Typography>
            <List>
                {
                    players.map((player, index) => { 
                        return players.length === index + 1 ?
                            <Player playerToDisplay={player} showCheckBox={true} forwardref={lastPlayerElementRef}/> :
                            <Player playerToDisplay={player} showCheckBox={true}/>
                    })
                }
            </List>
            {
                isLoading &&
                    <Typography>Loading</Typography>
            }
        </div>
    );
}

export default Players;