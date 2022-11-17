import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { emojiFlags } from '../../../settings'
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { CSVLink } from "react-csv";
import { useContext, useState } from "react";
import { DataContext } from "../SuggestionsFinder";
import { CompareModeContext } from "../../../pages/KeywordSearch";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { logos } from "../../../settings";
import { useFetch } from "../../../hooks/useFetch";
import { createTimeline } from "../../../api/data";
import { auth } from "../../../firebase.config";


export default function QueryCard() {

    const { state } = useContext(DataContext)
    const { compareMode } = useContext(CompareModeContext)

    const { data: { query: { query, language, country, date, platform }, data } } = state

    const userId = auth.currentUser.uid
   
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.down('md'))
    const alignTitle = compareMode || isMd ? 'center' : 'flex-start'

    const [saved, setIsSaved] = useState(false)
    const[isSaving, setIsSaving] = useState(false)

    const saveData = async () => {
        setIsSaving(true)
        await createTimeline(userId, {query, language, country, platform, data })
        setIsSaving(false)
        setIsSaved(true)
    }


    const dateObj = new Date(date)
    const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`
    const firstRow = {
        'duckduckgo': ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Language', 'Seed Keyword'],
        'target': ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Seed Keyword'],
        'walmart': ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Seed Keyword'],
        'ebay': ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Country', 'Seed Keyword'],
        'amazon': ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Country', 'Seed Keyword'],
        'tiktok': ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Seed Keyword'],
        'pinterest': ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Language', 'Seed Keyword'],
        'twitter': ['Platform', 'Topic', 'Additional Details', 'Seed Keyword'],
        'instagram': ['Platform', 'Hashtag', 'Number of Posts', 'Seed Keyword'],
    }

    const csvData = data && {
        headers: [`${query || ''} ${language || ''} ${country || ''} ${formattedDate}`],
        data: [

            !(platform in firstRow)
                ? ['Platform', 'Modifier Type', 'Modifier', 'Suggestion', 'Language', 'Country', 'Seed Keyword']
                : firstRow[platform]
            ,
        ]
    }

    Object.entries(data).forEach(([modifier_type, items]) => {
        Object.entries(items).forEach(([modifier_keyword, items]) => {
            let list;

            items.forEach(item => {
                if (platform === 'twitter') {
                    list = [platform, item?.item, item?.details, query]
                } else if (platform == 'instagram') {
                    list = [platform, Object.keys(item)[0], Object.values(item)[0], query]
                } else if (platform == 'pinterest' || platform == 'duckduckgo') {
                    list = [platform, modifier_type, modifier_keyword, item, language, query]
                } else if (platform == 'tiktok' || platform == 'walmart' || platform == 'target') {
                    list = [platform, modifier_type, modifier_keyword, item, query]
                } else if (platform == 'amazon' || platform == 'ebay') {
                    list = [platform, modifier_type, modifier_keyword, item, country, query]
                }
                else {
                    list = [platform, modifier_type, modifier_keyword, item, language, country, query]
                }

                csvData.data.push(list)
            })
        })
    })


    return (
        <Grid item xs={12} sx={{ mt: 5, position: 'relative' }}>

            <Paper
                sx={{ maxWidth: '1100px', mx: 'auto', px: 3, py: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}
                elevation={3}
            >
                <Grid container item spacing={2}>
                    <Grid container item sm={12} md={6} lg={compareMode ? 12 : 6} sx={{ alignItems: 'center', justifyContent: alignTitle }}>
                        <Typography
                            align={compareMode ? 'center' : 'left'}
                            variant="h6"
                            fontWeight='bold'
                            sx={{ mr: 2 }}
                        >
                            {query}
                        </Typography>

                        <Box
                            align={compareMode ? 'center' : 'left'}
                            sx={{ mr: 2 }}
                        >
                            <Avatar
                                src={logos[platform]}
                                sx={{ width: 24, height: 24, borderRadius: 0 }}
                                imgProps={{
                                    style: { objectFit: 'contain' }
                                }} />
                        </Box>

                        <Typography
                            align={compareMode ? 'center' : 'left'}
                            variant="body" color='text.secondary'
                        >

                            {
                                country &&
                                `${emojiFlags.countryCode(country).emoji} 
                            ${country.toUpperCase()}`}{country && language && ' | '}
                            {language && (language).toUpperCase()
                            }
                        </Typography>

                        <Typography
                            sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
                            variant="body" color='text.secondary'
                            fontSize={14}
                        >
                            <CalendarMonthIcon sx={{ mr: 0.5 }} />
                            {formattedDate}

                        </Typography>
                    </Grid>


                    <Grid container sm={12} md={6} lg={compareMode ? 12 : 6} item spacing={1} sx={{ justifyContent: compareMode || isMd ? 'center' : 'flex-end' }}>
                        <Grid item >
                            <Button variant="outlined" size="small" startIcon={<RemoveRedEyeIcon />}>Track</Button>
                        </Grid>
                        <Grid item>
                            <CSVLink
                                data={csvData.data}
                                headers={csvData.headers}
                                filename={`${query} - ${platform} ${language || ''} ${country || ''} ${formattedDate}`}
                            >
                                <Button variant="contained" size="small" startIcon={<DownloadIcon />}>
                                    Export
                                </Button>
                            </CSVLink>
                        </Grid>

                        <Grid item>
                            {/* <Button onClick={saveData} variant="contained" size="small" startIcon={<SaveIcon />}>Save</Button> */}
                            <LoadingButton disabled={saved} loading={isSaving} loadingIndicator='Saving...' onClick={saveData} size="small" startIcon={saved ? <CheckIcon /> : <SaveIcon />} variant="contained">
                                {saved ? 'Saved' : 'Save'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}