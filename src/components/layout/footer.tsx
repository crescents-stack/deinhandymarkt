import Link from "next/link";
import AmericanExpress from "../assets/payment/footer/americanexpress";
import DHL from "../assets/payment/footer/dhl";
import DPD from "../assets/payment/footer/dpd";
import Klarna from "../assets/payment/footer/klarna";
import Mastercard from "../assets/payment/footer/mastercard";
import Paypal from "../assets/payment/footer/paypal";
import SSL from "../assets/payment/footer/ssl";
import Visa from "../assets/payment/footer/visa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-muted via-white to-white">
      <section className="container px-[10px] rounded-[8px] flex flex-wrap items-start justify-between gap-[48px]">
        {FooterLinks.map((item) => {
          return (
            <div
              key={item.id}
              className={`${item.id !== 6 ? "max-w-[300px]" : ""}`}
            >
              <h5 className="text-[14px] md:text-[16px] font-semibold border-b border-dark_gray">
                {item.title}
              </h5>
              <ul
                className={`flex ${
                  item.id !== 6 ? "flex-col" : "flex-row flex-wrap"
                } gap-[12px] pt-[12px]`}
              >
                {item.childLinks.map((link: any) => {
                  return (
                    <li
                      key={link.id}
                      className={`${
                        item.id === 6 || item.id === 3
                          ? "[&>svg]:max-h-[24px] md:[&>svg]:max-h-[32px] [&>svg]:w-auto"
                          : ""
                      }`}
                    >
                      {link.icon ? (
                        link.icon
                      ) : link.link ? (
                        <Link
                          href={link.link}
                          className="hover:text-secondary hover:underline"
                        >
                          {link.text}
                        </Link>
                      ) : (
                        link.text
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>
      <div className="bg-secondary rounded-b-[8px] text-white py-[20px] px-5 text-center">
        All rights reserved @{new Date().getFullYear()}
      </div>
    </footer>
  );
};
export default Footer;

const FooterLinks = [
  {
    id: 1,
    title: "Unternehmen",
    childLinks: [
      {
        id: 1,
        text: "AGB",
        link: "/",
      },
      {
        id: 2,
        text: "Auszeichnungen",
        link: "/",
      },
      {
        id: 3,
        text: "Datenschutz",
        link: "/",
      },
      {
        id: 4,
        text: "Impressum",
        link: "/",
      },
      {
        id: 5,
        text: "Karriere",
        link: "/",
      },
      {
        id: 6,
        text: "Kontakt",
        link: "/",
      },
      {
        id: 7,
        text: "Über uns",
        link: "/",
      },
      {
        id: 8,
        text: "Widerrufsrecht",
        link: "/",
      },
      {
        id: 9,
        text: "Greenline",
        link: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Kundenservice",
    childLinks: [
      {
        id: 1,
        text: "Häufige Fragen (FAQ)",
        link: "/",
      },
      {
        id: 2,
        text: "Reklamation",
        link: "/",
      },
      {
        id: 3,
        text: "Versandarten & -kosten",
        link: "/",
      },
      {
        id: 4,
        text: "Zahlungsmöglichkeiten",
        link: "/",
      },
    ],
  },

  {
    id: 3,
    title: "Versand",
    childLinks: [
      {
        id: 1,
        icon: <DHL />,
      },
      {
        id: 2,
        icon: <DPD />,
      },
    ],
  },
  {
    id: 4,
    title: "Sicher einkaufen",
    childLinks: [
      {
        id: 1,
        icon: <SSL />,
      },
      {
        id: 2,
        text: "Schnelle Lieferzeiten",
        link: "/",
      },
      {
        id: 3,
        text: "Käuferschutz",
        link: "/",
      },
    ],
  },
  {
    id: 5,
    title: "Ihre Vorteile",
    childLinks: [
      {
        id: 1,
        text: "Über 25 Jahre Erfahrung",
        link: "/",
      },
      {
        id: 2,
        text: "Bereits über 1.500.000 Kunden",
        link: "/",
      },
      {
        id: 3,
        text: "Versand am selben Tag bei Bestellung bis 17 Uhr (samstags bis 14 Uhr)",
        link: "/",
      },
      {
        id: 4,
        text: "Kauf auf Rechnung",
        link: "/",
      },
    ],
  },
  {
    id: 6,
    title: "Versand",
    childLinks: [
      {
        id: 1,
        icon: <AmericanExpress />,
      },
      {
        id: 2,
        icon: <Klarna className=""/>,
      },
      {
        id: 3,
        icon: <Visa />,
      },
      {
        id: 4,
        icon: <Mastercard />,
      },
      {
        id: 5,
        icon: <Paypal />,
      },
    ],
  },
  {
    id: 7,
    title: "Service Hotline",
    childLinks: [
      {
        id: 1,
        text: "Wir helfen Ihnen sehr gerne weiter",
      },
      {
        id: 2,
        text: "hello@example.com",
      },
    ],
  },
];
