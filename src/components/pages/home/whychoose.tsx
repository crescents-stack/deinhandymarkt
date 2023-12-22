import BadgeDollarSign from "@/components/assets/home/badge-dollar-sign";
import BookUser from "@/components/assets/home/book-user";
import CalendarClock from "@/components/assets/home/calendar-clock";
import Select from "@/components/assets/home/select";
import Stars from "@/components/assets/home/stars";
import Truck from "@/components/assets/home/truck";

const WhyChoose = () => {
  return (
    <div className="bg-muted">
      <section className="container rounded-[8px]">
      <h2 className="max-w-[500px] h2">
        Lets Resolve <span>Your Needs</span> with DeinHandyMarkt
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] pt-[48px]">
        {CardData.map((item) => {
          const { id, title, icon, description } = item;
          return (
            <div
              key={id}
              className="flex flex-col gap-[20px] p-[20px] bg-white border border-dark_gray hover:border-secondary rounded-[8px] hover:shadow-lg hover:scale-[102%] transition ease-in-out duration-300"
            >
              {icon}
              <p className="text-[14px] md:text-[16px] font-light [&>span]:text-[14px] md:[&>span]:text-[16px] [&>span]:font-semibold leading-tight [&>span]:leading-tight">
                {title}
              </p>
              <p className="text-gray-500">{description}</p>
            </div>
          );
        })}
      </div>
    </section>
    </div>
  );
};

export default WhyChoose;

const CardData = [
  {
    id: 1,
    icon: <Stars className="stroke-[1.3px]" />,
    title: (
      <>
        5+ Years of&nbsp;<span>trusted Services</span>&nbsp;Provider
      </>
    ),
    description:
      "Angen kakarade presamma. Rektig nefonera i seng sedan televis gigajåska. Neser mikrongar öde gövis eller fans. Irtad spemesanera. Eren. ",
  },
  {
    id: 2,
    icon: <Truck className="stroke-[1.3px]" />,
    title: (
      <>
        <span>Affordable</span>&nbsp; Shipping in Germany
      </>
    ),
    description:
      "Angen kakarade presamma. Rektig nefonera i seng sedan televis gigajåska. Neser mikrongar öde gövis eller fans. Irtad spemesanera. Eren.",
  },
  {
    id: 3,
    icon: <CalendarClock className="stroke-[1.3px]" />,
    title: (
      <>
        <span>Same Day</span>&nbsp;Shipping When Ordering from Stock
      </>
    ),
    description:
      "Angen kakarade presamma. Rektig nefonera i seng sedan televis gigajåska. Neser mikrongar öde gövis eller fans. Irtad spemesanera. Eren. ",
  },
  {
    id: 4,
    icon: <Select className="stroke-[1.3px]" />,
    title: (
      <>
        <span>Large Selection</span>&nbsp; of flagship accessories
      </>
    ),
    description:
      "Angen kakarade presamma. Rektig nefonera i seng sedan televis gigajåska. Neser mikrongar öde gövis eller fans. Irtad spemesanera. Eren. ",
  },
  {
    id: 5,
    icon: <BookUser className="stroke-[1.3px]" />,
    title: (
      <>
        Purchase on Account with&nbsp;<span>Convenience</span>
      </>
    ),
    description:
      "Angen kakarade presamma. Rektig nefonera i seng sedan televis gigajåska. Neser mikrongar öde gövis eller fans. Irtad spemesanera. Eren. ",
  },
  {
    id: 6,
    icon: <BadgeDollarSign className="stroke-[1.3px]" />,
    title: (
      <>
        Quantity&nbsp;<span>Discount</span>&nbsp;Up to 15% and&nbsp;
        <span>Save</span>&nbsp;80%
      </>
    ),
    description:
      "Angen kakarade presamma. Rektig nefonera i seng sedan televis gigajåska. Neser mikrongar öde gövis eller fans. Irtad spemesanera. Eren. ",
  },
];
