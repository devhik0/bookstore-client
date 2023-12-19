import { getBook } from "@/app/_actions/getBook";
import { getRecommendations } from "@/app/_actions/getRecommendations";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Book } from "@/lib/types";
import { XIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Book({ params }: { params: { id: number } }) {
  const book = await getBook(params);

  const recommendations = (await getRecommendations()) as Book[];

  const discountAmount = (book.priceBeforeDiscount * book.discountPercent) / 100;
  const discountedPrice = book.priceBeforeDiscount - discountAmount;

  const isLogged = cookies().get("auth_token")?.value;

  return (
    <div className="flex flex-row gap-4">
      <div>
        <Image src={book.imageLink} alt="book-img" width={1000} height={100} className="h-[30%] w-[20%]" />
        <h3 className="mt-2 text-lg">{book.title}</h3>
        <div className="py-2">
          {book.authorNameList.map((author, idx) => (
            <span className="" key={idx}>
              {author}
            </span>
          ))}
        </div>
        <div className="pt-2">
          {book.genreTagList.map((genre, idx) => (
            <span className="mr-1 rounded-lg bg-gray-100 p-2" key={idx}>
              {genre}
            </span>
          ))}
        </div>
        <div className="mt-4 flex w-full flex-col md:w-[10%]">
          <p className="">{book.publisher}</p>
          <p className="">{book.yearPublished}</p> <br />
          <p className="">{book.language}</p> <br />
          <p className="">{book.numPages} Pages</p> <br />
        </div>
        <p className="mt-2 ">{book.description}</p>
        <div className="my-4 flex flex-row items-center gap-2">
          <span className="line-through">€ {book.priceBeforeDiscount.toPrecision(4)}</span>
          <span className="text-red-500"> -%{book.discountPercent}</span> <br />
          <span className="">€ {discountedPrice.toPrecision(4)}</span>
          <span className="">{book.copiesAvailable} Copies</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-accent w-full md:w-[20%]">Add to cart</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              {isLogged ? (
                <SheetDescription>
                  <div className="h-[80vh]">
                    <div className="h-full overflow-y-scroll">
                      <div className=" flex items-center justify-between gap-4">
                        <div className="flex w-full flex-col">
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
                              className="my-1 flex w-full flex-row items-center justify-between gap-2 border-b border-b-gray-200 p-2 hover:bg-orange-200"
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
              <Button className="bg-accent absolute bottom-2 right-4 w-[90%]">Order Now</Button>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
      {isLogged && (
        <div className="m-2 ">
          <h3 className="ml-2 text-lg font-bold">Recommendations</h3>
          <div>
            {recommendations.length === 0 ? (
              <div className="ml-2">
                There is no recommendations for this book. Those will be shown here after you buy some books.
                {!isLogged && (
                  <>
                    Please{" "}
                    <Link href={"/login"} className="text-blue-400 underline">
                      login
                    </Link>{" "}
                    to see.
                  </>
                )}
              </div>
            ) : (
              recommendations
                .map((recBook) => {
                  const discountAmountRec = (recBook.priceBeforeDiscount * recBook.discountPercent) / 100;
                  const discountedPriceRec = recBook.priceBeforeDiscount - discountAmountRec;
                  return (
                    <div
                      key={recBook.id}
                      className="m-2 flex flex-row items-center justify-between gap-4 rounded-lg border border-gray-200 pr-2"
                    >
                      <Image src={recBook.imageLink} width={60} height={60} alt="book-img" />
                      <Link href={`/books/${recBook.id}`}>
                        <div className="my-4 flex flex-row items-center gap-2">
                          <p>{recBook.title}</p>
                          <span className="line-through">€ {recBook.priceBeforeDiscount}</span>
                          <span className="text-red-500"> -%{recBook.discountPercent}</span> <br />
                          <span className="">€ {discountedPriceRec.toPrecision(4)}</span>
                        </div>
                      </Link>
                      <div className="flex flex-row items-center gap-2"></div>
                    </div>
                  );
                })
                .reverse()
            )}
          </div>
        </div>
      )}
    </div>
  );
}
