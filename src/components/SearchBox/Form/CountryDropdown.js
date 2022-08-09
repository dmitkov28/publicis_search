import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const { flag, code, name, countries } = require('country-emoji');
const countryCodes = Object.entries(countries).map(data => Object.assign({}, { code: data[0], name: data[1][0] }))



export default function CountryDropdown({
    fullWidth,
    queryData,
    setQueryData,
   
}) {
   
    const handleChange = (e) => {
        setQueryData({...queryData, country: e.target.value})
    }

    return (
        <Grid item xs={12} md={fullWidth ? 12 : 6}>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Country*</InputLabel>
                <Select
                    name='country'
                    label='Country'
                    value={queryData.country}
                    onChange={handleChange}
                    
                >

                    {countryCodes.map(country => {
                        return (

                            <MenuItem
                                key={country.code}
                                value={country.code}
                            >
                                {flag(country.name)} {country.name}
                            </MenuItem>
                        )
                    })}

                </Select>
            </FormControl>
        </Grid>
    )
}