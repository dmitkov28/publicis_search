import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ResultCardSuggestions from './ResultCardSuggestions';
import ResultCardOther from './ResultCardOther';
import { useEffect, useState } from 'react';
import { getSuggestions } from '../../api/data';
import dummyData from '../../data.json';
import CircularProgress from '@mui/material/CircularProgress';


export default function ResultsContainer({ queryData, search }) {
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(()=> { setResults(dummyData)}, 3000)
        // const { platform, searchQuery, language, country } = queryData
        // const fetchData = async () => {
        //     const data = await getSuggestions(platform, searchQuery, country, language)
        //     setResults(data)
        // }
        // fetchData()

    }, [search])

    const descriptionLanguage = queryData.language && `${queryData.language} | `
    const descriptionCountry = queryData.country && `${queryData.country}`


    return (
        <Container sx={{ mt: 7 }}>
            {queryData
                ? <Paper elevation={3} sx={{ p: 2, my: 2, display: 'flex', alignItems: 'baseline' }}>
                    <Typography variant='h2' fontSize={20} fontWeight='bold' sx={{ mr: 3 }}>
                        {queryData.searchQuery}
                    </Typography>
                    <Typography variant='body2' color='#adadad'>
                        {queryData.platform == 'target' || queryData.platform == 'walmart'
                            ? null
                            : descriptionLanguage + descriptionCountry
                        }
                    </Typography>
                </Paper>
                : null
            }

            {
                results ? Object.entries(results).map(([type, suggestions]) => {
                    if (type == 'suggestions') {
                        return <ResultCardSuggestions loading={loading} key={type} type={type} suggestions={suggestions} />
                    } else {
                        return <ResultCardOther key={type} type={type} suggestions={suggestions} />
                    }
                })

                    : <Container sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Container>
            }

        </Container>
    )
}
