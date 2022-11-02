import { useFetchFromDB } from '../../../hooks/useFetchFromDB';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import TimelineIcon from '@mui/icons-material/Timeline';
import Chip from '@mui/material/Chip';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { logos } from '../../../settings';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, ListItemButton, ListItemIcon } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { auth } from '../../../firebase.config';


export default function ReportsTable() {
    const { isFetching, isError, data, getData } = useFetchFromDB()
    const navigate = useNavigate()
   
    const userId = auth.currentUser.uid

    useEffect(() => {
        getData(userId)
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper sx={{ mx: 'auto', px: 3, py: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
                    <Typography variant='h5' fontWeight='bold' sx={{ mb: 3 }}>My keyword timelines</Typography>

                    {
                        isFetching &&
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p:2 }}>
                            <CircularProgress />
                        </Box>
                    }

                    {data && !isFetching && data.length == 0 &&
                        <Typography variant='body' sx={{ p: 2 }}>No data.</Typography>
                    }

                    {data && !isFetching && data.length > 0 &&

                        <List sx={{ width: '100%' }}>
                            {
                                data.map(item => {
                                    return (
                                        <Box key={item.id} >
                                            <ListItem>
                                                <ListItemText
                                                    sx={{
                                                        '.MuiListItemText-secondary': {
                                                            mt: 1,
                                                        }
                                                    }}
                                                    primary={
                                                        <Typography variant='h5'>
                                                            {item.metadata.keyword}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Box
                                                            component='span'
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <Avatar
                                                                component='span'
                                                                sx={{ width: 20, height: 20, mr: 1.5 }}
                                                                src={logos[item.metadata.platform]}
                                                                imgProps={{
                                                                    style: { objectFit: 'contain' }
                                                                }}
                                                            />
                                                            <CalendarMonth sx={{ mr: 1 }} />
                                                            <Typography component='span' variant='body' sx={{ mr: 1 }}>
                                                                {item.created} - {item.last_updated}
                                                            </Typography>
                                                        </Box>
                                                    } />
                                                <IconButton onClick={() => {
                                                    const { keyword, platform, country, language } = item
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
                                                }}>
                                                    <TimelineIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    )

                                })
                            }
                        </List>
                    }

                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ mx: 'auto', px: 3, py: 2 }}>
                    <Typography variant='h5' fontWeight='bold' sx={{ mb: 3 }}>Shared with me</Typography>
                    <Typography variant='body' align='center' sx={{ mb: 3 }}>No keywords.</Typography>
                </Paper>

            </Grid>
        </Grid>
    );
}
