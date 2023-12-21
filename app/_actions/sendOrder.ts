"use server";

import { BASE_URL } from "@/lib/constants";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

export const sendOrder = async (formData: FormData) => {
  unstable_noStore();

  const token = cookies().get("auth_token")?.value as string;

  const orderData = JSON.stringify({
    orderItems: [
      {
        bookId: formData.get("id"),
        quantity: 1,
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
  revalidatePath("/customers/my-account");
};
