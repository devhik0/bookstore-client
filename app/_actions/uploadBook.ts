import { revalidatePath } from "next/cache";
import { addBookImage } from "./addBookImage";

export const uploadBook = async (formData: FormData) => {
  "use server";

  // form fields
  const title = formData.get("title") as string;
  const file = formData.get("file") as File;

  const bookData = JSON.stringify({
    title,
    authorNameList: ["image author 19"],
    genreTagList: ["Thriller", "Drama 19"],
    // publisher: "Whispering Pages",
    // yearPublished: 2022,
    // description: "A gripping tale of secrets and suspense",
    // language: "ENGLISH",
    // numPages: 420,
    // priceBeforeDiscount: 15,
    // discountPercent: 10,
    // copiesAvailable: 300,
  });

  try {
    const data = await fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bookData,
    });
    if (!data.ok) {
      console.log("Error while adding book data", data.status);
    } else {
      const book = await data.json();
      const id = book?.id;
      // console.log("Added book: ", book.title);
      if (file.size > 0) {
        // console.log("File, Size: ", [file.name, file.size]);
        console.log("Added book with image: ", file.name);
        await addBookImage(file, id);
      } else {
        console.log("Added book without image but id: ", id);
      }
    }
  } catch (error) {
    console.log("Error at add: ", error);
  }
  revalidatePath("/books");
};
