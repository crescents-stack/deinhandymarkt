/* eslint-disable @next/next/next-script-for-ga */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import NavFootWrapper from "@/components/layout/navfoot-wrapper";
import { ReactChildren } from "@/lib/types";
import ContextWrapper from "@/lib/contexts/context-wrapper";
import PageView from "./_utils/datalayers/page-view";
import type { Viewport } from "next";
import GoogleAnalytics from "./_utils/datalayers/google-analytics";
import { Suspense } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

// Declare the dataLayer object as a global variable
declare global {
  interface Window {
    dataLayer: any[];
    gtag: Function;
  }
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deinhandymarkt",
  description: "Germary's largest iphone accessories market.",
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en">
      {/* <head>
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WBXPQRBB');
          `,
          }}
        />
        <script
          id="data-layer"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />
      </head> */}
      <Suspense>
        <GoogleAnalytics
          GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}
        />
      </Suspense>
      <body className={inter.className} suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            height="0"
            width="0"
            style={{ display: "none", opacity: "none" }}
          ></iframe>
        </noscript>
        {/* <PageView /> */}
        <ContextWrapper>
          <NavFootWrapper>
            <main>{children}</main>
          </NavFootWrapper>
        </ContextWrapper>
      </body>
    </html>
  );
}
