import React, { useContext, useState } from 'react';
import { List, Typography } from '@material-ui/core';

import '../ListStyles.css';
import Player from '../Player/Player';
import { FavoritePlayersContext } from '../../Context/FavoritePlayersContext';
import { FavoritePlayersContextType } from '../../Context/FavoritePlayersContextType';
import ColorPicker from './ColorPicker/ColorPicker';

const Players: React.FC = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>('white');
    const contextFavoritesObj: FavoritePlayersContextType | null = useContext(FavoritePlayersContext);

    return (
        <div className='PlayersList' style={{backgroundColor: `${backgroundColor}`}}>
            <Typography className='Title'>Favorite Players</Typography>
            <span className='ColorPicker'>
                <ColorPicker setBackgroundColor={setBackgroundColor}/>
            </span>
            <List>
                {
                    contextFavoritesObj?.favorites.map(player => <Player playerToDisplay={player} showCheckBox={false}/>)
                }
            </List>
        </div>
    );
}

export default Players;