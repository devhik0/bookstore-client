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
        <Image src={book.imageLink} alt="book-img" width={1000} height={100} className="w-[20%] h-[30%]" />
        <h3 className="text-lg mt-2">{book.title}</h3>
        <div className="py-2">
          {book.authorNameList.map((author, idx) => (
            <span className="" key={idx}>
              {author}
            </span>
          ))}
        </div>
        <div className="pt-2">
          {book.genreTagList.map((genre, idx) => (
            <span className="bg-gray-100 rounded-lg p-2 mr-1" key={idx}>
              {genre}
            </span>
          ))}
        </div>
        <div className="flex flex-col w-full md:w-[10%] mt-4">
          <p className="">{book.publisher}</p>
          <p className="">{book.yearPublished}</p> <br />
          <p className="">{book.language}</p> <br />
          <p className="">{book.numPages} Pages</p> <br />
        </div>
        <p className="mt-2 ">{book.description}</p>
        <div className="flex flex-row gap-2 items-center my-4">
          <span className="line-through">€ {book.priceBeforeDiscount}</span>
          <span className="text-red-500"> -%{book.discountPercent}</span> <br />
          <span className="">€ {discountedPrice}</span>
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
      <div>
        <h3 className="text-lg font-bold">Recommendations</h3>
        <div>
          {recommendations.length === 0 ? (
            <>There is no recommendations for this book.</>
          ) : (
            recommendations
              .map((book) => (
                <div
                  key={book.id}
                  className="flex flex-row gap-4 justify-between items-center border border-gray-200 rounded-lg pr-2 m-2"
                >
                  <Image src={book.imageLink} width={40} height={40} alt="book-img" />
                  <div className="flex justify-between items-center w-full">
                    <p>{book.title}</p>
                    <p>€{book.priceBeforeDiscount}</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    {/* <Dialog>
                      <DialogTrigger asChild>
                        <Button className="text-xs bg-orange-600" size={"sm"}>
                          <Pencil size={"1rem"} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="text-xs bg-blue-600" size={"sm"}>
                          <Upload size={"1rem"} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Cover</DialogTitle>
                          <DialogDescription>Please upload a image to set book cover</DialogDescription>
                        </DialogHeader>
                        <form
                          action={addCover}
                          className="border border-gray-400 p-4 flex justify-between items-center"
                        >
                          <input type="hidden" name="id" value={book.id} />
                          <input type="file" name="file" />
                          <Button type="submit" className="bg-blue-600">
                            Add Cover
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="text-xs" variant={"destructive"} size={"sm"}>
                          <Trash2 size={"1rem"} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete this book and remove it from our
                            servers.
                          </DialogDescription>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant={"secondary"}>Cancel</Button>
                            </DialogClose>
                            <form action={deleteBook.bind(null, book.id)}>
                              <Button variant={"destructive"}>Delete</Button>
                            </form>
                          </DialogFooter>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog> */}
                  </div>
                </div>
              ))
              .reverse()
          )}
        </div>
      </div>
    </div>
  );
}
