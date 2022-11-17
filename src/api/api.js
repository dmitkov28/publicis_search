import { auth } from "../firebase.config"


async function request(url, options) {
    try {
        const res = await fetch(url, options)

        if (res.status !== 200 && res.status !== 201) {
            const { message } = await res.json()
            throw new Error(message)
        }

        if (res.status == 201){
            return
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


export async function get(url, data) {
    const token = await auth.currentUser.getIdToken()
    return request(url, createOptions('get', token, data))
}

export async function post(url, data) {
    const token = await auth.currentUser.getIdToken()
    return request(url, createOptions('post', token, data))
}

export async function del(url) {
    const token = await auth.currentUser.getIdToken()
    return request(url, createOptions('delete', token))
}
