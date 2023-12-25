import BadgeDollarSign from "@/components/assets/home/badge-dollar-sign";
import Stars from "@/components/assets/home/stars";
import Truck from "@/components/assets/home/truck";
import ShieldQuestion from "@/components/assets/products/shield-question";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const Overview = () => {
  return (
    <section className="container">
      <div className="bg-white rounded-[8px] p-[10px] md:p-[20px] flex flex-col md:flex-row items-start gap-[10px] md:gap-[20px] items-stretch">
        <div className="w-full md:flex-1 border border-dark_gray rounded-l-[8px] rounded-r-[8px] md:rounded-r-[0px] p-[10px] md:p-[20px]">
          <Tabs defaultValue="overview">
            <TabsList className="w-full flex items-center justify-start gap-[10px] md:gap-[20px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="flex flex-col items-start gap-[10px] md:gap-[20px] pt-[10px] md:pt-[16px] [&>*:first-child]:font-semibold [&>*:nth-child(2)]:font-medium [&>*:first-child]:text-primary [&>*:nth-child(2)]:text-primary">
                {overviewText.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="text-gray-600 [&>a]:text-secondary [&>a]:underline"
                    >
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="compatibility">Compatibility</TabsContent>
          </Tabs>
        </div>
        <div className="min-w-full md:min-w-[300px] bg-muted rounded-l-[8px] rounded-r-[8px] md:rounded-l-[0px] p-[10px] md:p-[20px] flex flex-col justify-between gap-[32px]">
          <ul className="flex flex-col gap-[12px]">
            {portfolio.features.map((item) => {
              return (
                <li
                  key={item.id}
                  className="[&>svg]:w-[20px] [&>svg]:h-[20px] flex items-center gap-[8px]"
                >
                  {item.icon}
                  <p className="[&>span]:font-semibold [&>span]:text-secondary">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="[&>svg]:w-[20px] [&>svg]:h-[20px] flex items-center gap-[8px]">
            {portfolio.footer.icon}
            <span>{portfolio.footer.text}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;

const portfolio = {
  features: [
    {
      id: 1,
      text: <>Same day shipping</>,
      icon: <Truck className="" />,
    },
    {
      id: 2,
      text: (
        <>
          Quantity up to <span>discount</span> up to 15%
        </>
      ),
      icon: <BadgeDollarSign className="" />,
    },
    {
      id: 3,
      text: <>Trusted and certified</>,
      icon: <Stars className="" />,
    },
  ],
  footer: {
    text: (
      <>
        Any question?&nbsp;<span>Contact us</span>
      </>
    ),
    icon: <ShieldQuestion className="" />,
  },
};

const overviewText = [
  {
    id: 1,
    text: (
      <>
        Designed by Apple to complement iPhone 15 Pro, the FineWoven Case with
        MagSafe is a delightful way to give your iPhone extra protection while
        adding style.
      </>
    ),
  },
  {
    id: 2,
    text: (
      <>
        Made from durable microtwill, the material has a soft, suedelike feel.
        The FineWoven material was also designed with the earth in mind —
        it&apos;s made from 68 percent post-consumer recycled content and
        significantly reduces carbon emissions compared to leather. The case
        quickly snaps into place and fits snugly over your iPhone without adding
        bulk.
      </>
    ),
  },
  {
    id: 3,
    text: (
      <>
        With built-in magnets that align perfectly with iPhone 15 Pro, this case
        offers a magical attach experience and faster wireless charging, every
        time. When it&apos;s time to charge, just leave the case on your iPhone
        and snap on your MagSafe charger, or set it on your Qi-certified
        charger.
      </>
    ),
  },
  {
    id: 4,
    text: (
      <>
        This high-quality case is made to be durable and protect your iPhone.
        The FineWoven material may show wear over time as the fibers get
        compressed with normal use. Some scratches may diminish over time.
        Interaction with MagSafe accessories will leave slight imprints. Learn
        more about material care <Link href="/">here</Link>. If you are
        concerned about this, we suggest you use an iPhone 15 Pro Silicone Case
        or Clear Case.
      </>
    ),
  },
];
