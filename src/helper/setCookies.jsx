const setCookies = (prop, value, expires = 9999) => {
  if (document) {
    document.cookie = `${prop}=${value}; max-age=${expires}; path=/`
  }
}

export default setCookies
