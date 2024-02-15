/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  CombinationTypes,
  TCartAttribute,
  TCombination,
  TProductSchema,
} from "@/app/dashboard/products/_utils/types/types";
import AddToCart from "@/components/molecules/add-to-cart";
import ColorPalette from "@/components/molecules/color-palette";
import QuantityCounter from "@/components/molecules/quantity-counter";
import { Button } from "@/components/ui/button";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const ProductInteractions = ({ details }: { details: TProductSchema }) => {
  const { attributes, name, price } = details;
  // sizes
  const sizesAttribute: any = attributes.filter((attribute: any) =>
    ["Sizes", "sizes", "Size", "size"].includes(attribute.label)
  )[0];
  const sizes: any = [];
  if (sizesAttribute?.values) {
    sizesAttribute.values.forEach((sizeValue: any) => {
      const value = sizeValue.split(":")[0];
      const sizePrice = parseInt(sizeValue.split(":")[1]);
      sizes.push({
        value,
        sizePrice,
      });
    });
  }
  // colors
  const colorAttribute: any = attributes.filter((attribute: any) =>
    ["Color", "color", "Colors", "colors"].includes(attribute.label)
  )[0];

  const { cart, setCart } = useCartContext();
  const defaultCartAttributes: TCartAttribute = {
    combinationType:
      sizesAttribute && colorAttribute
        ? CombinationTypes.sizeColor
        : sizesAttribute
        ? CombinationTypes.size
        : CombinationTypes.color,
    combinations: [],
    items: 0,
    subtotal: 0,
  };
  const [cartAttributes, setCartAttributes] = useState<TCartAttribute>(
    cart.filter((item: TCartContextValue) => item._id === details._id)[0]
      ?.attributeCombinations ?? defaultCartAttributes
  );

  const [basePrice, setBasePrice] = useState(
    // cart.filter((item) => item._id === details?._id)[0]?.basePrice ?? price
    price
  );
  // const [quantity, setQuantity] = useState(
  //   cart.filter((item) => item._id === details?._id)[0]?.quantity ?? 1
  // );

  const [counter, setCounter] = useState(
    cart.filter((item: TCartContextValue) => item._id === details._id)[0]
      ?.attributeCombinations?.combinations?.length
      ? cartAttributes?.combinations[0]?.quantity ?? 0
      : 0
  );
  const [combinationSize, setCombinationSize] = useState(
    cart.filter((item: TCartContextValue) => item._id === details._id)[0]
      ?.attributeCombinations?.combinations[0].size ?? ""
  );

  const DetailsToPass: TCartContextValue = {
    ...details,
    // basePrice,
    // quantity: cart.filter((item) => item._id === details._id)[0]?.quantity ?? 1,
    quantity: cartAttributes.items,
    attributeCombinations: cartAttributes,
  };

  console.log(cartAttributes);

  // calculating quantity and subtotal based on counter state change
  useEffect(() => {
    let existingCartAttributes: TCartAttribute = {
      ...cartAttributes,
      combinations: [
        ...cartAttributes.combinations.map((item: TCombination) => {
          return item.size === combinationSize
            ? {
                ...item,
                quantity: counter,
                subtotal: counter * basePrice,
              }
            : item;
        }),
      ],
    };
    let totalItems = 0;
    let totalSubtotal = 0;

    existingCartAttributes.combinations.forEach((item: TCombination) => {
      totalItems += item.quantity;
      totalSubtotal += item.subtotal;
    });
    const updatedCartAttributes = {
      ...cartAttributes,
      combinations: existingCartAttributes.combinations,
      items: totalItems,
      subtotal: totalSubtotal,
    };
    setCartAttributes(updatedCartAttributes);
    setCart([
      ...cart,
      {
        ...details,
        quantity: updatedCartAttributes.items,
        attributeCombinations: updatedCartAttributes,
      },
    ]);
    setCart([
      ...cart.map((item: TCartContextValue) => {
        return item._id === details._id
          ? {
              ...item,
              quantity: updatedCartAttributes.items,
              attributeCombinations: updatedCartAttributes,
            }
          : item;
      }),
    ]);
  }, [counter]);

  const AddItemToCart = () => {
    const existsInCart = cart.filter(
      (item: TCartContextValue) => item._id === details._id
    );
    if (!existsInCart.length) {
      setCart([...cart, DetailsToPass]);
    }
  };

  console.log(cart);

  const RemoveItemFromCart = () => {
    cart.length &&
      setCart(
        cart.filter((item: TCartContextValue) => item._id !== details._id)
      );
  };

  const handleAddToCart = () => {
    if (cart.length) {
      if (cart.find((item: TCartContextValue) => item._id === details._id)) {
        RemoveItemFromCart();
      } else {
        AddItemToCart();
      }
    } else {
      AddItemToCart();
    }
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px] pb-10">
        <div className="flex flex-col gap-[16px]">
          {/* <p className="text-[12px] md:text-[14px] text-secondary">New</p> */}
          <h1 className="h2_text text-gray-500">
            {/* iPhone 15 Pro&nbsp; */}
            <span className="h2_text font-semibold text-primary">
              {/* FineWoven Case with MagSafe */}
              {name}
            </span>
            {/* &nbsp; Mulberry */}
          </h1>
        </div>
        <p className="text-[20px] text-gray-500">${basePrice}</p>
      </div>
      {sizes?.length ? (
        <div className="flex flex-wrap items-center gap-4">
          {sizes?.map(
            (size: { value: string; sizePrice: number }, index: number) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    "px-4 py-2 text-base bg-muted inline-flex border-[2px] rounded-[10px] transition ease-in-out duration-300",
                    {
                      "border-muted hover:border-dark_gray":
                        size.value !== combinationSize,
                      "border-secondary hover:border-secondary/80":
                        size.value === combinationSize,
                    }
                  )}
                  role="button"
                  onClick={() => {
                    // setCart(
                    //   cart.map((item) => {
                    //     return item._id === details._id
                    //       ? {
                    //           ...item,
                    //           basePrice: size.sizePrice,
                    //         }
                    //       : item;
                    //   })
                    // );

                    setBasePrice(size.sizePrice);
                    setCombinationSize(size.value);

                    // checking whether the combination already exists or not in cartAttributes
                    const alreadyExists: TCombination[] =
                      cartAttributes.combinations.filter(
                        (c: TCombination) => c.size === size.value
                      );

                    // if not exists, then we are creating a new one
                    if (!alreadyExists.length) {
                      setCounter(1);
                      const itemToSet: TCombination = {
                        size: size.value,
                        price: size.sizePrice,
                        quantity: 1,
                        subtotal: size.sizePrice,
                      };
                      setCartAttributes({
                        ...cartAttributes,
                        combinations: [
                          ...cartAttributes.combinations,
                          itemToSet,
                        ],
                        items: cartAttributes.items + itemToSet.quantity,
                        subtotal: cartAttributes.subtotal + itemToSet.subtotal,
                      });
                    } else {
                      setCounter(alreadyExists[0].quantity);
                    }
                  }}
                >
                  {size.value.replace("m", " meter")}
                  {cartAttributes.combinations
                    .filter(
                      (combItem: TCombination) => combItem.size === size.value
                    )
                    .map((combItem: TCombination) => ` x ${combItem.quantity}`)}
                </div>
              );
            }
          )}
        </div>
      ) : null}
      {combinationSize ? (
        <div className="inline-flex items-center">
          <button
            onClick={() => counter > 0 && setCounter(counter - 1)}
            className="px-4 py-2 rounded-l-[10px] border border-muted hover:border-dark_gray active:scale-[90%] bg-white transition ease-in-out duration-300"
          >
            <Minus className="stroke-[1px] stroke-gray-800 w-4 h-8" />
          </button>
          <span className="px-8 py-2 bg-white border-y border-muted text-[15px] font-medium">
            {counter}
          </span>
          <button
            onClick={() => counter < 5 && setCounter(counter + 1)}
            className="px-4 py-2 rounded-r-[10px] border border-muted hover:border-dark_gray active:scale-[90%] bg-white transition ease-in-out duration-300"
          >
            <Plus className="stroke-[1px] stroke-gray-800 w-4 h-8" />
          </button>
        </div>
      ) : null}
      {colorAttribute?.values ? (
        <ColorPalette
          variant="lg"
          colors={(colorAttribute?.values as string[]) ?? []}
        />
      ) : null}
      <p className="text-[14px] md:text-[20px] font-light text-gray-500">
        Sub total&nbsp;
        <span className="text-[14px] md:text-[20px] font-semibold text-primary">
          {/* ${basePrice * quantity} */}${cartAttributes.subtotal}
        </span>
        &nbsp;is for total&nbsp;{cartAttributes.items}&nbsp;items
      </p>
      {/* <QuantityCounter
        variant="lg"
        details={DetailsToPass}
        quantity={quantity}
        setQuantity={setQuantity}
      /> */}
      <div className="flex">
        {combinationSize && cartAttributes.items ? (
          <Button
            variant={
              cart.filter((item: TCartContextValue) => item._id === details._id)
                .length
                ? "outline"
                : "secondary"
            }
            onClick={handleAddToCart}
          >
            {cart.filter((item: TCartContextValue) => item._id === details._id)
              .length
              ? "Remove from cart"
              : "Add to cart"}
          </Button>
        ) : (
          "Please select any size"
        )}
      </div>

      {/* {combinationSize && cartAttributes.items ? (
        <AddToCart whichToAdd={DetailsToPass} quantity={quantity} />
      ) : (
        "Please select any size"
      )} */}
    </div>
  );
};

export default ProductInteractions;
