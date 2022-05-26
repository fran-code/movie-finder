import env from '../env'
import { IStateSubmit } from './interfaces'

export const apiCall = async (
    endpoint: string,
    {
        data, headers: customHeaders, ...customConfig
    }: any = {}
) => {
    return window.fetch(`${env.urlApi}:${env.portApi}/${endpoint}`, {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    }).then(async response => {
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const submitReducer = (state: IStateSubmit, action: { type: 'loading' | 'success' | 'error' }) => {
    switch (action.type) {
        case 'loading': {
            return { ...state, loading: true, message: null }
        }
        case 'success': {
            return { ...state, loading: false, message: null }
        }
        case 'error': {
            return { ...state, loading: false, message: "Film not found!" }
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}