import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';

const colors: string[] = ['white', 'blue', 'green', 'red', 'purple', 'pink', 'brown', 'yellow']

interface Props {
    setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorPicker: React.FC<Props> = (props: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { setBackgroundColor } = props;

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleColorPick = (event: React.MouseEvent<HTMLElement>) => {
        setBackgroundColor(event.currentTarget.innerText);
        handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    
    return (
        <>
            <Button onClick={handleOpen}>Choose Background Color</Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
                open={Boolean(anchorEl)}
                >
                {
                    colors.map(color => <MenuItem onClick={handleColorPick} value={color}>{color}</MenuItem>)
                }
            </Menu>
        </>
    );
}

export default ColorPicker;