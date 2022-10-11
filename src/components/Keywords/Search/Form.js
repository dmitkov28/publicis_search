import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import ParaglidingIcon from '@mui/icons-material/Paragliding';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import { useContext, useEffect } from "react";
import { DataContext } from "../SuggestionsFinder";
import { LANGUAGES, countryNames, amazonCountries, ebayCountries } from "../../../settings";
import { CompareModeContext } from "../../../pages/KeywordSearch";
import { useFetch } from "../../../hooks/useFetch";
import { get } from "../../../api/api";


export default function Form({ formFields }) {
    const { state, dispatch, getData, setData, setIsError, data } = useContext(DataContext)
    const { compareMode, setCompareMode } = useContext(CompareModeContext)

    const countryOptions = {
        all: countryNames,
        amazon: amazonCountries,
        ebay: ebayCountries
    }

    const handleChange = (e) => {
        dispatch({ type: 'SET_FORM', payload: { ...state.form, [e.target.name]: e.target.value } })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: 'SET_HAS_SEARCHED', payload: true })
        setIsError(false)

        if (!Object.values(state.form).every(x => x !== '')) {
            return
        }
        await getData(state)
    }

    const getFreestyle = async () => {
        setIsError(false)
        dispatch({ type: 'SET_HAS_SEARCHED', payload: true })
        if (!Object.values(state.form).every(x => x !== '')) {
            return
        }
        await getData({ ...state, freestyle: true })
    }


    return (
        <Grid onSubmit={handleSubmit} component='form' container spacing={3} sx={{ position: 'relative' }}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    variant='outlined'
                    label='Enter search term*'
                    id='SET_QUERY'
                    name='query'
                    autoComplete="off"
                    value={state.form.query}
                    onChange={handleChange}
                    error={state.hasSearched && state.form.query == ''}
                />
            </Grid>
            {formFields?.language &&
                <Grid item xs={12} md={formFields.language.width}>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel>Language</InputLabel>
                            <Select
                                label='Language'
                                placeholder="Language*"
                                name='language'
                                onChange={handleChange}
                                value={state.form.language}
                                error={state.hasSearched && state.form.language == ''}
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
                            <InputLabel>Country</InputLabel>
                            <Select
                                label='Country'
                                placeholder="Country*"
                                name='country'
                                onChange={handleChange}
                                value={state.form.country}
                                error={state.hasSearched && state.form.country == ''}
                            >
                                {countryOptions[formFields.countries].map((c) => <MenuItem disableRipple key={c.code} value={c.code}>{c.emoji} {c.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            }

            <Grid item xs={12} md={compareMode ? 12 : 6}>
                <Button
                    disableRipple
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={state.hasSearched && state.data ? <AutorenewRoundedIcon /> : <SearchIcon />}
                >
                    {state.hasSearched && state.data ? 'Refresh' : 'Search'}
                </Button>
            </Grid>
            {
                formFields.freestyle &&
                <Grid item xs={12} md={compareMode ? 12 : 3}>
                    <Button
                        disableRipple
                        fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<ParaglidingIcon />}
                        onClick={getFreestyle}
                    >
                        Freestyle
                    </Button>
                </Grid>
            }
            {!compareMode && (
                <Grid item xs={12} md={!formFields.freestyle ? 6 : 3}>
                    <Button
                        disableRipple
                        fullWidth
                        variant="outlined"
                        startIcon={<CompareArrowsIcon />}
                        onClick={() => setCompareMode(true)}
                    >
                        Compare
                    </Button>
                </Grid>
            )}
        </Grid>
    )
}