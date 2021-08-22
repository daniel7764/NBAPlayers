import React from 'react';
import { TextField } from '@material-ui/core';

interface Props  {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<Props> = (props: Props) => {
    const { query, setQuery} = props;
    return (
        <TextField 
            value={query}
            placeholder={'Enter Player Name'}
            onChange={(event) => {setQuery(event.currentTarget.value)}}
        />
    );
}

export default Search;