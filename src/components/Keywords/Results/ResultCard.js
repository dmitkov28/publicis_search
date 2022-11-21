import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ImageIcon from '@mui/icons-material/Image';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import WordCloud from '../../WordCloud';
import { useContext, useState } from 'react';
import { DataContext } from '../SuggestionsFinder';
import ListItem from './ListItem';
import { CompareModeContext } from '../../../pages/KeywordSearch';
import { Divider } from '@mui/material';


export default function ResultCard({ modifier_type, modifier_keyword, suggestions }) {
    const [view, setView] = useState('list')
    const toggleView = (e, newValue) => {
        newValue != null && setView(newValue)
    }

    const { state, dispatch } = useContext(DataContext)
 
    const deleteCard = () => {
        dispatch({ type: 'SET_DATA', payload: {...state.data, data:{...state.data.data, [modifier_type]: { ...state.data.data[modifier_type], [modifier_keyword]: [] } }}})
    }

    return (
        <Paper sx={{ p: 1 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
            }}>
                <Typography variant='subtitle1' fontWeight='bold' fontSize={20}>
                    {modifier_keyword}
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
                    <ToggleButton value={true} onClick={deleteCard}>
                        <DeleteIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Divider sx={{ mt: 2 }} />
            {view === 'cloud' && <WordCloud data={state.platform == 'instagram' ? suggestions.map(s => Object.keys(s)[0]) : suggestions} />}
            {view === 'list' && <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 20 }}>
                {suggestions.map((s, idx) => {
                    return (
                        <ListItem
                            key={`${idx}_${s}`}
                            modifier_type={modifier_type}
                            modifier_keyword={modifier_keyword}
                            suggestion={s}
                        />
                    )

                }
                )
                }
            </ul>
            }
        </Paper>
    )
}