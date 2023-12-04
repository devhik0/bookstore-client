import { revalidatePath } from "next/cache";

export const addBookImage = async (file: File, id: number) => {
  "use server";
  if (!file) {
    throw Error("Please add a file");
  }

  const formData = new FormData();
  formData.append("file", file);
  // console.log("File at server: ", file);
  // console.log("FormData: ", formData.get("file"));
  // console.log("Book ID: ", id);
  try {
    const res = await fetch(`http://localhost:8080/api/books/${id}/cover`, {
      method: "PATCH",
      body: formData,
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
};
