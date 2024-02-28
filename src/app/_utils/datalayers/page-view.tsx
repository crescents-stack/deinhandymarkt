"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PageView = () => {
  const pathname = usePathname();

  useEffect(() => {
    var pagePath = window.location.pathname;
    var pageURL = window.location.href;
    var referrer = document.referrer || "unknown";
    var pageHostname = window.location.hostname;

    const datalayer: any = {
      event: "pageview",
      pagePath,
      pageURL,
      referrer,
      pageHostname,
      // Add other necessary parameters for page view
      // Example: 'pageTitle': document.title,
      //          'pageType': 'article',
      //          'customParameter': 'value',
    }
    const cookies = window.localStorage.getItem("cookieBanner");
    if (cookies) {
      datalayer.cookies = cookies;
    }

    window.dataLayer.push(datalayer);
  }, [pathname]);
  return null;
};

export default PageView;