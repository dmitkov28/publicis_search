export const useCurrentQueryKey = (state, currentTab = null) => {
    let currentQueryKey = []
    let { platform, form: { query, language, country } } = state

    if (!platform || !query) {
        currentQueryKey = null
        return { currentQueryKey }
    }
    currentQueryKey = [platform, query]
    language && currentQueryKey.push(language)
    country && currentQueryKey.push(country)
    currentQueryKey = currentQueryKey.toString()
    return { currentQueryKey }
}

