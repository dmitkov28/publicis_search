import SearchBox from './components/SearchBox';
import ComparisonTimeline from './components/ComparisonTimeline';
import TimelinesList from './components/TimelinesList';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

export default function Timelines() {
    const params = useParams()

    return (
        <>

            {/* <SearchBox sx={{ my: 5 }} /> */}
            {/* <ComparisonTimeline /> */}
            {params.timelineId
                ? <ComparisonTimeline />
                : <TimelinesList />
            }


        </>
    );
}
