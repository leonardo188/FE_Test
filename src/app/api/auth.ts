import { postItem } from './index'
import Cookies from 'js-cookie'

export async function login(payload: any) {
  const response = await postItem('api/auth/login', false, payload )

  if (response && response.token) {
    Cookies.set('ref', response.token, { expires: 1, path: '/', sameSite: 'Lax', secure: true })
  }

  return response
}
