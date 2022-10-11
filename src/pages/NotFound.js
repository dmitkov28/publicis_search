import Container  from "@mui/material/Container";
import NotFoundImage from '../img/404.svg';

export default function NotFound() {
    return (
        <Container sx={{ pt: 10, display: 'flex', justifyContent: 'center'}}>
            <img src={NotFoundImage} style={{maxWidth: '600px'}} alt='Not found'></img>
        </Container>
    )
}