import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import TabNavigation from "./Search/Tabs";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ResultCard from "./Results/ResultCard";
import Masonry from '@mui/lab/Masonry';
import QueryCard from "./Results/QueryCard";
import { CompareModeContext } from "../../pages/KeywordSearch";
import { useMediaQuery, useTheme } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import { useCurrentQueryKey } from "../../hooks/useCurrentQueryKey";
import { logos } from "../../settings";

export const tabs = [
    {
        platform: 'google',
        displayName: 'Google',
        image: logos.google,
        formFields: {
            'country': { width: 6 },
            'language': { width: 6 },
            countries: 'all',
            freestyle: true,
        },
        requiredFields: ['query', 'language', 'country']
    },
    {
        platform: 'youtube',
        displayName: 'YouTube',
        image: logos.youtube,
        formFields: {
            'country': { width: 6 },
            'language': { width: 6 },
            countries: 'all',
            freestyle: true,
        },
        requiredFields: ['query', 'language', 'country']

    },
    {
        platform: 'duckduckgo',
        displayName: 'DuckDuckGo',
        image: logos.duckduckgo,
        formFields: {
            'language': { width: 12 },
            freestyle: true,
        },
        requiredFields: ['query', 'language']

    },
    {
        platform: 'bing',
        displayName: 'Bing',
        image: logos.bing,
        formFields: {
            'country': { width: 6 },
            'language': { width: 6 },
            countries: 'all',
            freestyle: true,
        },
        requiredFields: ['query', 'language', 'country'],
    },
    {
        platform: 'yahoo',
        displayName: 'Yahoo',
        image: logos.yahoo,
        formFields: {
            'country': { width: 6 },
            'language': { width: 6 },
            countries: 'all',
            freestyle: true,
        },
        requiredFields: ['query', 'language', 'country'],
    },

    {
        platform: 'amazon',
        displayName: 'Amazon',
        image: logos.amazon,
        formFields: {
            'country': { width: 12 },
            countries: 'amazon',
            freestyle: true,
        },
        requiredFields: ['query', 'country']

    },
    {
        platform: 'ebay',
        displayName: 'Ebay',
        image: logos.ebay,
        formFields: {
            'country': { width: 12, filter: true },
            countries: 'ebay',
            freestyle: true,
        },
        requiredFields: ['query', 'country'],
    },
    {
        platform: 'walmart',
        displayName: 'Walmart',
        image: logos.walmart,
        requiredFields: ['query'],
        formFields: {
            freestyle: true,
        }
    },
    {
        platform: 'target',
        displayName: 'Target',
        image: logos.target,
        requiredFields: ['query'],
        formFields: {
            freestyle: true,
        }
    },
    {
        platform: 'instagram',
        displayName: 'Instagram',
        image: logos.instagram,
        requiredFields: ['query'],
        formFields: {
            freestyle: false,
        }

    },
    {
        platform: 'twitter',
        displayName: 'Twitter',
        image: logos.twitter,
        requiredFields: ['query'],
        formFields: {
            freestyle: true,
        },
        // beta: true,

    },
    {
        platform: 'tiktok',
        displayName: 'TikTok',
        image: logos.tiktok,
        requiredFields: ['query'],
        formFields: {
            freestyle: true,
        },
        // beta: true,

    },
    {
        platform: 'pinterest',
        displayName: 'Pinterest',
        image: logos.pinterest,
        requiredFields: ['query', 'language'],
        formFields: {
            'language': { width: 12 },
            freestyle: true,
        },
    },
]

export const DataContext = createContext()

export default function SuggestionsFinder() {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_PLATFORM':
                return {
                    ...state,
                    platform: action.payload,
                };

            case 'SET_FORM':
                return {
                    ...state,
                    form: { ...action.payload },
                };
            case 'SET_DATA':
                return {
                    ...state,
                    data: action.payload,
                };

            case 'SET_FREESTYLE':
                return {
                    ...state,
                    freestyle: action.payload
                }
            case 'SET_HAS_SEARCHED':
                return {
                    ...state,
                    hasSearched: action.payload,
                };
            case 'SET_COMPARE_MODE':
                return {
                    ...state,
                    compareMode: action.payload,
                };

            default:
                return { ...state };
        }
    }

    const { compareMode } = useContext(CompareModeContext)

    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.down('md'))

    const [state, dispatch] = useReducer(reducer, {
        platform: tabs[0].platform,
        form: {
            query: '',
            language: '',
            country: '',
        },
        data: null,
        freestyle: false,
        hasSearched: false,
    })

    const { data, getData, isFetching, isError, setIsError, setData } = useFetch(state, dispatch)

    return (
        <>
            <DataContext.Provider value={{ state, dispatch, tabs, getData, setData, setIsError, data }}>
                <>
                    <>
                        <Paper sx={{ m: 'auto', px: 3, py: 1, maxWidth: '1100px' }} elevation={3}>
                            <TabNavigation />
                        </Paper>
                    </>

                    {isFetching &&
                        <Container sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </Container>
                    }

                    {isError &&

                        <Container sx={{ mt: 5, height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <Slide direction="up" in={true} timeout={1200} mountOnEnter unmountOnExit>
                                <Alert sx={{ width: '100%' }} severity="error">Something went wrong. Try again later.</Alert>
                            </Slide>
                        </Container>
                    }
                </>
                <>

                    {state.data &&
                        <>
                            <QueryCard />
                            <Grid container sx={{ mt: 2, mx: 'auto' }} rowSpacing={3}>
                                {Object.keys(state.data.data).map(modifier_type => {
                                    if (Object.values(state.data.data[modifier_type]).some(item => item.length > 0)) {
                                        return (

                                            <Grid key={modifier_type} item xs={12}>
                                                <Paper sx={{ maxWidth: '1100px', m: 'auto', px: 3, py: 1 }} elevation={3}>
                                                    <Typography variant="h6" fontWeight='bold' sx={{ mb: 1 }}>{modifier_type}</Typography>
                                                    <Divider />
                                                    <Masonry columns={Object.keys(state.data.data[modifier_type]).length == 1 || compareMode || isSm ? 1 : 3} spacing={3} sx={{ mt: 3 }}>
                                                        {Object.entries(state.data.data[modifier_type]).map(([modifier_keyword, suggestions]) => {
                                                            if (state.data.data[modifier_type][modifier_keyword].length > 0) {
                                                                return (
                                                                    <ResultCard
                                                                        key={`${modifier_type}_${modifier_keyword}`} modifier_type={modifier_type}
                                                                        modifier_keyword={modifier_keyword}
                                                                        suggestions={suggestions}
                                                                    />
                                                                )
                                                            }
                                                        })}

                                                    </Masonry>
                                                </Paper>
                                            </Grid>
                                        )
                                    }
                                })}
                            </Grid>
                        </>
                    }
                </>

            </DataContext.Provider>
        </>
    )
}