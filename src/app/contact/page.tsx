import OnlinePayment from "./_utils/assets/online-payment";
import Returns from "./_utils/assets/returns";
import Safety from "./_utils/assets/safety";
import ShippingTruck from "./_utils/assets/shipping-truck";
import Support from "./_utils/assets/support";
import ContactForm from "./_utils/components/contact-form";
import FAQ from "./_utils/components/faq";

const Page = () => {
  const Features = [
    {
      id: 1,
      icon: <ShippingTruck />,
      title: "Free Shipping",
      description: "Career information",
    },
    {
      id: 2,
      icon: <OnlinePayment />,
      title: "Online Payment",
      description: "Payment methods",
    },
    {
      id: 3,
      icon: <Support />,
      title: "24/7 Support",
      description: "Unlimited helpdesk",
    },
    {
      id: 4,
      icon: <Safety />,
      title: "100% SAFE",
      description: "View our benefits",
    },
    {
      id: 5,
      icon: <Returns />,
      title: "FREE RETURNS",
      description: "Track or cancel orders.",
    },
  ];
  return (
    <div>
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FAQ />
          <ContactForm />
        </div>
      </section>
      <section className="bg-secondary ">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16">
          {Features.map((feature) => {
            const { id, title, icon, description } = feature;
            return (
              <div
                className="flex items-center gap-8 [&>svg]:max-w-[60px] [&>svg]:max-h-[60px]"
                key={id}
              >
                {icon}
                <div className="space-y-2 [&>*]:text-white">
                  <h5 className="font-semibold text-[12px] md:text-[16px] uppercase">
                    {title}
                  </h5>
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Page;
