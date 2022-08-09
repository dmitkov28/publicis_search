import { useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import Box from '@mui/material/Box';


export default function WordCloud({data}) {
    const tags = []
    data.map(x => tags.push({value: x}))
    
    const [minSize, setMinSize] = useState(10)
    const [maxSize, setMaxSize] = useState(16)
    const [randomColor, setRandomColor] = useState(true)
    const [shuffle, setShuffle] = useState(true)

    const options = {
        luminosity: 'dark',
        hue: 'blue',
    }

    return (
        <Box 
            fullWidth 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                p: 2 }}>
            
            <TagCloud
                minSize={minSize}
                maxSize={maxSize}
                tags={tags}
                shuffle={shuffle}
                colorOptions={options}
                style={{ textAlign: 'center', fontWeight: 600 }}
            >
            </TagCloud>
        </Box>

    )
}