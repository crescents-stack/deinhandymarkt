import H1 from "@/components/atoms/headings";
import ProductsCard from "@/components/molecules/products-card";

const FeaturedProducts = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <H1
          text={
            <>
              <span>Featured</span>&nbsp;iPhone Accessories
            </>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-[20px] pt-[48px]">
          {products.map((item) => {
            return (
              <div
                key={item.id}
                className={`bg-muted rounded-[8px] ${
                  item.id === 2 || item.id === 3 ? "col-span-1 lg:col-span-2" : "col-span-1"
                }`}
              >
                <ProductsCard details={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

const products = [
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
    image:
      "/images/home/featured-accessories/iPhone15ClearCaseWithMagSafe.png",
    title: "iPhone 15 Clear Case with MagSafe",
    price: 49.0,
    slug: "iphone-15-clear-case-with-magsafe",
    arrival: "New",
    category_slug: "iphone-15-pro-cases",
  },
  {
    id: 1,
    image:
      "/images/home/featured-accessories/AirPodsPro2ndGenerationWithMagSafeChargingCaseUSBC.png",
    title: "AirPods Pro 2nd Generation with MagSafe Charging Case USB C",
    price: 49.0,
    slug: "airpods-pro-2nd-generation-with-magsafe-charging-case-usb-c",
    arrival: "New",
    category_slug: "airpods-pro-2nd-generation",
  },
];
