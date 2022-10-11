import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FeedbackCard from '../FeedbackCard';
import { auth } from '../../../firebase.config';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavMenu() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [error, setError] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        try {
            await auth.signOut()
            navigate('/login')

        } catch (err) {
            setError(true)
        }
        handleClose()
    };

    const user = auth.currentUser


    return (

        error
            ? <FeedbackCard type='error' message='Something went wrong' />
            : <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disableRipple
                        size='large'
                        onClick={handleClick}
                    >
                        <PersonIcon sx={{ color: '#fff' }} />
                    </IconButton>


                    <Typography sx={{ display: { xs: "none", md: "block" } }}>{user.email}</Typography>

                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={logout}>  <Logout size='small' sx={{ mr: 1 }} /> Logout</MenuItem>
                    <MenuItem onClick={() => navigate('/reset-password')}>  <LockResetIcon size='small' sx={{ mr: 1 }} /> Reset password</MenuItem>
                </Menu>
            </>

    )


}
