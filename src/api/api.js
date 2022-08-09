async function request(url, options) {
    try {
        const res = await fetch(url, options)
        const result = await res.json()
        return result

    } catch (err) {
        throw new Error(err.message)
    }

}

function createOptions(method, data) {
    const headers = {
        method,
    }

    if (data != undefined) {
        headers['Content-Type'] = 'application/json'
        headers.body = JSON.stringify(data)
    }
}


export async function get(url) {
    return request(url, createOptions('get'))
}
