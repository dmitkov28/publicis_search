import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

export default function ExpandIcon({ onClick, rotate }) {
    const topPosition = rotate ? '97%' : '88%'
    return (
        <ExpandCircleDownIcon
            onClick={onClick}
            fontSize='large'
            sx={
                {
                    position: 'absolute',
                    left: '50%',
                    top: topPosition,
                    cursor: 'pointer',
                    transform: rotate && 'rotate(180deg)',
                }}
            color='primary'
        />
    )
}