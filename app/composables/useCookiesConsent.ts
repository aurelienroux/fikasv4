export const useCookiesConsent = () => {
  const displayCookiesConsentFromStore = useState('cookies-consent-display', () => true)

  const hideCookiesConsent = () => {
    displayCookiesConsentFromStore.value = false
  }

  const consentAndCreateCookie = () => {
    const cookieName = 'cookieConsent'
    const cookieValue = 'true'
    const expirationDate = new Date()
    expirationDate.setMonth(expirationDate.getMonth() + 6)

    let cookieString = cookieName + '=' + encodeURIComponent(cookieValue)
    cookieString += '; expires=' + expirationDate.toUTCString()

    document.cookie = cookieString

    hideCookiesConsent()
  }

  const hasCookieConsent = () => {
    if (import.meta.client) {
      return document.cookie.includes('cookieConsent=true')
    }
    return false
  }

  return {
    displayCookiesConsentFromStore,
    hideCookiesConsent,
    consentAndCreateCookie,
    hasCookieConsent,
  }
}
