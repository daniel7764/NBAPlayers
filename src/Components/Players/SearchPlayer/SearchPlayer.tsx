import React from 'react';
import { TextField } from '@material-ui/core';

interface Props  {
    searchedName: string;
    setSearchedName: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPlayer: React.FC<Props> = (props: Props) => {
    const { searchedName, setSearchedName} = props;
    return (
        <TextField 
            value={searchedName}
            placeholder={'Enter Player Name'}
            onChange={(event) => {setSearchedName(event.currentTarget.value)}}
        />
    );
}

export default SearchPlayer;