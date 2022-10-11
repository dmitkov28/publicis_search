import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Form from './Form';
import { useContext, useState } from 'react';
import { DataContext } from '../SuggestionsFinder';
import Slide from '@mui/material/Slide'
import Avatar from "@mui/material/Avatar";
import { CompareModeContext } from '../../../pages/KeywordSearch';

function TabPanel({ children, value, index }) {
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
                hidden={value !== index}
            >
                {value === index && (
                    <Box sx={{ py: 5, px: 3, overflow: 'hidden' }}>
                        {children}
                    </Box>
                )}
            </div>
        </Slide>
    );
}

const betaBadge = {
    '&.MuiTab-root::after': {
        content: "'beta'",
        fontSize: '10px',
        position: 'absolute',
        right: '0px',
        background: '#1976D2',
        padding: '2px 5px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        overflow: 'clip',
        zIndex: 99,
        top: '10px',
        textTransform: 'lowercase',
    }
}

export default function TabNavigation() {
    const { tabs, state, dispatch, setIsError } = useContext(DataContext)
    const { cache } = useContext(CompareModeContext)
    const [value, setValue] = useState(tabs[0].platform);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const [currentTab] = tabs.filter(({ platform }) => platform === newValue)
        const requiredFieldsForForm = currentTab.requiredFields.reduce((accumulator, value) => {
            return { ...accumulator, [value]: '' };
        }, {})

        Object.entries(state.form).forEach(([k, v]) => {
            if (v !== '' && Object.keys(requiredFieldsForForm).includes(k)) {
                requiredFieldsForForm[k] = v
            }
        })

        dispatch({ type: 'SET_FORM', payload: { ...requiredFieldsForForm } })
        dispatch({ type: 'SET_PLATFORM', payload: newValue, })
        setIsError(false)

        const cachedQueries = Object.keys(cache)

        const modifiedQueryKey = [newValue, ...Object.values(requiredFieldsForForm)].join(',')

        if (cachedQueries.includes(modifiedQueryKey)) {
            const cachedData = cache[modifiedQueryKey]
            dispatch({ type: 'SET_DATA', payload: cachedData })
        } else {
            dispatch({ type: 'SET_DATA', payload: null })
        }
    };

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    {tabs.map(t => {

                        return (
                            <Tab
                                value={t.platform}
                                key={t.platform}
                                label={t.platform}
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
                                sx={t.beta && betaBadge}
                                icon={
                                    <Avatar
                                        alt={t.platform}
                                        src={t.image}
                                        sx={{ width: 25, borderRadius: 0 }}
                                        imgProps={{
                                            style: { objectFit: 'contain' }
                                        }}
                                    />
                                }
                            />
                        )
                    })}
                </Tabs>
            </Box>

            {tabs.map(t => {
                return (
                    <TabPanel
                        key={t.platform}
                        value={value}
                        index={t.platform}
                    >
                        <Form formFields={t.formFields} />
                    </TabPanel>
                )
            })}
        </Box>
    );
}
