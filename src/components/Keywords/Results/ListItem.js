import DeleteIcon from "@mui/icons-material/Delete"
import { createContext, useContext, useState } from "react"
import { DataContext } from "../SuggestionsFinder"
import Chip from '@mui/material/Chip';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { nFormatter } from "../../../utils/numberFormatter";
import { GoogleModal } from "./GoogleModal";
import { useFetchSearchVolume } from "../../../hooks/useFetchSearchVolume";

export const SearchDataContext = createContext()


export default function ListItem({ modifier_type, modifier_keyword, suggestion }) {
    const [hovered, setHovered] = useState(false)
    const [modalOpened, setModalOpened] = useState(false)

    const { state, dispatch } = useContext(DataContext)
    const { data } = state.data
    const { platform } = state.data && state.data.query

    //TODO - FIX 👇 
    const country = (state.data && state.platform == 'google' || state.platform == 'youtube') && (state.data.query.country).toUpperCase()
    const { isFetching, isError, data: searchData, getData, setData } = useFetchSearchVolume()

    const openModal = () => {
        setModalOpened(true)
        getData(suggestion, country, 'last_year')
    }

    const deleteItem = () => {
        dispatch({ type: 'SET_DATA', payload: { ...state.data, data: { ...state.data.data, [modifier_type]: { ...state.data.data[modifier_type], [modifier_keyword]: [...state.data.data[modifier_type][modifier_keyword]].filter(x => x != suggestion) } } } })
    }


    const TwitterTemplate = ({ suggestion }) => {
        return (
            <>
                {suggestion.item}
                {suggestion.details && <Chip sx={{ ml: 3, userSelect: 'none' }} label={suggestion.details}></Chip>}
            </>
        )
    }

    const InstagramTemplate = ({ suggestion }) => {
        return (
            <>
                {Object.keys(suggestion)[0]}
                <Chip sx={{ ml: 3, userSelect: 'none' }} label={`${nFormatter(Object.values(suggestion)[0],)} posts`} />
            </>
        )
    }

    return (
        <>
            <li
                onMouseEnter={() => { setHovered(prev => !prev) }}
                onMouseLeave={() => { setHovered(prev => !prev) }}
                style={{
                    backgroundColor: hovered && '#efefef',
                    padding: '10px',
                    borderRadius: '4px',
                    marginTop: 20,
                    marginBottom: 20,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >

                {state.platform === 'instagram' && <InstagramTemplate suggestion={suggestion} />}
                {state.platform === 'twitter' && <TwitterTemplate suggestion={suggestion} />}
                {state.platform !== 'instagram' && state.platform !== 'twitter' && suggestion}

                {
                    hovered &&
                    <>
                        <TrendingUpIcon
                            onClick={openModal}
                            fontSize="small"
                            sx={{
                                color: 'text.secondary',
                                p: 0,
                                m: 0,
                                position: 'absolute',
                                right: 35,
                                cursor: 'pointer'
                            }}
                        />
                        <DeleteIcon
                            onClick={deleteItem}
                            fontSize="small"
                            sx={{
                                color: 'text.secondary',
                                p: 0,
                                m: 0,
                                position: 'absolute',
                                right: 10,
                                cursor: 'pointer'
                            }}
                        />
                    </>
                }
            </li>
            {['google', 'youtube'].includes(state.platform) &&
                <SearchDataContext.Provider value={{ searchData, isFetching, isError, getData, setData }}>
                    <GoogleModal modalOpened={modalOpened} setModalOpened={setModalOpened} keyword={suggestion} country={country} initialData={'hello'} />
                </SearchDataContext.Provider>
            }
        </>

    )
}
