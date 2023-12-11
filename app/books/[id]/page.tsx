import { getBook } from "@/app/_actions/getBook";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Book({ params }: { params: { id: number } }) {
  const book = await getBook(params);

  const discountAmount = (book.priceBeforeDiscount * book.discountPercent) / 100;
  const discountedPrice = book.priceBeforeDiscount - discountAmount;

  const isLogged = cookies().get("auth_token")?.value;

  return (
    <div className="p-4 border border-orange-900 m-4">
      <h3 className="text-2xl">Book Details</h3>
      <div className="p-4">
        <Image src={book.imageLink} alt="book-img" width={100} height={100} />
        <h3 className="text-lg">Title: {book.title}</h3>
        <div className="p-4">
          {book.authorNameList.map((author, idx) => (
            <span className="bg-green-200 p-2" key={idx}>
              {author}
            </span>
          ))}
        </div>
        <div className="p-4">
          {book.genreTagList.map((genre, idx) => (
            <span className="bg-purple-200 p-2" key={idx}>
              {genre}
            </span>
          ))}
        </div>
        <div className="flex gap-4 flex-col w-[10%]">
          <span className="bg-cyan-400 p-2">{book.publisher}</span>
          <span className="p-2 bg-gray-300">{book.yearPublished}</span> <br />
          <span className="p-2 bg-red-300">{book.language}</span> <br />
          <span className="p-2 bg-yellow-300">{book.numPages} Pages</span> <br />
        </div>
        <p className="m-4 p-4 bg-gray-200">{book.description}</p>
        <div className="flex flex-row gap-2 items-center my-4">
          <span className="line-through">$ {book.priceBeforeDiscount}</span>
          <span className="text-red-500"> -%{book.discountPercent}</span> <br />
          <span className="bg-lime-200 p-2">$ {discountedPrice}</span>
        </div>
        <span className="mt-4 p-2 border border-orange-800">{book.copiesAvailable} Copies</span>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-accent">Add to cart</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            {isLogged ? (
              <SheetDescription>
                <div className="h-[80vh]">
                  <div className="h-full overflow-y-scroll">
                    <div className=" flex gap-4 items-center justify-between">
                      <div className="flex flex-col w-full">
                        {[
                          { name: "Horizon Zero Dawn", qty: 5 },
                          { name: "Hunger Games", qty: 1 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                          { name: "Origin", qty: 3 },
                        ].map((item, ix) => (
                          <div
                            key={ix}
                            className="border-b border-b-gray-200 w-full flex flex-row gap-2 my-1 items-center p-2 justify-between hover:bg-orange-200"
                          >
                            <span className="m-2">
                              {item.name} x {item.qty}
                            </span>
                            <XIcon color="#f87171" className="mr-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetDescription>
            ) : (
              <>You need to login to see your cart.</>
            )}
          </SheetHeader>
          <Link href={`/cart`}>
            <Button className="w-[90%] absolute bottom-2 right-4 bg-accent">Order Now</Button>
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
}
