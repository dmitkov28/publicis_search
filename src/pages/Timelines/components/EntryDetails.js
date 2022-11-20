import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchFromDB } from "../../../hooks/useFetchFromDB"
import QueryCard from "../../../components/Keywords/Results/QueryCard";
import ResultCard from "../../../components/Keywords/Results/ResultCard";
import { Masonry } from "@mui/lab";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTheme, useMediaQuery } from "@mui/material";


export default function EntryDetails() {
    const { timelineId, entryId } = useParams()
    const { isFetching, isError, data, getData } = useFetchFromDB()

    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        getData(`/timelines/${timelineId}/${entryId}`)
    }, [])

    return (
        <>
        {data && JSON.stringify(data)}
        {/* {data &&
                        // <>
                        //     <QueryCard />
                        //     <Grid container sx={{ mt: 2, mx: 'auto' }} rowSpacing={3}>
                        //         {Object.keys(data.data).map(modifier_type => {
                        //             if (Object.values(data.data[modifier_type]).some(item => item.length > 0)) {
                        //                 return (

                        //                     <Grid key={modifier_type} item xs={12}>
                        //                         <Paper sx={{ maxWidth: '1100px', m: 'auto', px: 3, py: 1 }} elevation={3}>
                        //                             <Typography variant="h6" fontWeight='bold' sx={{ mb: 1 }}>{modifier_type}</Typography>
                        //                             <Divider />
                        //                             <Masonry columns={Object.keys(data.data[modifier_type]).length == 1 || isSm ? 1 : 3} spacing={3} sx={{ mt: 3 }}>
                        //                                 {Object.entries(data.data[modifier_type]).map(([modifier_keyword, suggestions]) => {
                        //                                     if (data.data[modifier_type][modifier_keyword].length > 0) {
                        //                                         return (
                        //                                             <ResultCard
                        //                                                 key={`${modifier_type}_${modifier_keyword}`} modifier_type={modifier_type}
                        //                                                 modifier_keyword={modifier_keyword}
                        //                                                 suggestions={suggestions}
                        //                                             />
                        //                                         )
                        //                                     }
                        //                                 })}

                        //                             </Masonry>
                        //                         </Paper>
                        //                     </Grid>
                        //                 )
                        //             }
                        //         })}
                        //     </Grid>
                        // </>
                    } */}
        </>
    )
}