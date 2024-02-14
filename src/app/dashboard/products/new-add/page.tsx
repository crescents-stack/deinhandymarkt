"use client";
import InputField from "@/components/atoms/input-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { GetCategories } from "../../categories/_utils/actions/actions";
import { ProductComboBox } from "@/components/ui/products-combobox";
// import { ProductSchema, TProductSchema } from "../_utils/types/types";
import TagInput from "@/components/molecules/tag-input";
import UploadSingleImage from "@/components/molecules/upload-with-cloudinary";
import UploadMultipleImages from "@/components/molecules/upload-multi-image-with-cloudinary";
import { z } from "zod";

const ProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(5).max(200),
  slug: z.string().min(3).max(100),
  category: z
    .string()
    .min(3)
    .max(50)
    .or(
      z.object({
        _id: z.string().min(3).max(50),
        name: z.string().min(3).max(50),
        slug: z.string().min(3).max(50),
      })
    ),
  productType: z.literal("simple_product").or(z.literal("variable_product")),
  price: z.number().min(1),
  discount: z.object({
    type: z.literal("percentage").or(z.literal("fixed")),
    value: z.number().min(0),
  }),
  images: z.array(z.string()),
  thumbnail: z.string().min(1),
  stock: z.number().min(1),
  description: z.string().min(20).max(2000),
  short_description: z.string().min(20).max(600),
  attributes: z.array(
    z.object({
      label: z.string().min(3),
      values: z.array(z.string()),
    })
  ),
  tags: z.array(z.string()),
  compatibility: z.array(z.string()),
  metadata: z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(2000),
  }),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

type TProductSchema = z.infer<typeof ProductSchema>;

const DiscountType = [
  {
    value: "percentage",
    label: "Percentage",
  },
  {
    value: "fixed",
    label: "Fixed",
  },
];

const ProductTypes = [
  {
    value: "simple_product",
    label: "Simple",
  },
  {
    value: "variable_product",
    label: "Variable",
  },
];

const DefaultFormStepsSimpleProduct = [
  {
    id: 1,
    title: "Overview",
    fields: [
      "productType",
      "name",
      "slug",
      "price",
      "discount.type",
      "discount.value",
      "category",
      "stock",
    ],
  },
  {
    id: 2,
    title: "Attributes",
    fields: ["compatibility", "tags", "thumbnail", "images"],
    // fields: ["compatibility", "attributes", "tags", "thumbnail", "images"],
  },
  {
    id: 3,
    title: "Descriptions",
    fields: [
      "shortDescription",
      "description",
      "metatags.title",
      "metatags.description",
    ],
  },
];
const DefaultFormStepsVariableProduct = [
  {
    id: 1,
    title: "Overview",
    fields: ["productType", "name", "slug", "price", "category"],
  },
  {
    id: 2,
    title: "Attributes",
    fields: ["compatibility", "attributes", "tags", "thumbnail", "images"],
  },
  {
    id: 3,
    title: "Descriptions",
    fields: [
      "shortDescription",
      "description",
      "metatags.title",
      "metatags.description",
    ],
  },
];

