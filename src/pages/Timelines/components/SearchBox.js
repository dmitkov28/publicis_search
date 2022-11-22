import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useState } from "react";
import { tabs } from "../../../components/Keywords/SuggestionsFinder";
import { LANGUAGES, countryNames, amazonCountries, ebayCountries } from "../../../settings";


const countryOptions = {
    all: countryNames,
    amazon: amazonCountries,
    ebay: ebayCountries
}

export default function SearchBox() {
    const [platform, setPlatform] = useState('');
    const [error, setError] = useState(false)
    const [language, setLanguage] = useState('')
    const [country, setCountry] = useState('')
    const [formFields, setFormFields] = useState(null)

    const handlePlatformChange = (e) => {
        const currentPlatform = e.target.value
        setPlatform(currentPlatform);
        setFormFields(tabs.filter(t => t.platform == currentPlatform)[0].formFields)

    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value)
    }

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        const { keyword, platform } = formData
        if (keyword.trim() === '') {
            setError(true)
            return
        }
        console.log(formData)
    }


    return (
        <Paper sx={{ p: 4, width: '70%', m: 'auto' }} elevation={3}>
            <Box onSubmit={handleSubmit} component='form'>
                <Grid container sx={{ justifyContent: 'center' }} spacing={3}>
                    <Typography sx={{ my: 2 }} variant="h5" fontWeight='bold' color='primary'>
                        Search for saved keywords
                    </Typography>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Keyword*'
                            name='keyword'
                            autoComplete="off"
                            error={error}
                            onChange={() => setError(false)}
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ display: 'flex!important' }}>
                            <InputLabel id="demo-simple-select-label">Platform (optional)</InputLabel>
                            <Select
                                value={platform}
                                label="Platform (optional)"
                                name='platform'
                                onChange={handlePlatformChange}
                                sx={{ '& .MuiSelect-select': { display: 'flex!important', flexDirection: 'row' } }}
                            >
                                {tabs.map(tab => {
                                    return (
                                        <MenuItem
                                            key={tab.platform}
                                            value={tab.platform}
                                        >
                                            <Avatar
                                                alt='logo'
                                                src={tab.image}
                                                sx={{ width: 24, height: 24, mr: 2 }}
                                                imgProps={{
                                                    style: { objectFit: 'contain' }
                                                }}

                                            >
                                            </Avatar>
                                            {tab.displayName}
                                        </MenuItem>
                                    )
                                }
                                )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {formFields?.language &&
                        <Grid item xs={12} md={formFields.language.width}>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>Language (optional)</InputLabel>
                                    <Select
                                        label='Language (optional)'
                                        placeholder="Language (optional)"
                                        name='language'
                                        onChange={handleLanguageChange}
                                        value={language}

                                    >
                                        {
                                            LANGUAGES.map(lang => <MenuItem disableRipple key={lang.code} value={lang.code}>{lang.name}</MenuItem>)
                                        }

                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    }

                    {formFields?.country &&
                        <Grid item xs={12} md={formFields.country.width}>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>Country (optional)</InputLabel>
                                    <Select
                                        label='Country (optional)'
                                        placeholder="Country (optional)"
                                        name='country'
                                        onChange={handleCountryChange}
                                        value={country}
                                    >
                                        {countryOptions[formFields.countries].map((c) => <MenuItem disableRipple key={c.code} value={c.code}>{c.emoji} {c.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    }

                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button type="submit" startIcon={<AssessmentIcon />} variant="contained">Get reports</Button>
                    </Grid>
                </Grid >
            </Box>
        </Paper >
    )
}