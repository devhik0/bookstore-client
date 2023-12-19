import { getBooks } from "@/app/_actions/getBooks";
import { getGenres } from "@/app/_actions/getGenres";
import { Book, BookForm, Genre } from "@/lib/types";
import Image from "next/image";
import DeleteBookDialog from "./delete-book-dialog";
import EditBookDialog from "./edit-book-dialog";
import UploadImageDialog from "./upload-image-dialog";

export default async function BookList() {
  const books = (await getBooks({})) as Book[];
  const genres = (await getGenres()) as Genre[];

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
            <EditBookDialog genres={genres} book={book as BookForm} />
            <UploadImageDialog book={book} />
            <DeleteBookDialog book={book} />
          </div>
        ))
        .reverse()}
    </>
  );
}
