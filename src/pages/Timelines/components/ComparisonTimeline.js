import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
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
        getData(`/datastore/timelines/${timelineId}`)
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
                    isFetching &&
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                        <CircularProgress />
                    </Box>
                }

            {
                data &&
                <>
                    {data.slice(1).map(entry => {
                        return (
                                <TimelineItem key={entry.id}>
                                    <TimelineOppositeContent color="textSecondary">
                                        <Link
                                            // to={`/timelines/${timelineId}/${entry.id}`}
                                            to={'#'}
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
                                            {entry.new.length === 0 && entry.gone.length == 0 &&
                                                <Typography textAlign="center" width="100%">
                                                    No changes.
                                                </Typography>
                                            }
                                            <List>
                                                {entry.new.map(item => {
                                                    return (
                                                        <ListItem key={item}>
                                                            <ListItemText
                                                                primary=
                                                                {<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    {item}
                                                                    <Chip sx={{ ml: 1 }} color='success' label='new' size='small' />
                                                                </Box>}>
                                                            </ListItemText>
                                                        </ListItem>
                                                    )
                                                })}

                                            </List>
                                            <List>
                                                {entry.gone.map(item => {
                                                    return (
                                                        <ListItem key={item}>
                                                            <ListItemText
                                                                primary=
                                                                {<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    {item}
                                                                    <Chip sx={{ ml: 1 }} color='error' label='gone' size='small' />
                                                                </Box>}>
                                                            </ListItemText>
                                                        </ListItem>
                                                    )
                                                })}
                                            </List>
                                        </Paper>
                                    </TimelineContent>
                                </TimelineItem>
                        )
                    })}
                    <TimelineItem>
                        <TimelineOppositeContent color="textSecondary">
                            <Link
                                // to={`/timelines/${timelineId}/${data[0].id}`}
                                to={'#'}
                                style={{
                                    textDecoration: 'none',
                                    color: '#2196f3',
                                }}
                            >
                                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                    <CalendarMonthIcon sx={{ mr: 1 }} />
                                    {new Date(data[0].started_tracking).toLocaleDateString()}
                                </Typography>
                            </Link>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper sx={{ width: '70%', p: 3, display: 'flex', justifyContent: 'space-evenly' }} elevation={3}>
                                Started tracking.
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                </>
            }

        </Timeline >
    )
}