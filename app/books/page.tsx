import SearchBooks from "@/components/other/search-books";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Books } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// TODO: Add filters to sidebar with checkboxes

export default async function Books({ searchParams }: { searchParams: { query: string } }) {
  const data = await fetch(
    searchParams.query
      ? `http://localhost:8080/api/books?title=${searchParams.query}`
      : `http://localhost:8080/api/books`
  );
  const books = (await data.json()) as Books;

  return (
    <div className="w-full h-[100vh] text-center">
      <h2 className="text-xl text-center mt-2">Books</h2>
      <div className="flex gap-2">
        <div className="w-[25vw] h-[80vh] border border-green-400">
          Sidebar
          {/* //todo: Add filters (use client) */}
          <form>
            <h3>Filter by Genre</h3>
            <input
              type="checkbox"
              // checked={checked} onChange={onChangeCheck}
            />
            <label>Fiction</label>
            <input type="checkbox" />
            <label>Fiction</label>
            <input type="checkbox" />
            <label>Fiction</label>
          </form>
          <form>
            <h3>Filter by Language</h3>
            <input type="checkbox" />
            <label>English</label>
            <input type="checkbox" />
            <label>Romanian</label>
          </form>
        </div>
        <div className="w-[73vw] border border-green-400">
          <h2 className="text-xl">Books</h2>

          <div className="flex flex-col mt-1 mx-2 w-[97%]">
            <div className="flex justify-end m-2 gap-2">
              {/* //todo: Add combobox here */}
              <SearchBooks />
              <div className="flex gap-2 items-center">
                <span>Sort by</span>
                <select className="p-2">
                  <option>Alphabetical</option>
                  <option>Price low</option>
                  <option>New to old</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {searchParams.query
                ? books
                    .filter((book) => book.title.includes(searchParams.query))
                    .map((book) => {
                      return (
                        <div key={book.id} className="border border-red-400 my-2">
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
                : books.map((book) => {
                    return (
                      <div key={book.id} className="border border-red-400 my-2">
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
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
