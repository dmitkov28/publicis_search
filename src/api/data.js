import { get } from './api';

const host = 'http://127.0.0.1:8000/api'

const endpoints = {
    getSuggestions : (platform, query) => `/${platform}/${query}`
  
}

export function getSuggestions(platform, query, country, language){
    let url = host + endpoints.getSuggestions(platform, query)
    if (country && platform != 'walmart' && platform != 'target'){
        url += `/${country}`
    }

    if (language && platform != 'walmart' && platform != 'target' && platform != 'amazon'){
        url += `/${language}`
    }
   
    return get(url)
}