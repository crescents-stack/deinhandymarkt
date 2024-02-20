"use client";

import { useState } from "react";
import PaymentBox from "./components/PaymentBox";

const Payment = () => {
  const [amount, setAmount] = useState<number>(10);
//   const [enabled, setEnabled] = useState<boolean>(true);
  return (
    // <div style={{
    //     // marginTop: "200px",
    //     padding: "50px",
    //     // width:"100%",
    // }}
    // >
    //     <label htmlFor="amount">Amount :</label>
    //     <input type="number" name="amount" id="amount" onChange={(e) => setAmount(Number(e.target.value))} />
    //     <button
    //         style={{
    //             margin: "20px",
    //             padding: "5px",
    //             border: "1px solid black"
    //         }}

    //         onClick={() => setEnabled(!enabled)}
    //     >
    //         pay
    //     </button>

    //     {
    //         enabled &&
    //     }
    // </div>
    <PaymentBox amount={amount} />
  );
};

export default Payment;
