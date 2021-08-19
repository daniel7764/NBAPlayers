import React, { useContext, useState } from 'react';
import { List, Typography } from '@material-ui/core';

import '../ListStyles.css';
import SinglePlayer from '../SinglePlayer/SinglePlayer';
import { FavoritePlayersContext } from '../../Context/FavoritePlayersContext';
import { FavoritePlayersContextType } from '../../Context/FavoritePlayersContextType';
import ColorPicker from './ColorPicker/ColorPicker';

const Players: React.FC = () => {
    const [currBackgroundColor, setCurrBackgroundColor] = useState<string>('white');
    const {favorites, setFavorites} = useContext(FavoritePlayersContext) as FavoritePlayersContextType;

    return (
        <div className='PlayersList' style={{backgroundColor: `${currBackgroundColor}`}}>
            <Typography className='Title'>Favorite Players</Typography>
            <span className='ColorPicker'>
                <ColorPicker currBackgroundColor={currBackgroundColor} setCurrBackgroundColor={setCurrBackgroundColor}/>
            </span>
            <List>
                {
                    favorites.map(player => <SinglePlayer playerToDisplay={player} showCheckBox={false}/>)
                }
            </List>
        </div>
    );
}

export default Players;