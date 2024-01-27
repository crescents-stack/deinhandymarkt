import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import BadgeDollarSign from "@/components/assets/home/badge-dollar-sign";
import Stars from "@/components/assets/home/stars";
import Truck from "@/components/assets/home/truck";
import ShieldQuestion from "@/components/assets/products/shield-question";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRINT } from "@/lib/utils";

const Overview = ({ details }: { details: TProductSchema }) => {
  const { short_description, description, metadata, attributes } = details;
  const overviewText = [
    {
      id: 1,
      text: <>{metadata.title}</>,
    },
    {
      id: 2,
      text: <>{short_description}</>,
    },
    {
      id: 3,
      text: <>{description}</>,
    },
  ];

  const compatibilities = attributes.filter((attribute) =>
    [
      "compatibilities",
      "Compatibilities",
      "Compatibility",
      "compatibility",
    ].includes(attribute.label)
  )[0];
  PRINT({ compatibilities });
  return (
    <section className="container">
      <div className="bg-white rounded-[8px] p-[10px] md:p-[20px] flex flex-col md:flex-row items-stretch gap-[10px] md:gap-[20px]">
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
            <TabsContent value="compatibility">
              {compatibilities?.values?.length ? (
                <ul className="flex flex-wrap gap-2 items-start py-5 min-h-[205px]">
                  {compatibilities.values.map((value) => {
                    return (
                      <li
                        key={value}
                        className="px-4 py-2 rounded-[10px] bg-muted text-base"
                      >
                        {value}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "Sorry for incovenience. No compaitblities mentioned yet!"
              )}
            </TabsContent>
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
