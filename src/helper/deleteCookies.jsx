const deleteCookies = (name) => {
  document.cookie = `${name}=; Max-Age=0`
}

export default deleteCookies
