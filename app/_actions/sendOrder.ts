"use server";

import { BASE_URL } from "@/lib/constants";

export const sendOrder = async () => {
  const orderData = JSON.stringify({
    customerId: 54,
    orderItems: [
      {
        bookId: 554,
        quantity: 3,
      },
      {
        bookId: 703,
        quantity: 1,
      },
    ],
  });
  try {
    const data = await fetch(`${BASE_URL}/orders/54`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: orderData,
    });
    if (!data.ok) {
      console.log("Error while adding order", data.status);
    } else {
      const order = await data.json();
      console.log("Order: ", order);
    }
  } catch (error) {
    console.log("Error at add: ", error);
  }
};
