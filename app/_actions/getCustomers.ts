import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

export const getCustomers = async () => {
  "use server";

  const token = cookies().get("auth_token")?.value as string;

  const data = await fetch(`${BASE_URL}/customers`, { headers: { Authorization: `Bearer ${token}` } });
  const customers = await data.json();
  return customers;
};
