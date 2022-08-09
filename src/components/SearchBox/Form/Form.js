import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import LanguageDropdown from './LanguageDropdown';
import CountryDropdown from './CountryDropdown';
import { useEffect, useState, useRef } from 'react';
import dummyData from '../../../data.json'
import { getSuggestions } from '../../../api/data';


export default function Form({
    platform,
    formFields,
    setSearch,
    queryData,
    setQueryData,
    formValid,
    setFormValid,
    setOpen,
    hasSearched,
    setHasSearched

}) {

    const form = useRef(null)
    const [formErrors, setFormErrors] = useState([])
    
    useEffect(() => {   
        validateForm(form.current)
    }, [])


    function onSubmit(e) {
        e.preventDefault()
        validateForm(e.target)
    }

    function validateForm(form) {
        const formData = Object.fromEntries(new FormData(form))
        const missingFields = Object.entries(formData).filter(([inputName, inputValue]) => inputValue == '').map(([k, v]) => k)

        if (missingFields.length > 0) {
            setFormValid(false)
            setOpen({formOpen: true, iconUp: true})
            setSearch(false)
        } else {
            setFormValid(true)
            setOpen({formOpen: false, iconUp: false})
            setSearch(true)

        }

    }

    return (
        <Container sx={{ pt: 2 }}>
            <form ref={form} onSubmit={onSubmit} autoComplete='off'>
                <Grid container spacing={3}>
                    <TextInput
                        queryData={queryData}
                        setQueryData={setQueryData}
                        error={formErrors?.query}
                        setSearch={setSearch}
                    />

                    {
                        formFields?.['language']
                            ? <LanguageDropdown
                                fullWidth={formFields['language'].fullWidth}
                                queryData={queryData}
                                setQueryData={setQueryData}
                            />
                            : null
                    }

                    {
                        formFields?.['country']
                            ? <CountryDropdown
                                fullWidth={formFields['country'].fullWidth}
                                queryData={queryData}
                                setQueryData={setQueryData}
                            />
                            : null
                    }
                    <SubmitButton />

                </Grid>
            </form>
        </Container>
    )
}


