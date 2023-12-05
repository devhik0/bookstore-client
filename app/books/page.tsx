import Search from "@/app/_components/search";
import Filters from "@/app/books/filters";
import Sorts from "@/app/books/sorts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Books, SearchParams } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { getBooks } from "../_actions/getBooks";

export default async function Books({ searchParams }: { searchParams: SearchParams }) {
  const books = (await getBooks(searchParams)) as Books;

  return (
    <div className="w-full h-[100vh] text-center">
      <div className="flex gap-2">
        <div className="w-[20vw] h-[80vh] ">
          <Filters />
        </div>
        <div className="w-[79vw] ">
          <div className="flex flex-col mt-1 mx-2 w-[97%]">
            <div className="flex justify-end m-2 gap-4">
              <Search where="books" />
              <Sorts />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {books.length === 0 ? (
                <>There is no book here.</>
              ) : (
                books.map((book) => {
                  return (
                    <div key={book.id} className="my-2">
                      <Card>
                        <Image
                          src={book.imageLink}
                          width={230}
                          height={210}
                          alt="book-img"
                          className="object-fit h-[250px]"
                        />
                        <CardHeader>
                          <CardTitle>{book.title}</CardTitle>
                          <span>{book.authorNameList}</span>
                          <div className="flex gap-2 justify-between">
                            <span>{book.genreTagList}</span>
                            <span>{book.language}</span>
                          </div>
                          <CardDescription>{book.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="font-bold text-xl">{book.priceBeforeDiscount} €</p>
                        </CardContent>
                        <CardFooter>
                          <Link href={`books/${book.id}`} className="w-full">
                            <Button className="bg-orange-800 w-full">View Details</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </div>
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
