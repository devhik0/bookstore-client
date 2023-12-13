import { BASE_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addBookImage = async (file: File, id: number) => {
  "use server";

  const token = cookies().get("auth_token")?.value as string;

  if (!file) {
    throw Error("Please add a file");
  }

  const formData = new FormData();
  formData.append("file", file);
  // console.log("File at server: ", file);
  // console.log("FormData: ", formData.get("file"));
  // console.log("Book ID: ", id);
  try {
    const res = await fetch(`${BASE_URL}/books/${id}/cover`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Error while adding book image: ", res.status);
    } else {
      console.log(`Added cover to book: ${id}`);
    }
  } catch (error) {
    console.log("Error at cover: ", error);
  }
  revalidatePath("/books");
  revalidatePath("/customers/my-account");
};
