import { NextRequest, NextResponse } from "next/server";

import { Stripe } from "stripe";
import { z } from "zod";
// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16"
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = z.string({
      required_error: "Account id is required."
    }).parse(params.id)
    const data = await stripe.paymentIntents.retrieve(id);

    return NextResponse.json({
      data
    })
  } catch (error) {
    return NextResponse.json(error)
  }

};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();


    const id = z.string({
      required_error: "Account id is required."
    }).parse(params.id)

    console.log({ body });

    const data = await stripe.paymentIntents.update(id, {
      metadata: {
        newProp: "welcome"
      }
    })

    return NextResponse.json({
      data,
      success: true
    })
  } catch (error) {
    return NextResponse.json(error, {
      status: 500
    })
  }

};