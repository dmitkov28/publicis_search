import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ImageIcon from '@mui/icons-material/Image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WordCloud from '../WordCloud';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';



export default function ResultCardSuggestions({ type, suggestions }) {
    const [view, setView] = useState('list')
    const toggleView = (e, newValue) => {
        newValue != null && setView(newValue)
    }

    return (
        <Paper elevation={3} sx={{ p: 2, my: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} >
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Typography variant='subtitle1' fontWeight='bold' fontSize={20}>
                                {type}
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
                        {view == 'cloud' && <WordCloud data={suggestions} />}
                        {view == 'list' && <ul style={{ listStyle: 'none' }}>
                            {suggestions.map((s, idx) => <li key={`${idx}_${s}`} style={{ marginTop: 15, marginBottom: 15 }}>{s}</li>)}
                        </ul>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    )
}