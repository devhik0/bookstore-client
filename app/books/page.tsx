import Search from "@/app/_components/search";
import Filters from "@/app/books/filters";
import Sorts from "@/app/books/sorts";
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
        <div className="h-full w-[35vw] px-2 text-xs md:w-[25vw] md:text-[1rem]">
          <Filters genres={genres} />
        </div>
        <div className="w-[60vw] md:w-full">
          <div className="flex w-[97%] flex-col text-xs md:text-[1rem]">
            <div className="flex flex-col items-center justify-end md:flex-row">
              <Search where="books" />
              <Sorts />
            </div>
            <div className="my-2 flex flex-wrap justify-center gap-2 md:gap-4">
              {books.length === 0 ? (
                <>There is no book here.</>
              ) : (
                books.reverse().map((book) => {
                  return (
                    <Link
                      href={`/books/${book.id}`}
                      key={book.id}
                      className="flex max-h-[320px] w-[200px] flex-col items-center justify-between gap-2 border border-gray-200 p-2 duration-300 ease-in hover:border-orange-800"
                    >
                      <div className="flex h-[150px] w-[110px] items-center justify-center p-2">
                        <Image
                          src={book.imageLink}
                          width={100}
                          height={100}
                          alt="book-img"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <h4 className="py-2  font-bold">{book.publisher}</h4>
                        <p className=" p-2 ">{book.title}</p>
                        <p className=" text-lg font-bold">€ {book.priceBeforeDiscount}</p>
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
