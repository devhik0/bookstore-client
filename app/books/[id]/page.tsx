import { getBook } from "@/app/_actions/getBook";
import { getCustomer } from "@/app/_actions/getCustomer";
import CartSheet from "@/app/_components/cart-sheet";
import RecommCard from "@/app/customers/my-account/recomm-card";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Book({ params }: { params: { id: number } }) {
  const book = await getBook(params);

  const discountAmount = (book.priceBeforeDiscount * book.discountPercent) / 100;
  const discountedPrice = book.priceBeforeDiscount - discountAmount;

  const isLogged = cookies().get("auth_token")?.value as string;

  const customer = await getCustomer();

  const addToCart = async (formData: FormData) => {
    "use server";

    return formData;
  };

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
        {customer.role !== "ROLE_STAFF" && (
          <form action={addToCart} className="flex flex-row items-center gap-2">
            <div className="bg-accent ml-2 flex w-[20%] flex-row items-center rounded-lg px-2">
              <Button variant={"ghost"}>Add to Cart</Button>
              <CartSheet isLogged={isLogged} />
            </div>
            <div className="border border-gray-200 p-2">
              <input type="hidden" value={book.id} name="id" />
              <label className="flex flex-row gap-2">
                Quantity:
                <input type="number" name="qty" className="w-[20%] border border-orange-800" min={1} />
              </label>
            </div>
          </form>
        )}
      </div>
      {isLogged && (
        <div className="w-[40%]">
          <RecommCard isLogged={isLogged} />
        </div>
      )}
    </div>
  );
}
