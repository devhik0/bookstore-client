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
    <div className="h-[100vh] w-full text-center">
      <div className="flex gap-4">
        <div className="h-full w-[35vw] border border-green-400 px-2 text-xs md:w-[25vw] md:text-[1rem]">
          <Filters genres={genres} />
        </div>
        <div className="w-[60vw] border border-green-400 md:w-full">
          <div className="flex w-[97%] flex-col text-xs md:text-[1rem]">
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
                      className="mt-2 flex w-[40vw] flex-col rounded-lg border border-gray-400 md:w-[15vw]"
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
