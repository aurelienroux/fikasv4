export const useNavigation = () => {
  const { locale } = useI18n()

  // Shared state
  const navDataFR = useState<any>('nav-data-fr', () => null)
  const navDataEN = useState<any>('nav-data-en', () => null)
  const currentMenu = useState<string>('current-menu', () => 'home')

  // Reactive based on current locale
  const navData = computed(() => {
    return locale.value === 'fr' ? navDataFR.value : navDataEN.value
  })

  // Helper to ensure URLs start with /
  const correctUrl = (url: string) => {
    if (!url) return '/'
    return url.startsWith('/') ? url : `/${url}`
  }

  const changeCurrentMenu = (menu: string) => {
    currentMenu.value = menu
  }

  const resetMenu = () => {
    currentMenu.value = 'home'
  }

  return { navData, navDataFR, navDataEN, correctUrl, currentMenu, changeCurrentMenu, resetMenu }
}
