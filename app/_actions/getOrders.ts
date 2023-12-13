import { BASE_URL } from "@/lib/constants";
import { Order } from "@/lib/types";
import { cookies } from "next/headers";

export const getOrders = async () => {
  "use server";

  const token = cookies().get("auth_token")?.value as string;
  const data = await fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = (await data.json()) as Order[];
  return res;
};
