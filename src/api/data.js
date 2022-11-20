import { del, get, post } from './api';
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
    timelines: `timelines`,
    createTimeline: `timelines`,
    deleteTimeline: (timelineId) =>  `timelines/${timelineId}`,
}

export async function getSuggestions(params) {
    const { platform, query, country, language, freestyle } = params

    if (platform == 'instagram') {
        return get(host + endpoints.getInstagramHashtags(query))
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

    return get(url)
}

export async function getSearchVolume({ query, country, dateRange }) {
    const url = host + endpoints.getSearchVolume(query, country, dateRange)
    return get(url)
}



export async function createTimeline(data) {
    data.keyword = data.query
    delete data.query
    let url = host + '/datastore/' + endpoints.createTimeline
    return post(url, data)
}


export async function deleteTimeline(timelineId){
    let url = host + '/datastore/' + endpoints.deleteTimeline(timelineId)
    return del(url)
}

