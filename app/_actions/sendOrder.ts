"use server";

import { BASE_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const sendOrder = async () => {
  const token = cookies().get("auth_token")?.value as string;

  const orderData = JSON.stringify({
    orderItems: [
      {
        bookId: 9,
        quantity: 10,
      },
    ],
  });
  try {
    const data = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
  revalidatePath("/cart");
};
