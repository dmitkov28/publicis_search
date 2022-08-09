import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';



export default function LanguageDropdown({
    fullWidth,
    queryData,
    setQueryData,

}) {

  
    const handleChange = (e) => {
        setQueryData({...queryData, language: e.target.value})
    }

    return (
        <Grid item xs={12} md={fullWidth ? 12 : 6}>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Language*</InputLabel>
                <Select
                    name='language'
                    label='Language'
                    value={queryData.language}
                    onChange={handleChange}
                >
                    <MenuItem value='EN'>
                        English
                    </MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}