import { useState } from "react";
import { getSearchVolume } from "../api/data"


export const useFetchSearchVolume = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)

    const getData = async (query, country, dateRange) => {
        setIsFetching(true)

        try {
            const result = await getSearchVolume({ query, country, dateRange })
            setData(result)

        } catch (err) {
            setIsError(true)

        } finally {
            setIsFetching(false)
        }
    }

    return { isFetching, isError, setIsError, data, getData, setData }

}