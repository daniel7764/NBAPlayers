import React from 'react';
import { ListItem, Checkbox, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import { Player as PlayerType} from '../../types/Player';

const NA: string = 'N/A';

interface Props {
    playerToDisplay: PlayerType;
    showCheckBox: boolean;
    handleFavoriteStatusChange?: (fav: boolean, playerChanged: PlayerType) => void;
}

const Player: React.FC<Props> = (props: Props) => {
    const {isFav, firstName, lastName, feet, inches, weight, position, team} = props.playerToDisplay;
    const { handleFavoriteStatusChange } = props;

    const getFullHeight = () => {
        if(feet && inches) {
            return `${feet}'${inches}`;
        }
        return NA;
    }

    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        handleFavoriteStatusChange &&
            handleFavoriteStatusChange(checked, props.playerToDisplay);
    }

    return (
        <ListItem>
            <ListItemIcon>
                {
                    props.showCheckBox &&
                        <Checkbox onChange={handleCheckBox} checked={isFav}/>
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
