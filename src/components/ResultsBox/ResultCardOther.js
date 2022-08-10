import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ImageIcon from '@mui/icons-material/Image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Masonry from '@mui/lab/Masonry';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import WordCloud from '../WordCloud';


export default function ResultCard({ type, suggestions }) {
    return (
        <Paper elevation={3} sx={{ p: 2, my: 2 }}>
            <Typography
                variant='h6'
                sx={{ p: 2 }}
                fontWeight={600}
            >
                {type}
                <Divider />
            </Typography>

            <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
                {Object.entries(suggestions).map(([suggestionType, suggestions]) => {
                    if (Object.values(suggestions).length > 0) {
                        return <OtherCard key={suggestionType} suggestionType={suggestionType} suggestions={suggestions} />
                    }
                })}
            </Masonry>
        </Paper>
    )
}


function OtherCard({ suggestionType, suggestions }) {
    const [view, setView] = useState('list')
    const toggleView = (e, newValue) => {
        setView(newValue)
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>



                <Typography variant='subtitle1' fontWeight='bold' fontSize={20}>
                    {suggestionType}
                </Typography>
                
                <ToggleButtonGroup
                    exclusive
                    value={view}
                    onChange={toggleView}
                >
                    <ToggleButton value='cloud'>
                        <ImageIcon />
                    </ToggleButton>
                    <ToggleButton value='list'>
                        <FormatListBulletedIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                {
                    view == 'cloud'
                        ? <WordCloud data={suggestions} />
                        : <ul style={{ listStyle: 'none' }}>
                            {suggestions.map((s, idx) => <li key={`${idx}_${s}`} style={{ marginTop: 15, marginBottom: 15 }}>{s}</li>)}
                        </ul>
                }
            </Box>

        </Paper>
    )
}