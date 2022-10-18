import SearchBox from './components/SearchBox';
import ComparisonTimeline from './components/ComparisonTimeline';
import ReportsTable from './components/ReportsTable';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

export default function SavedKeywords() {
    const params = useParams()

    return (
        <>

            {/* <SearchBox sx={{ my: 5 }} /> */}
            {/* <ComparisonTimeline /> */}
            {params.keyword
                ? <ComparisonTimeline />
                : <ReportsTable />
            }


        </>
    );
}
