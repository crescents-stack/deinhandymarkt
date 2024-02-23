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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useContextStore } from "@/lib/hooks/hooks";
import { useEffect, useState } from "react";

const measuringCookiePolicy = (type: any, aggrements: any) => {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];
    window.dataLayer.push({
      event: "cookiePolicy",
      type,
      aggrements,
    });
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

const CookieDialog = () => {
  const { getContext, setContext } = useContextStore();
  const [aggrements, setAggrements] = useState({
    Necessary: true,
    Functional: false,
    Analytics: false,
    Performance: false,
    Uncategorized: false,
  });
  const [lessDescription, setLessDescription] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = (type: any) => {
    setContext("cookieBanner", "don't show");
    if (type === "Accept All") {
      measuringCookiePolicy(type, {
        Necessary: true,
        Functional: true,
        Analytics: true,
        Performance: true,
        Uncategorized: true,
      });
    } else if (type === "Reject All") {
      measuringCookiePolicy(type, {
        Necessary: false,
        Functional: false,
        Analytics: false,
        Performance: false,
        Uncategorized: false,
      });
    } else {
      measuringCookiePolicy(type, aggrements);
    }
    setDialogOpen(false);
  };
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const inLocalStorage = getContext("cookieBanner");
      setDialogOpen(inLocalStorage ? false : true);
    }
    noActionCookiePolicyMeasuring();
  }, []);
  return !dialogOpen ? null : (
    <Dialog defaultOpen={dialogOpen}>
      <DialogContent className="min-w-[300px] sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Customize Consent Preferences</DialogTitle>
          <DialogDescription>
            <div className="pb-4 space-y-2 max-h-[20dvh] overflow-auto">
              <p>
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below.
              </p>
              {!lessDescription ? (
                <>
                  <p>
                    The cookies that are categorized as Necessary are stored on
                    your browser as they are essential for enabling the basic
                    functionalities of the site.
                  </p>
                  <p>
                    We also use third-party cookies that help us analyze how you
                    use this website, store your preferences, and provide the
                    content and advertisements that are relevant to you. These
                    cookies will only be stored in your browser with your prior
                    consent. You can choose to enable or disable some or all of
                    these cookies but disabling some of them may affect your
                    browsing experience.
                  </p>
                </>
              ) : null}
              <div
                role="button"
                onClick={() => setLessDescription(!lessDescription)}
                className="text-secondary"
              >
                See&nbsp;{lessDescription ? "more" : "less"}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        {showForm ? (
          <div className="space-y-4 max-h-[40dvh] overflow-auto">
            {AggrementsData.map(
              (item: {
                aggrement: string;
                title: string;
                description: string;
              }) => {
                const { aggrement, title, description } = item;
                return (
                  <div
                    key={aggrement}
                    className="flex justify-between items-center gap-4 py-4 border rounded-[10px] p-4"
                  >
                    <div className="space-y-4">
                      <p className="font-bold">{title}</p>
                      <p>{description}</p>
                    </div>
                    <Switch
                      checked={aggrements[aggrement as keyof typeof aggrements]}
                      onClick={() => {
                        if (aggrement !== "Necessary") {
                          setAggrements({
                            ...aggrements,
                            [aggrement]:
                              !aggrements[aggrement as keyof typeof aggrements],
                          });
                        }
                      }}
                    />
                  </div>
                );
              }
            )}
          </div>
        ) : null}
        <DialogFooter>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 w-full pt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => handleClose("Accept All")}>
                Accept all
              </Button>
              <Button variant="outline" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Customization" : "Customize"}
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={() => handleClose("Accept Selected")}
            >
              Accept selected
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieDialog;

const AggrementsData = [
  {
    id: 1,
    aggrement: "Necessary",
    title: "Necessary",
    description:
      "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
  },
  {
    id: 2,
    aggrement: "Functional",
    title: "Functional",
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
  },
  {
    id: 3,
    aggrement: "Analytics",
    title: "Analytics",
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
  },
  {
    id: 4,
    aggrement: "Performance",
    title: "Performance",
    description:
      "Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
  },
  {
    id: 4,
    aggrement: "Uncategorized",
    title: "Uncategorized",
    description:
      "Other uncategorized cookies are those that are being analyzed and have not been classified into a category as yet.",
  },
];
