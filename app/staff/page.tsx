import Link from "next/link";

const Staff = async () => {
  const data = await fetch("http://localhost:8080/api/staff");
  const staff = await data.json();

  // console.log(staff)

  // Image Upload
  // const uploadImage = async (file) => {
  //   "use server";
  //   const bookData = JSON.stringify({
  //     title: "The Silent Observer",
  //     authorNameList: ["Gillian Flynn"],
  //     genreTagList: ["Thriller", "Mystery"],
  //     publisher: "Whispering Pages",
  //     yearPublished: 2022,
  //     description: "A gripping tale of secrets and suspense",
  //     language: "ENGLISH",
  //     numPages: 420,
  //     priceBeforeDiscount: 15,
  //     discountPercent: 10,
  //     copiesAvailable: 300,
  //   });

  //   const formData = new FormData();
  //   // formData.append("bookDTO", bookData);
  //   formData.append("bookDTO", new Blob([JSON.stringify(bookData)], { type: "application/json" }));
  //   // formData.append("imageJpg", file, "origin.jpg");
  //   formData.append("imageJpg", file, "origin.jpg");

  //   try {
  //     const res = await fetch("http://localhost:8080/api/books", {
  //       method: "POST",
  //       body: formData,
  //       redirect: "follow",
  //     });

  //     const imgRes = await res.text();
  //     console.log("Uploaded: ", imgRes);
  //   } catch (error) {
  //     console.error("Upload Error: ", error);
  //   }
  // };

  // await uploadImage();

  return (
    <>
      Staff page <br /> <button className="bg-blue-400">Add staff</button>
      <div>
        {staff.map((staff) => (
          <div key={staff.id} className="border border-orange-400 m-4 p-4">
            {staff.fullName}
          </div>
        ))}
      </div>
      <Link href={"/"} className="bg-green-400">
        Back to books
      </Link>
      {/* <Upload upload={uploadImage} /> */}
    </>
  );
};

export default Staff;
