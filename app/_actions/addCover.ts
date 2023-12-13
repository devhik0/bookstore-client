"use server";

import { BASE_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addCover = async (formData: FormData) => {
  const token = cookies().get("auth_token")?.value as string;
  const id = formData.get("id");
  const file = formData.get("file") as File;

  const img = new FormData();
  img.append("file", file);

  try {
    const data = await fetch(`${BASE_URL}/books/${id}/cover`, {
      method: "PATCH",
      body: img,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data.ok) {
      console.log("Error when image add: ", data.status);
    } else {
      console.log("Added cover: ", id);
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/books");
  revalidatePath("/customers/my-account");
};
