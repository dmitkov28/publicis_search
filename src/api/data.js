import { get, post } from './api';
import { auth } from '../firebase.config';
import { env } from '../settings';

const hosts = {
    'development': 'http://127.0.0.1:8000/api',
    'production': 'https://36jlnk0mg2.execute-api.eu-central-1.amazonaws.com/production/api',
}

const host = hosts[env]
// const headlessApiHost = 'https://3irbbqsvyl.execute-api.eu-central-1.amazonaws.com/prod/instagram'


const endpoints = {
    getSuggestions: (platform, query) => `/${platform}/${query}`,
    getInstagramHashtags: (query) => `/instagram/${query}`,
    getSearchVolume: (query, country, dateRange) => `/search_volume/${query}/${country}/${dateRange}`,
    getAllSaved: '/db/get-all'
}

export async function getSuggestions(params) {

    const { platform, query, country, language, freestyle } = params
    const token = await auth.currentUser.getIdToken()

    if (platform == 'instagram') {
        return get(host + endpoints.getInstagramHashtags(query), token)
    }

    let url = host + endpoints.getSuggestions(platform, query)

    if (language && platform !== 'walmart' && platform !== 'target' && platform !== 'amazon') {
        url += `/${language}`
    }

    if (country && platform !== 'walmart' && platform !== 'target') {
        url += `/${country}`
    }

    if (freestyle) {
        url += '?freestyle=true'
    }

    return get(url, token)
}

export async function getSearchVolume({ query, country, dateRange }) {
    const url = host + endpoints.getSearchVolume(query, country, dateRange)
    const token = 5
    return get(url, token)
}


export async function getAllSaved(){
    const url = host + endpoints.getAllSaved
    const token = 5
    return get(url, token)
}

export async function postSuggestions(params){
    const { platform, query, country, language, data } = params
    const token = await auth.currentUser.getIdToken()

    let url = host + endpoints.getSuggestions(platform, query)

    if (language && platform !== 'walmart' && platform !== 'target' && platform !== 'amazon') {
        url += `/${language}`
    }

    if (country && platform !== 'walmart' && platform !== 'target') {
        url += `/${country}`
    }
    
    return post(url, token, data)
}


