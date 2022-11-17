import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFetchFromDB } from '../../../hooks/useFetchFromDB';
import { useEffect } from 'react';

export default function ComparisonTimeline() {
    const { timelineId } = useParams()
    const { isFetching, isError, data, getData } = useFetchFromDB()
    useEffect(() => {
        getData(`/timelines/${timelineId}`)
    }, [])


    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                },
            }}
        >
            {
                data &&
                data.map(entry => {
                    return (
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                <Link
                                    to={`/timelines/${timelineId}/${entry.id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#2196f3',
                                    }}
                                >
                                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                        <CalendarMonthIcon sx={{ mr: 1 }} />
                                        {new Date(entry.created).toLocaleDateString()}
                                    </Typography>
                                </Link>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper sx={{ width: '70%', p: 3, display: 'flex', justifyContent: 'space-evenly' }} elevation={3}>
                                    Started tracking keyword.
                                </Paper>

                            </TimelineContent>
                        </TimelineItem>
                    )
                })

            }

            <TimelineItem>
                <TimelineOppositeContent color="textSecondary">
                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                        <CalendarMonthIcon sx={{ mr: 1 }} />
                        18 Oct, 2022
                    </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <Paper sx={{ width: '70%', p: 3, display: 'flex', justifyContent: 'space-evenly' }} elevation={3}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary=
                                    {<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        nike xyz
                                        <Chip sx={{ ml: 1 }} color='success' label='new' size='small' />
                                    </Box>}>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary=
                                    {<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        nike tech fleece
                                        <Chip sx={{ ml: 1 }} color='success' label='new' size='small' />
                                    </Box>}>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary=
                                    {<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        nike air 1
                                        <Chip sx={{ ml: 1 }} color='success' label='new' size='small' />
                                    </Box>}>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary=
                                    {<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        nike leggings
                                        <Chip sx={{ ml: 1 }} color='error' label='gone' size='small' />
                                    </Box>}>

                                </ListItemText>
                            </ListItem>


                        </List>
                    </Paper>

                </TimelineContent>
            </TimelineItem>
        </Timeline >
    )
}