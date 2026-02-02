export const useAnalytics = () => {
  const track = (event: string) => {
    if (import.meta.dev) {
      console.log(`[Analytics] Track: ${event}`)
    }
    // TODO: Implement real FB Pixel tracking when ready
  }

  return { track }
}
