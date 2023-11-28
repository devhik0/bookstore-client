import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Books() {
  const data = await fetch("http://localhost:8080/api/books");
  const books = await data.json();

  return (
    <div className="w-full h-[100vh] text-center">
      <h2 className="text-xl text-center m-2">Books</h2>
      <div className="flex gap-4">
        <div className="w-[25vw] h-[80vh] border border-green-400">Sidebar</div>
        <div className="w-[73vw] border border-green-400">
          <h2 className="text-xl">Books</h2>

          <div className="flex flex-col mt-1 mx-2 w-[97%]">
            <div className="flex justify-end mr-12 mb-4 gap-2">
              {/* //todo: Add combobox here */}
              <span>Sort by</span>
              <select>
                <option>Alphabetical</option>
                <option>Price low</option>
                <option>New to old</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {books.map((book) => {
                return (
                  <div key={book.id}>
                    <Card>
                      <Image src={book.imageLink} width={280} height={30} alt="book-img" />
                      <CardHeader>
                        <CardTitle>Book Title {book.title}</CardTitle>
                        <CardDescription>Book Description {book.Description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Book Content</p>
                      </CardContent>
                      <CardFooter className="gap-4">
                        <Link href={`books/${book.id}`}>
                          <Button className="bg-orange-800">View Details</Button>
                        </Link>
                        <Link href={`/cart`}>
                          <Button className="bg-orange-800">Add to Cart</Button>
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
