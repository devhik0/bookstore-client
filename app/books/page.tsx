import Search from "@/app/_components/search";
import Filters from "@/app/books/filters";
import Sorts from "@/app/books/sorts";
import { CardTitle } from "@/components/ui/card";
import { Books, Genre, SearchParams } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { getBooks } from "../_actions/getBooks";
import { getGenres } from "../_actions/getGenres";

export default async function Books({ searchParams }: { searchParams: SearchParams }) {
  const books = (await getBooks(searchParams)) as Books;

  const genres = (await getGenres()) as Genre[];

  return (
    <div className="w-full h-[100vh] text-center">
      <div className="flex gap-4">
        <div className="w-[35vw] md:w-[25vw] h-full border text-xs md:text-[1rem] px-2 border-green-400">
          <Filters genres={genres} />
        </div>
        <div className="w-[60vw] md:w-full border border-green-400">
          <div className="flex flex-col w-[97%] text-xs md:text-[1rem]">
            <div className="flex flex-col items-center justify-end md:flex-row">
              <Search where="books" />
              <Sorts />
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {books.length === 0 ? (
                <>There is no book here.</>
              ) : (
                books.reverse().map((book) => {
                  return (
                    <Link
                      href={`/books/${book.id}`}
                      key={book.id}
                      className="flex flex-col border border-gray-400 rounded-lg w-[40vw] md:w-[15vw] mt-2"
                    >
                      <Image src={book.imageLink} width={210} height={210} alt="book-img" />
                      <div className="p-4">
                        <CardTitle>{book.publisher}</CardTitle>
                      </div>
                      <div className="p-2">
                        <p className="p-2">{book.title}</p>
                      </div>
                      <div className="justify-center p-2">
                        <p className="font-bold">{book.priceBeforeDiscount} €</p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
