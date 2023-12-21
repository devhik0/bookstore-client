"use server";

import { BASE_URL } from "@/lib/constants";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

export const getOrdersByCustomer = async (id: number) => {
  unstable_noStore();

  const token = cookies().get("auth_token")?.value as string;

  const data = await fetch(`${BASE_URL}/orders/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const orders = await data.json();
  revalidatePath("/cart");
  return orders;
};
