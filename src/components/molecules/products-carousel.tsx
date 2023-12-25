import Carousel from "@/components/molecules/carousel";

const ProductsCarousel = ({h2 = "Power & Cables"}:{h2: string}) => {
  return (
    <div className="bg-white">
      <section className="container rounded-[8px]">
        <h2 className="max-w-[500px] h2 pb-[32px]" style={{fontWeight: 600}}>
          {h2}
        </h2>
        <Carousel items={products} />
      </section>
    </div>
  );
};

export default ProductsCarousel;

export const products = [
  {
    id: 1,
    image:
      "/images/home/featured-accessories/iPhone15ProSiliconCaseWithMagSafe.png",
    title: "iPhone 15 Pro Silicon Case with MagSafe",
    price: 49.0,
    slug: "iphone-15-pro-silicon-case-with-magsafe",
    arrival: "New",
    category_slug: "iphone-15-pro-cases",
    colors: [
      {
        id: 1,
        color: "Orange Sorbet",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/orange-sorbet.svg",
      },
      {
        id: 2,
        color: "Cypress",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/cypress.svg",
      },
      {
        id: 3,
        color: "Winter Blue",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/winter-blue.svg",
      },
      {
        id: 4,
        color: "Storm Blue",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/storm-blue.svg",
      },
      {
        id: 5,
        color: "Guava",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/guava.svg",
      },
      {
        id: 6,
        color: "Clay",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/clay.svg",
      },
    ],
  },
  {
    id: 2,
    image:
      "/images/home/featured-accessories/iPhone15ProFineWovenCaseWithMagSafe.png",
    title: "iPhone 15 Pro Fine Woven Case with MagSafe",
    price: 49.0,
    slug: "iphone-15-pro-fine-woven-case-with-magsafe",
    arrival: "New",
    category_slug: "iphone-15-pro-cases",
    colors: [
      {
        id: 1,
        color: "Orange Sorbet",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/orange-sorbet.svg",
      },
      {
        id: 2,
        color: "Cypress",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/cypress.svg",
      },
      {
        id: 3,
        color: "Winter Blue",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/winter-blue.svg",
      },
      {
        id: 4,
        color: "Storm Blue",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/storm-blue.svg",
      },
      {
        id: 5,
        color: "Guava",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/guava.svg",
      },
      {
        id: 6,
        color: "Clay",
        image:
          "/images/home/featured-accessories/silicon-case-color-variants/clay.svg",
      },
    ],
  },
  {
    id: 3,
    image: "/images/home/featured-accessories/iPhone15ClearCaseWithMagSafe.png",
    title: "iPhone 15 Clear Case with MagSafe",
    price: 49.0,
    slug: "iphone-15-clear-case-with-magsafe",
    arrival: "New",
    category_slug: "iphone-15-pro-cases",
  },
  {
    id: 4,
    image:
      "/images/home/featured-accessories/AirPodsPro2ndGenerationWithMagSafeChargingCaseUSBC.png",
    title: "AirPods Pro 2nd Generation with MagSafe Charging Case USB C",
    price: 49.0,
    slug: "airpods-pro-2nd-generation-with-magsafe-charging-case-usb-c",
    arrival: "New",
    category_slug: "airpods-pro-2nd-generation",
  },
  {
    id: 5,
    image:
      "/images/home/featured-accessories/AirPodsPro2ndGenerationWithMagSafeChargingCaseUSBC.png",
    title: "AirPods Pro 2nd Generation with MagSafe Charging Case USB C",
    price: 49.0,
    slug: "airpods-pro-2nd-generation-with-magsafe-charging-case-usb-c",
    arrival: "New",
    category_slug: "airpods-pro-2nd-generation",
  },
  {
    id: 6,
    image:
      "/images/home/featured-accessories/AirPodsPro2ndGenerationWithMagSafeChargingCaseUSBC.png",
    title: "AirPods Pro 2nd Generation with MagSafe Charging Case USB C",
    price: 49.0,
    slug: "airpods-pro-2nd-generation-with-magsafe-charging-case-usb-c",
    arrival: "New",
    category_slug: "airpods-pro-2nd-generation",
  },
  {
    id: 7,
    image:
      "/images/home/featured-accessories/AirPodsPro2ndGenerationWithMagSafeChargingCaseUSBC.png",
    title: "AirPods Pro 2nd Generation with MagSafe Charging Case USB C",
    price: 49.0,
    slug: "airpods-pro-2nd-generation-with-magsafe-charging-case-usb-c",
    arrival: "New",
    category_slug: "airpods-pro-2nd-generation",
  },
  {
    id: 8,
    image:
      "/images/home/featured-accessories/AirPodsPro2ndGenerationWithMagSafeChargingCaseUSBC.png",
    title: "AirPods Pro 2nd Generation with MagSafe Charging Case USB C",
    price: 49.0,
    slug: "airpods-pro-2nd-generation-with-magsafe-charging-case-usb-c",
    arrival: "New",
    category_slug: "airpods-pro-2nd-generation",
  },
  {
    id: 9,
    image:
      "/images/home/featured-accessories/AirPodsPro2ndGenerationWithMagSafeChargingCaseUSBC.png",
    title: "AirPods Pro 2nd Generation with MagSafe Charging Case USB C",
    price: 49.0,
    slug: "airpods-pro-2nd-generation-with-magsafe-charging-case-usb-c",
    arrival: "New",
    category_slug: "airpods-pro-2nd-generation",
  },
];
