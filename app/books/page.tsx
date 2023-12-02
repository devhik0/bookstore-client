import Filters from "@/components/other/filters";
import SearchBooks from "@/components/other/search-books";
import Sorts from "@/components/other/sorts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Books } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type SearchParams = { searchString: string; genre: string; language: string };

const getBooks = async (params: SearchParams) => {
  if (params.searchString) {
    const data = await fetch(`http://localhost:8080/api/books?searchString=${params.searchString}`);
    return (await data.json()) as Books;
  } else {
    if (params.genre && params.language) {
      const data = await fetch(`http://localhost:8080/api/books?genre=${params.genre}&language=${params.language}`);
      return (await data.json()) as Books;
    }
    if (params.genre && !params.language) {
      const data = await fetch(`http://localhost:8080/api/books?genre=${params.genre}`);
      return (await data.json()) as Books;
    } else if (!params.genre && params.language) {
      const data = await fetch(`http://localhost:8080/api/books?language=${params.language}`);
      return (await data.json()) as Books;
    } else {
      const data = await fetch(`http://localhost:8080/api/books`);
      return (await data.json()) as Books;
    }
  }
};

export default async function Books({ searchParams }: { searchParams: SearchParams }) {
  const books = (await getBooks(searchParams)) as Books;

  // console.log("DATA: ", books);
  // console.log("lang: ", searchParams.language);

  return (
    <div className="w-full h-[100vh] text-center">
      <div className="flex gap-2">
        <div className="w-[20vw] h-[80vh] ">
          <Filters />
        </div>
        <div className="w-[79vw] ">
          <div className="flex flex-col mt-1 mx-2 w-[97%]">
            <div className="flex justify-end m-2 gap-4">
              <SearchBooks />
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
                        <CardFooter className="flex gap-2">
                          <Link href={`books/${book.id}`}>
                            <Button className="bg-orange-800" size={"sm"}>
                              View Details
                            </Button>
                          </Link>
                          <Link href={`/cart`}>
                            <Button className="bg-orange-800" size={"sm"}>
                              Add to Cart
                            </Button>
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
