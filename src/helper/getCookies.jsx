const getCookies = (name) => {
  if (!document) {
    return null
  }
  const match = document.cookie.match(
    new RegExp(`(^| )${name}=([^;]+)`),
  )
  if (match) return match[2]
  return null
}

export default getCookies
