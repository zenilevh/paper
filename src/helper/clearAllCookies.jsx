/**
 * https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
 * https://stackoverflow.com/questions/37764226/is-document-cookies-setter-asynchronous-in-web-browsers
 */
import deleteCookies from './deleteCookies'

const clearAllCookies = () => {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
    deleteCookies(name)
  }
}

export default clearAllCookies
