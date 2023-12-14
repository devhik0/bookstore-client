import { getBooks } from "@/app/_actions/getBooks";
import { Book } from "@/lib/types";
import Image from "next/image";
import DeleteBookDialog from "./delete-book-dialog";
import EditBookDialog from "./edit-book-dialog";
import UploadImageDialog from "./upload-image-dialog";

export default async function BookList() {
  const books = (await getBooks({})) as Book[];

  return (
    <>
      {books
        .map((book) => (
          <div
            key={book.id}
            className="flex flex-row gap-4 justify-between items-center border border-gray-200 rounded-lg pr-2 m-2"
          >
            <Image src={book.imageLink} width={40} height={40} alt="book-img" />
            <div className="flex justify-between items-center w-full">
              <p>{book.title}</p>
              <p>€{book.priceBeforeDiscount}</p>
            </div>
            <EditBookDialog book={book} />
            <UploadImageDialog book={book} />
            <DeleteBookDialog book={book} />
          </div>
        ))
        .reverse()}
    </>
  );
}
