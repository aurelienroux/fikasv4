export const useCookiesConsent = () => {
  const displayCookiesConsentFromStore = useState('cookies-consent-display', () => true)
  const cookieConsent = useCookie('cookieConsent', {
    maxAge: 60 * 60 * 24 * 180, // 6 months
    path: '/',
    watch: true,
  })

  const hideCookiesConsent = () => {
    displayCookiesConsentFromStore.value = false
  }

  const consentAndCreateCookie = () => {
    cookieConsent.value = 'true'
    hideCookiesConsent()
  }

  const hasCookieConsent = computed(() => !!cookieConsent.value)

  return {
    displayCookiesConsentFromStore,
    hideCookiesConsent,
    consentAndCreateCookie,
    hasCookieConsent,
  }
}
