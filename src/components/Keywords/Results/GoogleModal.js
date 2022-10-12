import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { GoogleTrendChart } from './GoogleTrendChart';
import { CircularProgress, MenuItem, Paper, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { SearchDataContext } from './ListItem';
import { SocialDataModal } from './GetSocialDataModal';

export const GoogleModal = ({ modalOpened, setModalOpened, keyword, country }) => {
    const handleClose = () => setModalOpened(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openSocialDataModal, setOpenSocialDataModal] = useState(false)
    const [dateRange, setDateRange] = useState('last_year')
    const open = Boolean(anchorEl)

    const { searchData, isFetching, isError, getData, setData } = useContext(SearchDataContext)
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5, mb: 2 }}>
                    <ToggleButtonGroup sx={{mr: 2}} exclusive={true} value={dateRange} onChange={toggleDateRange}>
                        <ToggleButton disabled={isFetching} value='last_week' disableRipple>Past week</ToggleButton>
                        <ToggleButton disabled={isFetching} value='last_month' disableRipple>Past month</ToggleButton>
                        <ToggleButton disabled={isFetching} value='last_year' disableRipple>Past year</ToggleButton>
                    </ToggleButtonGroup>
                    <Button onClick={() => setOpenSocialDataModal(true)} startIcon={<AddIcon/>} size='large' variant='outlined'>Add Social Data</Button>
                </Box>
                <SocialDataModal open={openSocialDataModal} setOpen={setOpenSocialDataModal}/>
            </Paper>
        </Modal>
    )
}