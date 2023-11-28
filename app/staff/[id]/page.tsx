import Upload from "@/components/other/book-upload";

export default async function StaffInfo({ params }) {
  const data = await fetch(`http://localhost:8080/api/staff/${params.id}`);
  const staffInfo = await data.json();

  const addBookImage = async (file, id) => {
    "use server";
    if (!file) {
      throw Error("Please add a file");
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("File at server: ", file);
      const res = await fetch(`http://localhost:8080/api/books/${id}/cover`, {
        method: "patch",
        body: formData,
      });
      if (!res) {
        console.log("Error while adding book");
      }
      console.log(`Added cover to book: ${id}`);
    } catch (error) {
      console.log("Error at cover: ", error);
    }
  };

  const uploadBook = async (formData) => {
    "use server";

    // form fields
    const title = formData.get("title");
    const file = formData.get("file");

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
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: bookData,
      });
      const book = await data.json();
      const id = book?.id;
      console.log("Book id: ", id);
      console.log("Added book: ", book);
      if (file.size > 0) {
        await addBookImage(file, id);
        console.log("Added book with image: ", file);
      } else {
        console.log("Added book without image but id: ", id);
      }
    } catch (error) {
      console.log("Error at add: ", error);
    }
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
