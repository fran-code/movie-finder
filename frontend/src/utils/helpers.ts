import env from '../env';

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