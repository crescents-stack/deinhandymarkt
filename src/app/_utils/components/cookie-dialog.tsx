/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useContextStore } from "@/lib/hooks/hooks";
import { useEffect, useState } from "react";

const measuringCookiePolicy = (type: any, aggrements: any) => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];
    window.dataLayer.push({
      event: "cookiePolicy",
      type,
      aggrements,
    });
    window.gtag("consent", "update", aggrements);
  }
};

const noActionCookiePolicyMeasuring = () => {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];
    window.dataLayer.push({
      event: "cookiePolicy",
      type: "No action taken",
    });
  }
};

const AllAccept = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  personalization_storage: "granted",
  functionality_storage: "granted",
  security_storage: "granted",
};

const CookieDialog = () => {
  const { getContext, setContext } = useContextStore();
  const [aggrements, setAggrements] = useState({
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    personalization_storage: "denied",
    functionality_storage: "denied",
    security_storage: "denied",
  });
  const [lessDescription, setLessDescription] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = (type: any) => {
    let aggrementsCustomized = 0;
    Object.values(aggrements).forEach((key) => {
      if (key === "granted") {
        aggrementsCustomized++;
      }
    });
    console.log(aggrementsCustomized);
    if (type === "Accept All") {
      measuringCookiePolicy(
        aggrementsCustomized > 1 ? "Customized" : type,
        aggrementsCustomized > 1 ? aggrements : AllAccept
      );
      setContext(
        "cookieBanner",
        aggrementsCustomized > 1 ? aggrements : AllAccept
      );
    } else {
      measuringCookiePolicy(type, aggrements);
      setContext("cookieBanner", aggrements);
    }
    setDialogOpen(false);
  };
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const inLocalStorage = getContext("cookieBanner");
      setDialogOpen(inLocalStorage ? false : true);
      !inLocalStorage && measuringCookiePolicy("No Actions", aggrements);
      inLocalStorage && setAggrements(inLocalStorage);
    }
  }, []);
  return !dialogOpen ? null : (
    <Dialog
      defaultOpen={dialogOpen}
      onOpenChange={(change) => {
        measuringCookiePolicy("Accept All", AllAccept);
        setContext("cookieBanner", AllAccept);
      }}
    >
      <DialogContent className="min-w-[300px] sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Customize Consent Preferences</DialogTitle>
          <DialogDescription>
            <span className="pb-4 space-y-2 max-h-[20dvh] overflow-auto">
              <>
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below.
              </>
              {!lessDescription ? (
                <>
                  <br />
                  <>
                    The cookies that are categorized as Necessary are stored on
                    your browser as they are essential for enabling the basic
                    functionalities of the site.
                  </>
                  <br />
                  <>
                    We also use third-party cookies that help us analyze how you
                    use this website, store your preferences, and provide the
                    content and advertisements that are relevant to you. These
                    cookies will only be stored in your browser with your prior
                    consent. You can choose to enable or disable some or all of
                    these cookies but disabling some of them may affect your
                    browsing experience.
                  </>
                  <br />
                </>
              ) : null}
            </span>
            <div
              role="button"
              onClick={() => setLessDescription(!lessDescription)}
              className="text-secondary p-2"
            >
              See&nbsp;{lessDescription ? "more" : "less"}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[40dvh] overflow-auto">
          {AggrementsData.map(
            (item: {
              aggrement: string;
              title: string;
              description?: string;
            }) => {
              const { aggrement, title, description } = item;
              return aggrement === "Necessary" || showForm ? (
                <div
                  key={aggrement}
                  className="flex justify-between items-center gap-4 py-4 border rounded-[10px] p-4"
                >
                  <div className="space-y-4">
                    <p className="font-bold">{title}</p>
                    <p>{description}</p>
                  </div>
                  <Switch
                    checked={
                      aggrements[aggrement as keyof typeof aggrements] ===
                      "granted"
                    }
                    onClick={() => {
                      if (aggrement !== "Necessary") {
                        setAggrements({
                          ...aggrements,
                          [aggrement]:
                            aggrements[aggrement as keyof typeof aggrements] ===
                            "granted"
                              ? "denied"
                              : "granted",
                        });
                      }
                    }}
                  />
                </div>
              ) : null;
            }
          )}
        </div>
        <DialogFooter>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 w-full pt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => handleClose("Accept All")}>Accept</Button>
              <Button variant="outline" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Customization" : "Customize"}
              </Button>
            </div>
            {/* <Button
              variant="secondary"
              onClick={() => handleClose("Accept Selected")}
            >
              Accept selected
            </Button> */}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieDialog;

const AggrementsData = [
  {
    id: 5,
    aggrement: "ad_storage",
    title: "Ad Storage",
    description: "Enables storage (such as cookies) related to advertising.",
  },
  {
    id: 6,
    aggrement: "analytics_storage",
    title: "Analytics Storage",
    description:
      "Enables storage (such as cookies) related to analytics e.g. visit duration.",
  },
  {
    id: 7,
    aggrement: "ad_user_data",
    title: "Ad User Data",
    description:
      "Sets consent for sending user data related to advertising to Google.",
  },
  {
    id: 8,
    aggrement: "ad_personalization",
    title: "Ad Personalization",
    description: "Sets consent for personalized advertising.",
  },
  {
    id: 9,
    aggrement: "personalization_storage",
    title: "Personalization Storage",
    description:
      "Enables storage related to personalization e.g. video recommendations",
  },
  {
    id: 10,
    aggrement: "functionality_storage",
    title: "Functionality Storage",
    description:
      "Enables storage that supports the functionality of the website or app e.g. language settings.",
  },
  {
    id: 11,
    aggrement: "security_storage",
    title: "Security Storage",
    description:
      "Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.",
  },
];
