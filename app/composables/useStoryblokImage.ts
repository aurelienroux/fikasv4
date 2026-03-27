export const useStoryblokImage = () => {
  const resizeImg = (originalUrl: string, width: number): string => {
    return originalUrl.replace(
      'https://a.storyblok.com',
      `https://img2.storyblok.com/${width}x0/filters:format(webp)`
    )
  }

  return { resizeImg }
}
