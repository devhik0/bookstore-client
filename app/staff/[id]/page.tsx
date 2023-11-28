import Upload from "@/components/other/book-upload";

export default async function StaffInfo({ params }) {
  const data = await fetch(`http://localhost:8080/api/staff/${params.id}`);
  const staffInfo = await data.json();

  // todo: fix here cuz of SA
  const uploadBook = async (file) => {
    "use server";
    const bookData = JSON.stringify({
      title: "A book title 3",
      authorNameList: ["an author"],
      genreTagList: ["Fiction", "Crime"],
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
      console.log("Added book: ", book);
      if (file) {
        await addBookImage(file, id);
        console.log("Added book with image: ", file);
      }
      console.log("Added book without image but id: ", id);
    } catch (error) {
      console.log("Error at add: ", error);
    }
  };

  const addBookImage = async (file, id) => {
    if (!file) {
      throw Error("Please add a file");
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("File: ", file);
      // const res = await fetch(`http://localhost:8080/api/books/${id}/cover`, {
      //   method: "patch",
      //   body: formData,
      // });
      // const cover = await res.json();
      // console.log("Added cover: ", cover);
      console.log(`Added cover to book: ${id}`);
    } catch (error) {
      console.log("Error at cover: ", error);
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
