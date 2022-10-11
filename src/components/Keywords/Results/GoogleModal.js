import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { GoogleTrendChart } from './GoogleTrendChart';
import { CircularProgress, MenuItem, Paper, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { SearchDataContext } from './ListItem';

export const GoogleModal = ({ modalOpened, setModalOpened, keyword, country }) => {
    const handleClose = () => setModalOpened(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(null)
    const [dateRange, setDateRange] = useState('last_year')
    const open = Boolean(anchorEl)

    const { searchData, isFetching, isError, getData, setData } = useContext(SearchDataContext)


    const handleDatePickerOpen = (e) => {
        setAnchorEl(e.target)
    }
    const handleDatePickerClose = () => {
        setAnchorEl(null);
    };

    const toggleDateRange = (e, newValue) => {
        newValue != null && setDateRange(newValue)
        setData(null)
        getData(keyword, country, newValue)
    }



    return (
        <Modal
            open={modalOpened}
            onClose={handleClose}
        >
            <Paper sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '900px',
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
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    {keyword}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '450px',
                    }}
                >
                    {isFetching &&
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                    {searchData && <GoogleTrendChart keyword={keyword} country={country} dateRange={dateRange}/>}
                        
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup sx={{ mt: 5, mb: 2 }} exclusive={true} value={dateRange} onChange={toggleDateRange}>
                        <ToggleButton value='last_week' disableRipple>Past week</ToggleButton>
                        <ToggleButton value='last_month' disableRipple>Past month</ToggleButton>
                        <ToggleButton value='last_year' disableRipple>Past year</ToggleButton>
                        <ToggleButton disableRipple onClick={handleDatePickerOpen}>Custom</ToggleButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleDatePickerClose}
                        >
                            <MenuItem
                                disableRipple
                                focusRipple={false}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                    '&.Mui-focusVisible': {
                                        background: 'none',
                                    },
                                    '&:hover': {
                                        background: 'none',
                                    }
                                }}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Start Date"
                                        value={value}
                                        disableRipple
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} sx={{ mb: 2 }} />}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        value={value}
                                        disableRipple
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <Button disableRipple variant='contained' startIcon={<TrendingUpIcon />} sx={{ mt: 2 }}>Get Trend</Button>
                            </MenuItem>
                        </Menu>
                    </ToggleButtonGroup>
                </Box>
            </Paper>
        </Modal>
    )
}