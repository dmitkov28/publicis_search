import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Form from './Form/Form';
import TabContent from './TabContent';
import googleLogo from '../../img/google.svg'
import youtubeLogo from '../../img/youtube.svg'
import amazonLogo from '../../img/amazon.svg'
import walmartLogo from '../../img/walmart.svg'
import targetLogo from '../../img/target.svg'
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import dummyData from '../../data.json'
import { getSuggestions } from '../../api/data';

const tabs = [
    {
        platform: 'google',
        displayName: 'Google',
        image: googleLogo,
        form: {
            'query': { fullWidth: true },
            'language': { fullWidth: false },
            'country': { fullWidth: false },

        }
    },
    {
        platform: 'youtube',
        displayName: 'YouTube',
        image: youtubeLogo,
        form: {
            'query': { fullWidth: true },
            'language': { fullWidth: false },
            'country': { fullWidth: false },

        }
    },
    {
        platform: 'amazon',
        displayName: 'Amazon',
        image: amazonLogo,
        form: {
            'query': { fullWidth: true },
            'country': { fullWidth: true },
        }
    },
    {
        platform: 'walmart',
        displayName: 'Walmart',
        image: walmartLogo,
        form: {
            'query': { fullWidth: true },
        }
    },
    {
        platform: 'target',
        displayName: 'Target',
        image: targetLogo,
        form: {
            'query': { fullWidth: true },
        }
    },

]

export default function TabBar({
    open,
    setOpen,
    setSearch,
    queryData,
    setQueryData,
    formValid,
    setFormValid,
}) {

    
    const [value, setValue] = useState(tabs[0].platform);
    const [hasSearched, setHasSearched] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setQueryData({...queryData, platform: newValue})
        setSearch(false)  
    };


    return (
        <Container sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        {tabs.map(tab => {
                            return (
                                <Tab
                                    icon={
                                        <Avatar
                                            alt={tab.platform}
                                            src={tab.image}
                                            sx={{ width: 25 }}
                                            imgProps={{
                                                style: { objectFit: 'contain' }
                                            }} />
                                    }
                                    value={tab.platform}
                                    key={tab.platform}
                                    label={tab.displayName}
                                    disableFocusRipple
                                    disableRipple
                                />

                            )
                        })}
                    </Tabs>


                </Box>
                {tabs.map(tab => {
                    return (
                        <Collapse key={tab.platform} in={open.formOpen} timeout="auto" sx={{ overflowX: 'auto' }}>
                            <TabContent
                                value={value}
                                index={tab.platform}
                            >

                                <Form
                                    platform={tab.platform}
                                    formFields={tab.form}
                                    setSearch={setSearch}
                                    queryData={queryData}
                                    setQueryData={setQueryData}
                                    formValid={formValid}
                                    setFormValid={setFormValid}
                                    setOpen={setOpen}
                                    hasSearched={hasSearched}
                                    setHasSearched={setHasSearched}
                                />
                            </TabContent>
                        </Collapse>
                    )
                })}

            </Box>
        </Container>
    );
}
