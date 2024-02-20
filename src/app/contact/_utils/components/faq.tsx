import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="space-y-4 p-8 rounded-[10px] bg-white order-2 md:order-1">
      <h2 className="text-[16px] md:text-[20px] font-bold">
        FREQUENTLY ASKED QUESTIONS
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item) => {
          const { id, question, answer } = item;
          return (
            <AccordionItem key={id} value={id.toString()}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4">
                  {answer.map((item, index) => {
                    return (
                      <li key={index} className="text-gray-500">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FAQ;

const faqData = [
  {
    id: 1,
    question: "Will I receive the same product that I see in the picture?",
    answer: [
      <>
        Consectetur cras scelerisque dis nec mi vestibulum ullamcorper turpis
        enim natoque tempus a malesuada suspendisse iaculis adipiscing himenaeos
        tincidunt.Tellus pharetra dis nostra urna a scelerisque id parturient
        ullamcorper ullamcorper class ad consectetur tristique et.
      </>,
      <>
        Hendrerit mollis facilisi odio a montes scelerisque a scelerisque justo
        a praesent conubia aenean mi tempor.
      </>,
    ],
  },
  {
    id: 2,
    question: "Where can I view my sales receipt?",
    answer: [
      <>
        Consectetur cras scelerisque dis nec mi vestibulum ullamcorper turpis
        enim natoque tempus a malesuada suspendisse iaculis adipiscing himenaeos
        tincidunt.Tellus pharetra dis nostra urna a scelerisque id parturient
        ullamcorper ullamcorper class ad consectetur tristique et.
      </>,
      <>
        Hendrerit mollis facilisi odio a montes scelerisque a scelerisque justo
        a praesent conubia aenean mi tempor.
      </>,
    ],
  },
  {
    id: 3,
    question: "How can I return an item?",
    answer: [
      <>
        Consectetur cras scelerisque dis nec mi vestibulum ullamcorper turpis
        enim natoque tempus a malesuada suspendisse iaculis adipiscing himenaeos
        tincidunt.Tellus pharetra dis nostra urna a scelerisque id parturient
        ullamcorper ullamcorper class ad consectetur tristique et.
      </>,
      <>
        Hendrerit mollis facilisi odio a montes scelerisque a scelerisque justo
        a praesent conubia aenean mi tempor.
      </>,
    ],
  },
  {
    id: 4,
    question: "Will you restock items indicated as “out of stock?”",
    answer: [
      <>
        Consectetur cras scelerisque dis nec mi vestibulum ullamcorper turpis
        enim natoque tempus a malesuada suspendisse iaculis adipiscing himenaeos
        tincidunt.Tellus pharetra dis nostra urna a scelerisque id parturient
        ullamcorper ullamcorper class ad consectetur tristique et.
      </>,
      <>
        Hendrerit mollis facilisi odio a montes scelerisque a scelerisque justo
        a praesent conubia aenean mi tempor.
      </>,
    ],
  },
  {
    id: 5,
    question: "Where can I ship my order?",
    answer: [
      <>
        Consectetur cras scelerisque dis nec mi vestibulum ullamcorper turpis
        enim natoque tempus a malesuada suspendisse iaculis adipiscing himenaeos
        tincidunt.Tellus pharetra dis nostra urna a scelerisque id parturient
        ullamcorper ullamcorper class ad consectetur tristique et.
      </>,
      <>
        Hendrerit mollis facilisi odio a montes scelerisque a scelerisque justo
        a praesent conubia aenean mi tempor.
      </>,
    ],
  },
];
