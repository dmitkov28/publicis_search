import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Container from '@mui/material/Container'
import Slide from '@mui/material/Slide';


export default function FeedbackCard({ type, message }) {
    
    return (
        <Slide direction="up" in={true} timeout={1200} mountOnEnter unmountOnExit>
            <Card sx={{ maxWidth: 600, p:3 }} elevation={3}>
                <CardContent>
                    <Container sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        {type === 'error' &&  <ErrorIcon fontSize='large' sx={{ color: 'red' }} /> }
                        {type === 'success' &&  <CheckCircleIcon fontSize='large' sx={{ color: 'green' }} /> }
                    </Container>
                    <Typography variant='body' align='center' gutterBottom>
                        {message}
                    </Typography>
                </CardContent>
            </Card>
        </Slide>
    );
}

