import { useState } from "react";
import { getAllSaved } from "../api/data"


export const useFetchFromDB = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)

    const getData = async () => {
        setIsFetching(true)

        try {
            const result = await getAllSaved()
            setData(result)

        } catch (err) {
            setIsError(true)

        } finally {
            setIsFetching(false)
        }
    }

    return { isFetching, isError, setIsError, data, getData, setData }
}