/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  CombinationTypes,
  TCartAttribute,
  TCombination,
  TProductSchema,
} from "@/app/dashboard/products/_utils/types/types";
import { Button } from "@/components/ui/button";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";
import clsx from "clsx";
import { MessageCircleWarning, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductInteractions = ({
  details,
  searchParams,
}: {
  details: TProductSchema;
  searchParams: any;
}) => {
  // product details
  const { attributes, name, price } = details;
  const pathname = usePathname();
  const router = useRouter();
  // sizes from product details
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
  // colors from product details
  const colorAttribute: any = attributes.filter((attribute: any) =>
    ["Color", "color", "Colors", "colors"].includes(attribute.label)
  )[0];

  // cart values for persitant state
  const { cart, setCart } = useCartContext();

  // local interactions for size and colors as cartAttributes
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

  // base price to show on size based price state changes
  const [basePrice, setBasePrice] = useState(
    // cart.filter((item) => item._id === details?._id)[0]?.basePrice ?? price
    price
  );

  // quantity counter for individual color and size combinations
  const [counter, setCounter] = useState(
    cart.filter((item: TCartContextValue) => item._id === details._id)[0]
      ?.attributeCombinations?.combinations?.length
      ? cartAttributes?.combinations[0]?.quantity ?? 0
      : 0
  );

  // color and size combination manager state
  const [combinationSize, setCombinationSize] = useState(
    cart.filter((item: TCartContextValue) => item._id === details._id)[0]
      ?.attributeCombinations?.combinations[0]?.size ?? ""
  );

  // value that will be added to cart
  let DetailsToPass: TCartContextValue = {
    ...details,
    // basePrice,
    // quantity: cart.filter((item) => item._id === details._id)[0]?.quantity ?? 1,
    quantity: cartAttributes.items,
    attributeCombinations: cartAttributes,
  };

  // calculating quantity and subtotal based on counter state change
  useEffect(() => {
    if (!colorAttribute?.values?.length && !sizesAttribute?.values?.length) {
      // console.log({ counter });
      const doesExists = cart.filter(
        (item: TCartContextValue) => item._id === details._id
      );
      if (doesExists.length && counter) {
        setCart([
          ...cart.map((item: TCartContextValue) => {
            return item._id === details._id
              ? {
                  ...item,
                  quantity: counter,
                }
              : item;
          }),
        ]);
      }
    } else {
      let existingCartAttributes: TCartAttribute = {
        ...cartAttributes,
        // updating combinations quantity and subtotal is a size based combination exists
        combinations: [
          ...cartAttributes.combinations.map((item: TCombination) => {
            const updatedItem = {
              ...item,
              quantity: counter,
              subtotal: counter * basePrice,
            };
            return item.size === combinationSize ? updatedItem : item;
          }),
        ],
      };

      // if no color exists in cartAttributes then adding new one while use in color based variant individual product page
      if (searchParams.color) {
        // if no combination exists in cartAttributes and also the counter is more than 0
        if (
          !existingCartAttributes.combinations.filter(
            (item: TCombination) => item.color === searchParams.color
          ).length &&
          counter
        ) {
          existingCartAttributes = {
            ...cartAttributes,
            combinations: [
              ...cartAttributes.combinations,
              // adding new color based combination along side the size/color based combination (size_color)
              {
                color: searchParams.color,
                price: basePrice,
                quantity: 1,
                subtotal: basePrice,
              },
            ],
          };
        } else {
          // if combination exists in cartAttributes and need to update the quanity with the counter state change
          existingCartAttributes = {
            ...cartAttributes,
            combinations: [
              ...cartAttributes.combinations.map((item: TCombination) => {
                // updating existing color based combination qunaity and subtotal
                const updatedItem = {
                  ...item,
                  quantity: counter,
                  subtotal: counter * basePrice,
                };
                return item.color === searchParams.color ? updatedItem : item;
              }),
            ],
          };
        }
      }

      // calculating total items and subtotal
      let totalItems = 0;
      let totalSubtotal = 0;
      existingCartAttributes.combinations.forEach((item: TCombination) => {
        totalItems += item.quantity;
        totalSubtotal += item.subtotal;
      });
      // updating cartAttribtue with total items and subtotal
      const updatedCartAttributes = {
        ...cartAttributes,
        combinations: existingCartAttributes.combinations,
        items: totalItems,
        subtotal: totalSubtotal,
      };

      // updating cart state with new cartAttributes
      setCartAttributes(updatedCartAttributes);
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
    }
  }, [counter]);

  const UpdateCounterBasedOnCart = () => {
    if (cart.length) {
      const doesExists = cart.filter(
        (item: TCartContextValue) => item._id === details._id
      );
      if (doesExists.length) {
        setCounter(doesExists[0]?.quantity);
      }
    }
  };
  useEffect(() => {
    if (!colorAttribute?.values?.length && !sizesAttribute?.values?.length) {
      UpdateCounterBasedOnCart();
    } else {
      // if color exists in URL search params/ URL query params e.g. pathname?color=black
      if (searchParams.color) {
        // updating counter a rendered/re-rendered UI with persitant color based combination's quantity
        const existingColorAttributes = cartAttributes.combinations.filter(
          (item: TCombination) => item.color === searchParams.color
        );
        setCounter(
          existingColorAttributes.length
            ? existingColorAttributes[0].quantity
            : 0
        );
      } else if (cart.length) {
        // if cart has length with all sorts of combination as persitant state
        const existingCombinationsInCart = cart.filter(
          (item: TCartContextValue) => item._id === details._id
        );
        if (existingCombinationsInCart.length) {
          // getting colors in persitant cart context state
          const colorsInCart: TCombination[] =
            existingCombinationsInCart[0]?.attributeCombinations?.combinations?.filter(
              (item: TCombination) => item.color
            ) ?? [];
          // getting sizes in persitant cart context state
          const sizesInCart: TCombination[] =
            existingCombinationsInCart[0]?.attributeCombinations?.combinations?.filter(
              (item: TCombination) => item.size
            ) ?? [];

          // getting sorted colors in persitant cart context state
          const sortedColors = colorsInCart.sort(
            (item1: TCombination, item2: TCombination) =>
              item2.quantity - item1.quantity
          );

          // updating counter state with hightest amount of quantity and query string with color name of color based combination
          setCounter(
            sortedColors.length
              ? sortedColors[0].quantity
              : sizesInCart.length
              ? sizesInCart[0].quantity
              : 0
          );
          sortedColors.length &&
            router.push(pathname + "?color=" + sortedColors[0]?.color);
        }
      }
    }
  }, [searchParams]);
  console.log(cart);
  const AddItemToCart = () => {
    const existsInCart = cart.filter(
      (item: TCartContextValue) => item._id === details._id
    );
    if (!existsInCart.length) {
      if (!colorAttribute?.values?.length && !sizesAttribute?.values?.length) {
        setCart([...cart, { ...details, quantity: counter }]);
      } else {
        setCart([...cart, DetailsToPass]);
      }
    }
  };

  const RemoveItemFromCart = () => {
    cart.length &&
      setCart(
        cart.filter((item: TCartContextValue) => item._id !== details._id)
      );
  };

  // add or remove actions on click on Add to cart/Remove from cart button
  const handleAddToCart = () => {
    if (cart.length) {
      // if cart is not empty
      if (cart.find((item: TCartContextValue) => item._id === details._id)) {
        // if product is already in cart, then removed
        RemoveItemFromCart();
      } else {
        // if product is not in cart, then added
        AddItemToCart();
      }
    } else {
      // if cart is empty
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

      {colorAttribute?.values?.length ? (
        <div className="flex flex-col gap-[16px]">
          <p
            className={clsx(
              "font-light text-gray-500 text-[14px] md:text-[20px]"
            )}
          >
            Color&nbsp;
            <span
              className={clsx(
                "font-semibold text-primary text-[14px] md:text-[20px]"
              )}
            >
              {searchParams.color ?? ""}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-[16px]">
            {colorAttribute.values.map((item: any, index: number) => {
              const paths = item.split("/");
              const color = paths[paths.length - 1].split(".")[0];
              return (
                <Link
                  key={index}
                  className={clsx(
                    "relative rounded-full border-[2px] border-dark_gray hover:border-secondary/50 md:cursor-pointer bg-white flex items-center justify-center w-[40px] h-[40px]",
                    {
                      "border-secondary": color === searchParams.color,
                    }
                  )}
                  href={{
                    pathname,
                    query: {
                      color,
                    },
                  }}
                >
                  <Image
                    src={item}
                    alt=""
                    width={1000}
                    height={1000}
                    className={clsx("rounded-full w-[32px] h-[32px]")}
                  />
                  <div className="absolute top-0 left-0 z-[1] h-full w-full flex items-center justify-center">
                    <span className="bg-black/20 rounded-full w-1/2 h-1/2 text-white font-medium text-center">
                      {cartAttributes.combinations.filter(
                        (combination: TCombination) =>
                          combination.color === color
                      )[0]?.quantity ?? 0}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
      {/* counter */}
      {combinationSize ||
      searchParams.color ||
      (!colorAttribute?.values?.length && !sizesAttribute?.values?.length) ? (
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
      <p className="text-[14px] md:text-[20px] font-light text-gray-500">
        Sub total&nbsp;
        <span className="text-[14px] md:text-[20px] font-semibold text-primary">
          ${cartAttributes.subtotal || counter * price || 0}
        </span>
        &nbsp;is for total&nbsp;
        {cartAttributes.items || counter || 0}
        &nbsp;items
      </p>
      {/* add to cart button */}
      <div className="flex flex-wrap items-center gap-2">
        {((combinationSize || searchParams.color) && cartAttributes.items) ||
        (!colorAttribute?.values?.length &&
          !sizesAttribute?.values?.length &&
          counter) ? (
          <Button
            variant={
              cart.filter((item: TCartContextValue) => item._id === details._id)
                .length
                ? "outline"
                : "secondary"
            }
            onClick={handleAddToCart}
            className="gap-4"
          >
            {cart.filter((item: TCartContextValue) => item._id === details._id)
              .length ? (
              <Minus className="stroke-gray-800 stroke-[1.4px] w-6 h-6" />
            ) : (
              <Plus className="stroke-white stroke-[1.8px] w-6 h-6" />
            )}

            {cart.filter((item: TCartContextValue) => item._id === details._id)
              .length
              ? "Remove from cart"
              : "Add to cart"}
          </Button>
        ) : null}
        <Link href="/checkout">
          <Button className="gap-4">
            <ShoppingCart className="stroke-white w-6 h-6" /> Checkout
          </Button>
        </Link>
      </div>

      {sizesAttribute?.values?.length ? (
        <div className="text-pink-600 flex items-center gap-2">
          <MessageCircleWarning className="w-6 h-6 stroke-[1px] stroke-pink-600" />
          Please select any size and then increase quantity
        </div>
      ) : null}
      {colorAttribute?.values?.length ? (
        <div className="text-pink-600 flex items-center gap-2">
          <MessageCircleWarning className="w-6 h-6 stroke-[1px] stroke-pink-600" />
          Please select any color and then increase quantity
        </div>
      ) : null}
    </div>
  );
};

export default ProductInteractions;
