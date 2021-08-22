import React, { useContext, useState } from 'react';
import { List, Typography } from '@material-ui/core';

import '../ListStyles.css';
import Player from '../../components/Player/Player';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import { FavoritePlayersContext } from '../../context/FavoritePlayersContext';
import FavoritePlayersContextType from '../../context/FavoritePlayersContextType';

const Players: React.FC = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>('white');
    const contextFavoritesObj: FavoritePlayersContextType | null = useContext(FavoritePlayersContext);

    return (
        <div className='PlayersList' style={{backgroundColor: `${backgroundColor}`}}>
            <Typography className='Title'>Favorite Players</Typography>
            <ColorPicker setBackgroundColor={setBackgroundColor}/>
            <List>
                {
                    contextFavoritesObj?.favorites.map(player => 
                        <Player 
                            playerToDisplay={player} 
                            showCheckBox={false}
                        />)
                }
            </List>
        </div>
    );
}

export default Players;