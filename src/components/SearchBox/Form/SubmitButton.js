import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search';

export default function SubmitButton() {
    return (
        <Grid item xs={12}>
            <Button
                startIcon={<SearchIcon />}
                variant='contained'
                fullWidth
                type='submit'
                disableRipple
                disableFocusRipple
            >
                Search
            </Button>
        </Grid>
    )
}