import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ImageIcon from '@mui/icons-material/Image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Skeleton from '@mui/material/Skeleton';



export default function ResultCardSuggestions({type, suggestions}){
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
                                            { type }
                                        </Typography>
                                        <ButtonGroup variant="outlined">
                                            <Button size='small'>
                                                <ImageIcon />
                                            </Button>
                                            <Button>
                                                <FormatListBulletedIcon />
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                    <ul style={{listStyle: 'none'}}>
                                        {suggestions.map((s, idx) => <li key={`${idx}_${s}`} style={{marginTop: 15, marginBottom: 15}}>{s}</li>)}
                                    </ul>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
    )
}