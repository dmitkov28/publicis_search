async function request(url, options) {
    try {
        const res = await fetch(url, options)

        if (res.status !== 200) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const result = await res.json()
        return result

    } catch (err) {
        throw new Error(err.message)
    }

}

function createOptions(method, token, data) {
    const options = {
        method,
        headers: {}
    }

    if (token) {
        options.headers['Authorization'] = token
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    return options
}


export async function get(url, token, data) {
    return request(url, createOptions('get', token, data))
}

export async function post(url, token, data) {
    return request(url, createOptions('post', token, data))
}
