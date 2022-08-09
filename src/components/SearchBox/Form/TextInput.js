import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


export default function TextInput({queryData, setQueryData, setSearch}) {
    const [value, setValue] = useState('')
    
    const handleChange = (e) => {
        setSearch(false)
        setQueryData({...queryData, searchQuery: e.target.value})
    }

    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                variant='outlined'
                label='Enter search query*'
                name='searchQuery'
                value={queryData.searchQuery}
                onChange={handleChange}
            />
        </Grid>
    )
}