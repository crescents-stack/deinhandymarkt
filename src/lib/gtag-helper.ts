export const pageview = (GA_MEASUREMENT_ID : string, url : string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        event: "cookie_consent_update",
        page_path: url,
    });
};