import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockResetIcon from '@mui/icons-material/LockReset';
import FeedbackCard from '../components/common/FeedbackCard';
import { auth } from '../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function ResetPassword() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate()
    const successMessage = 'Password reset email sent. Make sure to check your spam folder. Redirecting to the login page...'

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email } = Object.fromEntries(new FormData(e.target))
        
        if (!email){
            setError(true)
            return
        }

        await sendPasswordResetEmail(auth, email)
        setSuccess(true)
        setTimeout(() => navigate('/login'), 4000)
    }


    return (
        <>

            <Container
                component="main"
                sx={{
                    minWidth: 295,
                }}>
                <Box sx={{
                    overflow: 'hidden',
                    height:'100vh',
                    minHeight: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {
                        success
                            ? <FeedbackCard type='success' message={successMessage} />
                            : <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockResetIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Reset Password
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete='off'
                                        error={error}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Reset Password
                                    </Button>
                                </Box>
                            </Box>
                    }


                </Box>
            </Container>
        </>
    )
}