"use client"

import {PayButtons} from "@/app/pay/components/paypal/PayButton";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

type TPayload ={
    amount:number,
    isVisible:boolean,
}

export const PaypalPaymentService = ({amount,isVisible}:TPayload)=>{
    const initialOptions = {
        clientId: "AVmZd8wYe3sipE3zSFPZ9Fs5LHmTm7hKedvqBC1ipnXkstH3bwTfn1hrq3jprBBQsw6bTkPQlInBVGnp",
        currency: "USD",
        intent: "capture",
    };
    return(
        <PayPalScriptProvider
            deferLoading={isVisible??true}
            options={initialOptions}
        >
            <PayButtons amount={{value: amount}}/>
        </PayPalScriptProvider>
    )
}