"use server";

import { BASE_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteBook = async (id: number) => {
  const token = cookies().get("auth_token")?.value as string;

  try {
    const data = await fetch(`${BASE_URL}/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.ok) {
      console.log("Error while deleting: ", data.status);
    } else {
      console.log("Deleted book: ", id);
    }
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/customers/my-account");
  revalidatePath("/books");
};
