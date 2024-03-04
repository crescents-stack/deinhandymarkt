"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import Cookies from "universal-cookie";
import { FloatingBanner } from "./floating-banner";
import { setCookie } from "@/lib/cookies";

export function ConsentForm() {
  const [decisionMade, setDecisionMade] = useState(true); // start with true to avoid flashing
  const cookies = useMemo(() => new Cookies(), []);

  function gtag(p0: string, p1: string, consent: any) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  const sendConsent = useCallback((consent: any) => {
    gtag("consent", "update", consent);
  }, []);

  useEffect(() => {
    console.log(cookies.get("dhmUserCookieConsent"));
    if (cookies.get("dhmUserCookieConsent") !== undefined) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent",
        aggrements: cookies.get("dhmUserCookieConsent"),
      });
      setDecisionMade(true);
    } else {
      setDecisionMade(false);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent",
        aggrements: {
          ad_storage: "denied",
          analytics_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          personalization_storage: "denied",
          functionality_storage: "denied",
          security_storage: "denied",
        },
      });
    }
  }, [cookies, setDecisionMade, sendConsent]);

  const handleDecision = (outcome: any) => {
    const consent = {
      ad_storage: outcome,
      analytics_storage: outcome,
      ad_user_data: outcome,
      ad_personalization: outcome,
      personalization_storage: outcome,
      functionality_storage: outcome,
      security_storage: outcome,
    };

    setCookie("dhmUserCookieConsent", consent, 1);

    sendConsent(consent);
    setDecisionMade(true);
  };

  return decisionMade ? (
    <></>
  ) : (
    <FloatingBanner
      header="Consent Header"
      message="Consent message"
      acceptText="Yes"
      denyText="No"
      onAccept={() => {
        handleDecision("granted");
      }}
      onDeny={() => {
        handleDecision("denied");
      }}
    />
  );
}
