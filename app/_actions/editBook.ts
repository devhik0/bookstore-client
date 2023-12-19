"use server";

import { BASE_URL } from "@/lib/constants";
import { Book } from "@/lib/types";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import { addBookImage } from "./addBookImage";

export const editBook = async (formData: FormData) => {
  unstable_noStore();

  const token = cookies().get("auth_token")?.value as string;

  // form fields
  const id = formData.get("id");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const discount = formData.get("discount");
  const numPages = formData.get("numPages");
  const language = formData.get("language") as Book["language"];
  const publisher = formData.get("publisher") as string;
  const yearPublished = formData.get("yearPublished") as string;
  const copiesAvailable = formData.get("copiesAvailable");
  const authorList = formData.getAll("author");
  const genreList = formData.getAll("genre");
  const file = formData.get("file") as File;

  const bookData = JSON.stringify({
    title,
    description,
    priceBeforeDiscount: price,
    discountPercent: discount,
    language,
    numPages,
    publisher,
    yearPublished,
    copiesAvailable,
    authorNameList: authorList,
    genreTagList: genreList,
  });

  try {
    const data = await fetch(`${BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: bookData,
    });
    if (!data.ok) {
      console.log("Error while editing book: ", data.status);
    } else {
      const book = await data.json();
      const id = book?.id;
      // console.log("Added book: ", book);
      if (file.size > 0) {
        // console.log("File, Size: ", [file.name, file.size]);
        // console.log("Added book with image: ", file.name);
        await addBookImage(file, id);
      } else {
        console.log("Edited book without image but id: ", id);
      }
    }
  } catch (error) {
    console.log("Error at edit: ", error);
  }
  revalidatePath("/customers/my-account");
  revalidatePath("/books");
};
