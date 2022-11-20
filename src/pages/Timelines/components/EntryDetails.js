import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchFromDB } from "../../../hooks/useFetchFromDB"
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, useMediaQuery } from "@mui/material";


export default function EntryDetails() {
    const { timelineId, entryId } = useParams()
    const { isFetching, isError, data, getData } = useFetchFromDB()

    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        getData(`/datastore/timelines/${timelineId}/${entryId}`)
    }, [])

    return (
        <>
            {
                isFetching &&
                <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                    <CircularProgress />
                </Box>
            }
            {data && JSON.stringify(data)}
        </>
    )
}