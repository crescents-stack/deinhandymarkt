"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "@/lib/gtag-helper";

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    pageview(GA_MEASUREMENT_ID, url);
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                  const cookiesInLS = window.localStorage.getItem("cookieBanner");

                  const persistentCookies = cookiesInLS ? JSON.parse(cookiesInLS): {
                    ad_storage: "denied",
                    analytics_storage: "denied",
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                    personalization_storage: "denied",
                    functionality_storage: "denied",
                    security_storage: "denied",
                }

                  if(window && window?.dataLayer){
                    window.dataLayer.push({
                      event: "cookiePolicy",
                      aggrements: persistentCookies,
                    });
                  }

                gtag('consent', 'default', persistentCookies);
                
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    event: "cookie_consent_update",
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
}
