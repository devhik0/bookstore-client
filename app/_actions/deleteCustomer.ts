"use server";

import { BASE_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteCustomer = async (id: number) => {
  const token = cookies().get("auth_token")?.value as string;

  console.log("ID: ", id);
  try {
    const customer = await fetch(`${BASE_URL}/customers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!customer.ok) {
      console.log("Error while deleting customer: ", customer.status);
    } else {
      console.log("Deleted customer: ", id);
    }
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/customers/my-account");
};
