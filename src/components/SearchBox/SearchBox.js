import TabBar from './TabBar';
import TabContent from './TabContent';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import ExpandIcon from './ExpandIcon';




export default function SearchBox({ data, setData, search, setSearch, queryData, setQueryData}) {

    const [formValid, setFormValid] = useState(false)
    
    const [open, setOpen] = useState({
        formOpen: true,
        iconUp: true,
    });

  
    const toggleOpen = () => {
        const { formOpen, iconUp } = open
        setOpen({
            formOpen: !formOpen,
            iconUp: !iconUp
        })
    }

    return (
        <Container >
            <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
                <TabBar
                    data={data}
                    setData={setData}
                    open={open}
                    setOpen={setOpen}
                    setSearch={setSearch}
                    queryData={queryData}
                    setQueryData={setQueryData}
                    formValid={formValid}
                    setFormValid={setFormValid}
                />

                <ExpandIcon onClick={toggleOpen} rotate={open.iconUp} />

            </Paper >
        </Container>

    )

}