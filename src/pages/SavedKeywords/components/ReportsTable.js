import { DataGrid } from '@mui/x-data-grid';
import { useFetchFromDB } from '../../../hooks/useFetchFromDB';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Link from '@mui/material/Link';
import KeywordSearch from '../../KeywordSearch';

const columns = [

    { field: 'keyword', headerName: 'Keyword', width: 300 },
    { field: 'platform', headerName: 'Platform', width: 250 },
    { field: 'country', headerName: 'Country', width: 120 },
    { field: 'language', headerName: 'Language', width: 120 },
    { field: 'created', headerName: 'Date Created', width: 200 },

];



export default function ReportsTable() {
    const { isFetching, isError, data, getData } = useFetchFromDB()
    const navigate = useNavigate()

    // useEffect(() => {
    //     getData()
    // }, [])


    return (
        <Box height='700px' width='85%' sx={{ mx: 'auto', p: 4 }}>
            {
                isFetching &&
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            }
            {!data && 
                  <Container sx={{ mt: 5, height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                  <Slide direction="up" in={true} timeout={1200} mountOnEnter unmountOnExit>
                      <Alert sx={{ width: '100%' }} severity="error">There was a problem connecting to the database. Try again later.</Alert>
                  </Slide>
              </Container>
            }
            
            {data &&
                <DataGrid
                    autoHeight={true}
                    rows={data.data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    // checkboxSelection
                    // onSelectionModelChange={item => console.log(item)}
                    onCellClick={item => {
                        const { keyword, platform, country, language } = item.row
                        let timelineUrl = `/saved-keywords/${keyword}/${platform}`

                        const queryParams = {}
                        if (country) {
                            queryParams['country'] = country
                        }

                        if (language) {
                            queryParams['language'] = language
                        }

                        if (Object.values(queryParams).length > 0) {
                            const params = Object.entries(queryParams)
                            const [firstKey, firstValue] = params.shift()
                            console.log(firstKey, firstValue)
                            timelineUrl += `?${firstKey}=${firstValue}`
                            params.forEach(([k, v]) => timelineUrl += `&${k}=${v}`)
                        }

                        navigate(timelineUrl)
                    }}
                    sx={{
                        p: 2,
                        '&:hover': {
                            cursor: 'pointer'
                        },
                    }}
                />
            }
        </Box>
    );
}
