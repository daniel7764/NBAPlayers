import React from 'react';
import { ListItem, Checkbox, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import useSinglePlayer from './useSinglePlayer';
import Player from '../../Types/Player';

const NA: string = 'N/A'

const SinglePlayer: React.FC<Props> = (props: Props) => {
    const { alterFavorites } = useSinglePlayer();
    const { firstName, lastName, feet, inches, weight, position, team} = props.playerToDisplay;

    const getFullHeight = () => {
        if(feet && inches) {
            return `${feet}'${inches}`;
        }
        return NA;
    }

    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        alterFavorites(props.playerToDisplay, checked);
    }

    return (
        <ListItem ref={props.forwardref}>
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

export default SinglePlayer;

interface Props {
    playerToDisplay: Player,
    showCheckBox: boolean,
    forwardref?: any,
}