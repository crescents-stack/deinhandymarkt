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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "./carousel";

function measuringAdditionsToShoppingCart(product: any) {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "addToCart",
      componentName: "add_single_product_to_cart",
      ecommerce: {
        currencyCode: "USD", // Local currency is optional.
        add: {
          products: product,
        },
      },
    });
  }
}
function measuringRemovalsFromShoppingCart(product: any) {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "removeToCart",
      componentName: "remove_single_product_from_cart",
      ecommerce: {
        currencyCode: "USD", // Local currency is optional.
        remove: {
          products: product,
        },
      },
    });
  }
}

const CalculateQuantity = (data: TCartAttribute) => {
  let quantity = 0;
  data.combinations.forEach((combination: TCombination) => {
    quantity += combination.quantity;
  });
  return quantity;
};

const CalculateSubtotal = (data: TCartAttribute) => {
  let subtotal = 0;
  data.combinations.forEach((combination: TCombination) => {
    subtotal += combination.subtotal;
  });
  return subtotal;
};

const ProductInteractions = ({
  details,
  variant,
}: {
  details: TProductSchema;
  variant: "lg" | "sm";
}) => {
  // product details
  const { attributes, name, price } = details;
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
        : colorAttribute
        ? CombinationTypes.color
        : "",
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
    cart
      .filter((item) => item._id === details?._id)[0]
      ?.attributeCombinations?.combinations?.filter(
        (item: TCombination) => item.size
      )[0]?.price ?? price
  );

  // quantity counter for individual color and size combinations
  const [counter, setCounter] = useState(
    cartAttributes.combinationType === ""
      ? cart.filter((item: TCartContextValue) => item._id === details._id)[0]
          ?.quantity ?? 0
      : cart.filter((item: TCartContextValue) => item._id === details._id)[0]
          ?.attributeCombinations?.combinations?.length
      ? cartAttributes?.combinations[0]?.quantity ?? 0
      : 0
  );

  // color and size combination manager state
  const [combinationSize, setCombinationSize] = useState(
    cart
      .filter((item: TCartContextValue) => item._id === details._id)[0]
      ?.attributeCombinations?.combinations?.filter(
        (item: TCombination) => item.size
      )[0]?.size ?? ""
  );
  const [combinationColor, setCombinationColor] = useState(
    cart.filter((item: TCartContextValue) => item._id === details._id)[0]
      ?.attributeCombinations?.combinations[0]?.color ?? ""
  );

  useEffect(() => {
    if (
      ["sizeColor", "size", "color"].includes(cartAttributes.combinationType)
    ) {
      if (cartAttributes.combinationType === "color" && combinationColor) {
        const existingColorCombinations = cartAttributes.combinations.filter(
          (item: TCombination) => item.color === combinationColor
        );
        const updatedCartAttributes1 = {
          ...cartAttributes,
          combinations: existingColorCombinations.length
            ? cartAttributes.combinations.map((combination: TCombination) => {
                if (combination.color === combinationColor) {
                  return {
                    ...combination,
                    quantity: counter,
                    price: basePrice,
                    subtotal: counter * basePrice,
                  };
                }
                return combination;
              })
            : [
                ...cartAttributes.combinations,
                {
                  color: combinationColor,
                  quantity: counter,
                  price: basePrice,
                  subtotal: counter * basePrice,
                },
              ],
        };
        const updatedCartAttributes2 = {
          ...updatedCartAttributes1,
          items: CalculateQuantity(updatedCartAttributes1),
          subtotal: CalculateSubtotal(updatedCartAttributes1),
        };
        setCartAttributes(updatedCartAttributes2);

        const existInCart = cart
          .filter((item: TCartContextValue) => item._id === details._id)[0]
          ?.attributeCombinations?.combinations?.filter(
            (item: TCombination) => item.color === combinationColor
          ).length;

        const existInCartAttribute = updatedCartAttributes2.combinations.filter(
          (item: TCombination) => item.color === combinationColor
        );

        if (existInCart || existInCartAttribute) {
          setCart(
            cart.map((item: TCartContextValue) => {
              return item._id === details._id
                ? {
                    ...item,
                    attributeCombinations: updatedCartAttributes2,
                    quantity: updatedCartAttributes2.items,
                  }
                : item;
            })
          );
        }
      }
      if (cartAttributes.combinationType === "size" && combinationSize) {
        const existingSizeCombinations = cartAttributes.combinations.filter(
          (item: TCombination) => item.size === combinationSize
        );
        const updatedCartAttributes1 = {
          ...cartAttributes,
          combinations: existingSizeCombinations.length
            ? cartAttributes.combinations.map((combination: TCombination) => {
                if (combination.size === combinationSize) {
                  return {
                    ...combination,
                    quantity: counter,
                    price: basePrice,
                    subtotal: counter * basePrice,
                  };
                }
                return combination;
              })
            : [
                ...cartAttributes.combinations,
                {
                  size: combinationSize,
                  quantity: counter,
                  price: basePrice,
                  subtotal: counter * basePrice,
                },
              ],
        };
        const updatedCartAttributes2 = {
          ...updatedCartAttributes1,
          items: CalculateQuantity(updatedCartAttributes1),
          subtotal: CalculateSubtotal(updatedCartAttributes1),
        };
        setCartAttributes(updatedCartAttributes2);

        const existInCart = cart
          .filter((item: TCartContextValue) => item._id === details._id)[0]
          ?.attributeCombinations?.combinations?.filter(
            (item: TCombination) => item.size === combinationSize
          ).length;

        const existInCartAttribute = updatedCartAttributes2.combinations.filter(
          (item: TCombination) => item.size === combinationSize
        );

        if (existInCart || existInCartAttribute) {
          setCart(
            cart.map((item: TCartContextValue) => {
              return item._id === details._id
                ? {
                    ...item,
                    attributeCombinations: updatedCartAttributes2,
                    quantity: updatedCartAttributes2.items,
                  }
                : item;
            })
          );
        }
      }
    }
    if (cartAttributes.combinationType === "") {
      setCart(
        cart.map((item: TCartContextValue) => {
          return item._id === details._id
            ? { ...item, quantity: counter }
            : item;
        })
      );
    }
  }, [counter]);

  const AddItemToCart = () => {
    const existsInCart = cart.filter(
      (item: TCartContextValue) => item._id === details._id
    );
    if (!existsInCart.length) {
      if (["size", "color"].includes(cartAttributes.combinationType)) {
        const newAddition = {
          ...details,
          attributeCombinations: cartAttributes,
          quantity: CalculateQuantity(cartAttributes),
        };
        setCart([...cart, newAddition]);
        measuringAdditionsToShoppingCart(newAddition);
      } else {
        const newAddition = { ...details, quantity: counter };
        setCart([...cart, newAddition]);
        measuringAdditionsToShoppingCart(newAddition);
      }
    }
  };

  const RemoveItemFromCart = () => {
    if (cart?.length) {
      setCart(
        cart.filter((item: TCartContextValue) => item._id !== details._id)
      );
      measuringRemovalsFromShoppingCart(details);
    }
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
    <div
      className={clsx({
        "bg-none": variant === "sm",
        "bg-white": variant === "lg",
      })}
    >
      <div
        className={clsx("container  gap-[40px]", {
          "flex flex-col md:flex-row items-start md:items-center":
            variant === "sm",
          "grid grid-cols-1 md:grid-cols-2": variant === "lg",
        })}
      >
        <div
          className={clsx({
            "max-w-[200px] m-0 md:m-auto": variant === "sm",
            "w-auto": variant === "lg",
          })}
        >
          {details.images.length ? (
            <Carousel
              ProductImages={
                combinationColor
                  ? [
                      ...details.images.filter((image) =>
                        image.includes(combinationColor)
                      ),
                    ]
                  : [details.thumbnail, ...details.images.slice(0, 4)]
              }
              variant={variant}
            />
          ) : null}
        </div>
        <div
          className={clsx(
            "grid grid-cols-1 gap-[32px] h-full justify-center  items-center my-auto"
          )}
        >
          <div
            className={clsx("flex flex-col gap-[20px]", {
              "gap-2 w-full": variant === "sm",
              "gap-8 w-auto": variant === "lg",
            })}
          >
            <div
              className={clsx("flex flex-wrap", {
                "pb-2 gap-[8px] flex-row items-center": variant === "sm",
                "pb-10 gap-[20px] flex-col items-start": variant === "lg",
              })}
            >
              <div
                className={clsx("flex flex-col", {
                  "gap-[8px]": variant === "sm",
                  "gap-[16px]": variant === "lg",
                })}
                role={variant === "sm" ? "button" : "div"}
                onClick={() => {
                  variant === "sm" && router.push(`/products/${details.slug}`);
                }}
              >
                <h1
                  className={clsx("text-gray-500", {
                    "text-[14px] md:text-[18px] hover:text-secondary":
                      variant === "sm",
                    h2_text: variant === "lg",
                  })}
                >
                  <span
                    className={clsx(" font-semibold text-primary", {
                      "text-[14px] md:text-[18px] hover:text-secondary":
                        variant === "sm",
                      h2_text: variant === "lg",
                    })}
                  >
                    {name}
                  </span>
                </h1>
              </div>
              <p
                className={clsx("text-gray-500", {
                  "text-[12px]": variant === "sm",
                  "text-[20px]": variant === "lg",
                })}
              >
                ${basePrice}
              </p>
            </div>
            {sizes?.length ? (
              <div className="flex flex-wrap items-center gap-4">
                {sizes?.map(
                  (
                    size: { value: string; sizePrice: number },
                    index: number
                  ) => {
                    return (
                      <div
                        key={index}
                        className={clsx(
                          "px-4 py-2 text-base inline-flex border-[2px] rounded-[10px] transition ease-in-out duration-300",
                          {
                            "border-muted hover:border-dark_gray":
                              size.value !== combinationSize,
                            "border-secondary hover:border-secondary/80":
                              size.value === combinationSize,
                            "bg-white": variant === "sm",
                            "bg-muted": variant === "lg",
                          }
                        )}
                        role="button"
                        onClick={() => {
                          setBasePrice(size.sizePrice);
                          setCombinationSize(size.value);

                          const existingSizeCombinationInCart =
                            cartAttributes.combinations.filter(
                              (combination: TCombination) =>
                                combination.size === size.value
                            );
                          setCounter(
                            existingSizeCombinationInCart[0]?.quantity ?? 0
                          );
                        }}
                      >
                        {size.value.replace("m", " meter")}
                        {cartAttributes.combinations
                          .filter(
                            (combItem: TCombination) =>
                              combItem.size === size.value
                          )
                          .map(
                            (combItem: TCombination) =>
                              ` x ${combItem.quantity}`
                          )}
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            {colorAttribute?.values?.length ? (
              <div className="flex flex-col gap-[16px]">
                <p
                  className={clsx("font-light text-gray-500", {
                    "text-[12px] md:text-[16px]": variant === "sm",
                    "text-[14px] md:text-[20px]": variant === "lg",
                  })}
                >
                  Color&nbsp;
                  <span
                    className={clsx("font-semibold text-primary", {
                      "text-[12px] md:text-[16px]": variant === "sm",
                      "text-[14px] md:text-[20px]": variant === "lg",
                    })}
                  >
                    {combinationColor ?? ""}
                  </span>
                </p>
                <div
                  className={clsx("flex flex-wrap items-center", {
                    "gap-[4px]": variant === "sm",
                    "gap-[16px]": variant === "lg",
                  })}
                >
                  {colorAttribute.values.map((item: any, index: number) => {
                    const paths = item.split("/");
                    const color = paths[paths.length - 1].split(".")[0];
                    return (
                      <div
                        key={index}
                        className={clsx(
                          "relative rounded-full border-[2px] border-dark_gray hover:border-secondary/50 md:cursor-pointer bg-white flex items-center justify-center",
                          {
                            "border-secondary": color === combinationColor,
                            "w-[30px] h-[30px]": variant === "sm",
                            "w-[40px] h-[40px]": variant === "lg",
                          }
                        )}
                        onClick={() => {
                          setCombinationColor(color);
                          const existingColorCombinationInCart =
                            cartAttributes.combinations.filter(
                              (combination: TCombination) =>
                                combination.color === color
                            );
                          setCounter(
                            existingColorCombinationInCart[0]?.quantity ?? 0
                          );
                        }}
                      >
                        <Image
                          src={item}
                          alt=""
                          width={1000}
                          height={1000}
                          className={clsx("rounded-full", {
                            "w-[24px] h-[24px]": variant === "sm",
                            "w-[32px] h-[32px]": variant === "lg",
                          })}
                        />
                        <div className="absolute top-0 left-0 z-[1] h-full w-full flex items-center justify-center">
                          <span
                            className={clsx(
                              "bg-black/20 rounded-full text-white font-medium text-center",
                              {
                                "w-3/5 h-3/5 text-[10px]": variant === "sm",
                                "w-1/2 h-1/2": variant === "lg",
                              }
                            )}
                          >
                            {cartAttributes.combinations.filter(
                              (combination: TCombination) =>
                                combination.color === color
                            )[0]?.quantity ?? 0}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {/* counter */}
            {combinationSize ||
            combinationColor ||
            (!colorAttribute?.values?.length &&
              !sizesAttribute?.values?.length) ? (
              <div className="inline-flex items-center">
                <button
                  onClick={() => {
                    if (cartAttributes.combinationType === "") {
                      counter > 1 && setCounter(counter - 1);
                    } else {
                      counter > 0 && setCounter(counter - 1);
                    }
                  }}
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
            <p
              className={clsx("font-light text-gray-500", {
                "text-[12px] md:text-[16px]": variant === "sm",
                "text-[14px] md:text-[20px]": variant === "lg",
              })}
            >
              Sub total&nbsp;
              <span
                className={clsx("font-semibold text-primary", {
                  "text-[12px] md:text-[16px]": variant === "sm",
                  "text-[14px] md:text-[20px]": variant === "lg",
                })}
              >
                ${cartAttributes.subtotal || counter * price || 0}
              </span>
              &nbsp;is for total&nbsp;
              {cartAttributes.items || counter || 0}
              &nbsp;items
            </p>
            {/* add to cart button */}
            {variant === "lg" ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant={
                      cart.filter(
                        (item: TCartContextValue) => item._id === details._id
                      ).length
                        ? "outline"
                        : "secondary"
                    }
                    onClick={handleAddToCart}
                    className="gap-4"
                    disabled={
                      cartAttributes.combinationType !== ""
                        ? cartAttributes.items
                          ? false
                          : true
                        : !counter
                    }
                  >
                    {cart.filter(
                      (item: TCartContextValue) => item._id === details._id
                    ).length ? (
                      <Minus className="stroke-gray-800 stroke-[1.4px] w-6 h-6" />
                    ) : (
                      <Plus className="stroke-white stroke-[1.8px] w-6 h-6" />
                    )}

                    {cart.filter(
                      (item: TCartContextValue) => item._id === details._id
                    ).length
                      ? "Remove from cart"
                      : "Add to cart"}
                  </Button>
                  <Button
                    className="gap-4"
                    disabled={!cart.length}
                    onClick={() => router.push("/checkout")}
                  >
                    <ShoppingCart className="stroke-white w-6 h-6" /> Checkout
                  </Button>
                </div>

                {sizesAttribute?.values?.length ? (
                  <div
                    className={clsx(
                      "text-secondary flex items-center gap-2 animate-bounce transition ease-in-out",
                      { "opacity-0": counter, "opacity-100": !counter }
                    )}
                  >
                    <MessageCircleWarning className="w-6 h-6 stroke-[1px] stroke-secondary" />
                    Please select any size and then increase quantity
                  </div>
                ) : null}
                {colorAttribute?.values?.length ? (
                  <div
                    className={clsx(
                      "text-secondary flex items-center gap-2 animate-bounce transition ease-in-out",
                      { "opacity-0": counter, "opacity-100": !counter }
                    )}
                  >
                    <MessageCircleWarning className="w-6 h-6 stroke-[1px] stroke-secondary" />
                    Please select any color and then increase quantity
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInteractions;
