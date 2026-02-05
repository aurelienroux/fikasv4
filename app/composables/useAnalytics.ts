export const useAnalytics = () => {
  const config = useRuntimeConfig();
  const { hasCookieConsent } = useCookiesConsent();

  // Initialize Meta Pixel - loads only on client when consent exists
  const metaPixel = useScriptMetaPixel({
    id: config.public.metapixelDefaultId,
    scriptOptions: {
      trigger: hasCookieConsent,
    },
  });

  const track = (event: string) => {
    if (import.meta.dev) {
      console.log(`[Analytics] Track: ${event}`);
    }

    metaPixel.proxy.fbq('track', event);
  };

  return { track };
};
