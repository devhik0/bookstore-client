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
            className="m-2 flex flex-row items-center justify-between gap-4 rounded-lg border border-gray-200 pr-2"
          >
            <Image src={book.imageLink} width={40} height={40} alt="book-img" />
            <div className="flex w-full items-center justify-between">
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
