import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

export default function TabContent(props) {
    const { children, value, index } = props;

    return (
        <Slide
            appear={false}
            in={value === index}
            direction="right"
            timeout={350}
            easing={{
                enter: "cubic-bezier(0.85,0.64,0.24,1)",
                exit: "cubic-bezier(0.85,0.64,0.24,1)"
            }}
            mountOnEnter
            unmountOnExit
        >
            <div
                role="tabpanel"
                hidden={value !== index}
            >
                {value === index && (
                    <Box sx={{ py: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        </Slide>
    );
}