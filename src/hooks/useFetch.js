import { useState, useContext } from "react";
import { getSuggestions } from "../api/data"
import { CompareModeContext } from "../pages/KeywordSearch";
import { useCurrentQueryKey } from "./useCurrentQueryKey";

export const useFetch = (state, dispatch) => {
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)
    let { currentQueryKey } = useCurrentQueryKey(state)
    const { cache } = useContext(CompareModeContext)


    const getData = async (params) => {
        const { platform, form, freestyle, refetch } = params
        setIsFetching(true)
        dispatch({ type: 'SET_DATA', payload: null })

        if (freestyle) {
            currentQueryKey += ',freestyle'
        }

        try {
            if (Object.keys(cache).includes(currentQueryKey) && !refetch) {
                setData(cache[currentQueryKey])
                dispatch({ type: 'SET_DATA', payload: cache[currentQueryKey] })
                return { isFetching, isError, setIsError, data, getData, setData }
            }
            
            const result = await getSuggestions({ platform: platform, ...form, freestyle })
            setData(result)
            cache[currentQueryKey] = result
            dispatch({ type: 'SET_DATA', payload: result })

        } catch (err) {
            setIsError(true)

        } finally {
            setIsFetching(false)
        }
    }

    return { isFetching, isError, setIsError, data, getData, setData }

}