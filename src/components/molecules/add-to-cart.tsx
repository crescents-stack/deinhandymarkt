"use client";
import { useCartContext } from "@/lib/contexts/cart.provider";
import { Button } from "../ui/button";

const AddToCart = () => {
  const { cart, setCart } = useCartContext();
  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => {
          setCart({
            ...cart,
            items: [
              ...cart.items,
              {
                id: 1,
                image:
                  "/images/home/featured-accessories/iPhone15ProSiliconCaseWithMagSafe.png",
                title: "iPhone 15 Pro Silicon Case with MagSafe",
                price: 49.0,
                slug: "iphone-15-pro-silicon-case-with-magsafe",
                quantity: 1,
                colorId: 1,
              },
            ],
          });
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCart;
