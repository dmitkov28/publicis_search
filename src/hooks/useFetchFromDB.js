import { useState } from "react";
import { getTimelinesByUser } from "../api/data"


export const useFetchFromDB = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)

    const getData = async (userId) => {
        setIsFetching(true)

        try {
            const result = await getTimelinesByUser(userId)
            setData(result)

        } catch (err) {
            setIsError(true)

        } finally {
            setIsFetching(false)
        }
    }

    return { isFetching, isError, setIsError, data, getData, setData }
}