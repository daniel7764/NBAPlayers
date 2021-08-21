import React from 'react';
import { ListItem, Checkbox, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import usePlayer from './usePlayer';
import { Player as PlayerType} from '../../Types/Player';

const NA: string = 'N/A';

interface Props {
    playerToDisplay: PlayerType;
    showCheckBox: boolean;
}

const Player: React.FC<Props> = (props: Props) => {
    const { addFavoritePlayer, removeFavoritePlayer } = usePlayer();
    const { firstName, lastName, feet, inches, weight, position, team} = props.playerToDisplay;

    const getFullHeight = () => {
        if(feet && inches) {
            return `${feet}'${inches}`;
        }
        return NA;
    }

    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        checked ? addFavoritePlayer(props.playerToDisplay) : removeFavoritePlayer(props.playerToDisplay);
    }

    return (
        <ListItem>
            <ListItemIcon>
                {
                    props.showCheckBox &&
                        <Checkbox onChange={handleCheckBox}/>
                }
            </ListItemIcon>
            <ListItemText
                primary={`Name: ${firstName} ${lastName}`}
                secondary={
                    <>
                        <Typography>{`Height: ${getFullHeight()}`}</Typography>
                        <Typography>{`Weight: ${weight ? weight : NA}`}</Typography>
                        <Typography>{`Position: ${position ? position : NA}`}</Typography>
                        <Typography>{`Team: ${team}`}</Typography>
                    </>
                }
            />
        </ListItem>
    );
}

export default Player;
