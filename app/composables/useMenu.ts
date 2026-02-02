export const useMenu = () => {
  const newsletterOpen = useState('newsletterOpen', () => false)

  const toggleNewsletter = () => {
    newsletterOpen.value = !newsletterOpen.value
  }

  return { newsletterOpen, toggleNewsletter }
}
