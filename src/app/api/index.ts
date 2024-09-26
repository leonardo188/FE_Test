import Cookies from 'js-cookie'
const BASE_URL = 'http://localhost:8080/'

export async function httpRequest(method: string, url: string, token: boolean, payload?: object) {
  let jwt = ''

  if (token) {
    jwt = Cookies.get('ref') || ''
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    body: payload ? JSON.stringify(payload) : undefined,
  }

  try {
    const response = await fetch(BASE_URL + url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error in HTTP Request:', error)
    throw error
  }
}

export const getItem    = (url: string, token: boolean) => httpRequest('GET', url, token);
export const postItem   = (url: string, token: boolean, payload: object) => httpRequest('POST', url, token, payload);
export const putItem    = (url: string, token: boolean, payload: object) => httpRequest('PUT', url, token, payload);
export const deleteItem = (url: string, token: boolean, payload?: object) => httpRequest('DELETE', url, token, payload);
