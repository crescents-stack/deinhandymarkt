export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  // window.gtag("config", GA_MEASUREMENT_ID, {
  //     event: "cookie_consent_update",
  //     page_path: url,
  // });
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    const cookiesInLS = window.localStorage.getItem("cookieBanner");

    const persistentCookies = cookiesInLS
      ? JSON.parse(cookiesInLS)
      : {
          ad_storage: "denied",
          analytics_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          personalization_storage: "denied",
          functionality_storage: "denied",
          security_storage: "denied",
        };

    window[`dataLayer`] = window?.dataLayer || [];
    window.dataLayer.push({
      event: "cookie_consent_update",
      aggrements: persistentCookies,
    });
    window.gtag("consent", "update", persistentCookies);
    window.gtag("config", GA_MEASUREMENT_ID, {
      event: "cookie_consent_update",
      page_path: url,
    });
  }
};