type FieldName = keyof TProductSchema;

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [FormSteps, setFormSteps] = useState(DefaultFormStepsSimpleProduct);
  const form = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      productType: "simple_product",
      price: 0,
      discount: {
        type: "fixed",
        value: 0,
      },
      images: [],
      thumbnail: "",
      stock: 0,
      description: "",
      short_description: "",
      attributes: [],
      tags: [],
      metadata: {
        title: "",
        description: "",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  const watchedFields = useWatch({
    control: form.control,
    defaultValue: {
      productType: "simple_product",
    },
  });

  const [categories, setCategories] = useState([
    {
      value: "dummy",
      label: "Dummy",
    },
  ]);
  const fetchCategories = async () => {
    const result = await GetCategories();
    // PRINT(result);
    if (result.success) {
      setCategories([
        ...result.data.categories.map(
          (category: { _id: string; name: string }) => {
            return {
              value: category._id,
              label: category.name,
            };
          }
        ),
      ]);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const processForm: SubmitHandler<TProductSchema> = (data) => {
    console.log(data);
    form.reset();
    setCurrentStep(1);
  };

  const handleNext = async () => {
    const fields = FormSteps[currentStep - 1].fields;
    const validated = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });
    console.log(fields);
    if (!validated) return;

    if (currentStep === FormSteps.length) {
      await form.handleSubmit(processForm)();
    }
    if (currentStep < FormSteps.length) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  // console.table(watchedFields);
  // console.table(form.getValues());
  // console.table(FormSteps);

  return (
    <div className="max-w-[640px] p-8 rounded-[10px] bg-white">
      <h2 className="text-[14px] md:text-[16px] font-semibold">
        Add New Product
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {FormSteps.map((step) => (
          <div key={step.id}>
            <div className="flex gap-2 items-center pt-4">
              <p
                className={clsx(
                  "font-bold transition ease-in-out duration-500",
                  {
                    "text-gray-600": step.id <= currentStep,
                    "text-gray-300": step.id > currentStep,
                  }
                )}
              >
                {step.title}
              </p>
            </div>
            <div
              className={clsx(
                "h-[2px] rounded-full transition ease-in-out duration-500",
                {
                  "bg-gray-600": step.id <= currentStep,
                  "bg-gray-300": step.id > currentStep,
                }
              )}
            />
          </div>
        ))}
      </div>
      <Form {...form}>
        <form className="py-10 mt-4 border-t">
          <fieldset
            className={clsx("transition ease-in-out duration-500 space-y-8", {
              block: currentStep === 1,
              hidden: currentStep !== 1,
            })}
          >
            <FormField
              control={form.control}
              name="productType"
              render={() => (
                <FormItem>
                  <FormLabel className="inline-flex">Product Type</FormLabel>
                  <br />
                  <FormControl>
                    <ProductComboBox
                      placeholder="..."
                      options={ProductTypes}
                      name="productType"
                      onChange={(e: any) => {
                        const productType = e.target.value;
                        if (productType === "variable_product") {
                          setFormSteps(DefaultFormStepsVariableProduct);
                        } else {
                          setFormSteps(DefaultFormStepsSimpleProduct);
                        }
                        form.setValue("productType", productType);
                      }}
                      defaultValue={watchedFields.productType}
                      inForm
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputField
              form={form}
              name="name"
              label="Name"
              placeholder="e.g iPhone 15 Pro Max"
            />
            <InputField
              form={form}
              name="slug"
              label="Slug"
              placeholder="e.g iPhone-15-Pro-Max"
            />
            <InputField form={form} name="price" label="price" type="number" />
            {watchedFields.productType !== "variable_product" ? (
              <div className="pt-4 mt-4 border-t flex flex-col gap-[16px]">
                <h2 className="font-bold">Discount</h2>
                {/* <InputField form={form} name="discount.label" label="Label" /> */}
                <FormField
                  control={form.control}
                  name="discount.type"
                  render={() => (
                    <FormItem>
                      <FormLabel className="inline-flex">Type</FormLabel>
                      <br />
                      <FormControl>
                        <ProductComboBox
                          placeholder="Discount type..."
                          options={DiscountType}
                          name="discount.type"
                          onChange={(e: any) => {
                            form.setValue("discount.type", e.target.value);
                          }}
                          inForm
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <InputField
                  form={form}
                  name="discount.value"
                  label="Value"
                  type="number"
                />
              </div>
            ) : null}

            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel className="inline-flex">Category</FormLabel>
                  <br />
                  <FormControl>
                    <ProductComboBox
                      placeholder="..."
                      options={categories}
                      name="category"
                      onChange={(e: any) => {
                        form.setValue("category", e.target.value);
                      }}
                      inForm
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedFields.productType !== "variable_product" ? (
              <InputField
                form={form}
                name="stock"
                label="Stock"
                type="number"
              />
            ) : null}
          </fieldset>
          <fieldset
            className={clsx("transition ease-in-out duration-500 space-y-8", {
              block: currentStep === 2,
              hidden: currentStep !== 2,
            })}
          >
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="status" className="font-semibold">
                Tags
              </label>
              <TagInput
                onChange={(e: any) => {
                  form.setValue("tags", e.target.value);
                }}
                name="tags"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="compatibility" className="font-semibold">
                Compatibility
              </label>
              <TagInput
                onChange={(e: any) => {
                  form.setValue("compatibility", e.target.value);
                }}
                name="compatibility"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="attributes" className="font-semibold">
                Attributes
              </label>
              {/* <AttributeInput
                onChange={(e: any) => {
                  form.setValue("attributes", e.target.value);
                }}
                name="attributes"
              /> */}
            </div>
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="thumbnail" className="font-semibold">
                Thumbnail
              </label>
              <UploadSingleImage form={form} name="thumbnail" />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="images" className="font-semibold">
                Images
              </label>
              <UploadMultipleImages form={form} name="images" />
            </div>
          </fieldset>
          <fieldset
            className={clsx("transition ease-in-out duration-500 space-y-8", {
              block: currentStep === 3,
              hidden: currentStep !== 3,
            })}
          >
            <InputField
              form={form}
              name="description"
              label="Description"
              textarea
            />
          </fieldset>
        </form>
        <div className="flex items-center justify-between gap-5">
          <Button onClick={handlePrevious} variant="outline">
            Previous
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default Page;
