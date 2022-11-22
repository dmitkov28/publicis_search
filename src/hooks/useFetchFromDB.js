import { useState } from "react";
import { get } from "../api/api";
import { getTimelinesByUser } from "../api/data"
import { auth } from "../firebase.config";
import { env } from "../settings";


export const useFetchFromDB = (dispatch) => {
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)

    const userId = auth.currentUser.uid
    
    const hosts = {
        'development': 'http://127.0.0.1:8000/api',
        'production': 'https://36jlnk0mg2.execute-api.eu-central-1.amazonaws.com/production/api',
    }
    
    const host = hosts[env]

    const getData = async (url) => {
        setIsFetching(true)
        
        try {
            const result = await get(host + url)
            if (dispatch){
                dispatch({type: 'SET_DATA', payload: result})
            } else {
                setData(result)
            }

        } catch (err) {
            setIsError(true)

        } finally {
            setIsFetching(false)
        }
    }

    return { isFetching, isError, setIsError, data, getData, setData }
}

