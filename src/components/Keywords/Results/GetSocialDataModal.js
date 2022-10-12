import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { GoogleTrendChart } from './GoogleTrendChart';
import { Button, CircularProgress, MenuItem, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const SocialDataModal = ({ open, setOpen }) => {
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Paper sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '750px',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                outline: 0,
                p: 3,
                color: '#1976D2',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <CloseIcon
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        cursor: 'pointer',
                    }}

                />
                <Typography
                    fontWeight='bold'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    variant='h5'
                >
                    Pick a topic
                </Typography>

                <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', mt: 5, mb: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Social Data Topics</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Social Data Topics"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Netbase Topic 1</MenuItem>
                            <MenuItem value={20}>Netbase Topic 2</MenuItem>
                            <MenuItem value={30}>Netbase Topic 3</MenuItem>
                        </Select>
                    </FormControl>
                        <Button sx={{mt:3}} variant='contained'>Plot Social Data</Button>
                </Box>
            </Paper>
        </Modal>
    )
}