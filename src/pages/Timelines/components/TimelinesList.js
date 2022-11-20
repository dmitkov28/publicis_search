import { useFetchFromDB } from '../../../hooks/useFetchFromDB';
import Box from '@mui/material/Box';
import { useEffect, useReducer, useState } from 'react';
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
import { logos } from '../../../settings';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import DeleteConfirmationModal from './DeleteConfirmationModal';


export default function TimelinesList() {
    
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_DATA':
                return {
                    ...state,
                    data: action.payload,
                };


            default:
                return { ...state };
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        data: null,
    })

    const [openModal, setOpenModal] = useState(false);
    const [deleteTimelineId, setDeleteTimelineId] = useState(false);
    const { isFetching, isError, getData } = useFetchFromDB(dispatch)
    const navigate = useNavigate()

    useEffect(() => {
        getData('/timelines')
    }, [])

    return (
        <>
            <Paper sx={{ mx: 'auto', px: 3, py: 2, width: '60%' }} elevation={3}>
                <Box>
                    <Typography variant='h5' fontWeight='bold' sx={{ mb: 3 }} textAlign='center'>My timelines</Typography>
                </Box>

                {
                    isFetching &&
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                        <CircularProgress />
                    </Box>
                }

                {state.data && !isFetching && state.data.length == 0 &&
                    <Box>

                        <Typography variant='body' sx={{ p: 2 }}>No data.</Typography>
                    </Box>
                }

                {state.data && !isFetching && state.data.length > 0 &&

                    <List sx={{ width: '100%' }}>
                        {
                            state.data.map(item => {
                                const timelineUrl = `/timelines/${item.id}`
                                return (
                                    <Box key={item.id}>
                                        <ListItem>
                                            <ListItemText
                                                sx={{
                                                    '.MuiListItemText-secondary': {
                                                        mt: 1,
                                                    }
                                                }}
                                                primary={
                                                    <Typography variant='h5'>
                                                        {item.keyword}
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
                                                            src={logos[item.platform]}
                                                            imgProps={{
                                                                style: { objectFit: 'contain' }
                                                            }}
                                                        />
                                                        <Typography sx={{ mr: 1 }} component='span'>{item.language} - {item.country}</Typography>
                                                        <CalendarMonth sx={{ mr: 1 }} />
                                                        <Typography component='span' variant='body' sx={{ mr: 1 }}>
                                                            {new Date(item.created).toLocaleDateString()} - {new Date(item.last_updated).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                } />
                                            <IconButton onClick={() => {
                                                navigate(timelineUrl)
                                            }}>
                                                <TimelineIcon />
                                            </IconButton>
                                            <IconButton onClick={()=>{
                                                setDeleteTimelineId(item.id)
                                                setOpenModal(true)
                                            }}>
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
            <DeleteConfirmationModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                timelineId={deleteTimelineId}
                dispatch={dispatch}
                state={state}
            />
        </>
    );
}
