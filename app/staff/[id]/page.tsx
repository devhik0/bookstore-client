import Upload from "@/components/other/book-upload";
import { Staff } from "@/lib/types";
import { revalidatePath } from "next/cache";

export default async function StaffInfo({ params }: { params: { id: number } }) {
  const data = await fetch(`http://localhost:8080/api/staff/${params.id}`);
  const staffInfo = (await data.json()) as Staff;

  const addBookImage = async (file: File, id: number) => {
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

  const uploadBook = async (formData: FormData) => {
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

  return (
    <>
      Staff info for: {params.id}
      <h2>{staffInfo.fullName}</h2>
      {/* Opens a modal and adds book inside of it */}
      {/* add upload book form */}
      <Upload uploadBook={uploadBook} />
    </>
  );
}
