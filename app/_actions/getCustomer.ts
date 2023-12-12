import { BASE_URL } from "@/lib/constants";
import { Customer } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCustomer = async () => {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    redirect("/");
  }
  const data = await fetch(`${BASE_URL}/customers/my-account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!data.ok) {
    console.log("Error while getting customer ", data.status);
  }
  const customer = (await data.json()) as Customer;

  console.log("Customer: ", customer);

  return customer;
};
