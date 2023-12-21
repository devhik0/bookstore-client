import { getBook } from "@/app/_actions/getBook";
import { getCustomer } from "@/app/_actions/getCustomer";
import CartSheet from "@/app/_components/cart-sheet";
import RecommCard from "@/app/customers/my-account/recomm-card";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Book({ params }: { params: { id: number } }) {
  const book = await getBook(params);

  const discountAmount = (book.priceBeforeDiscount * book.discountPercent) / 100;
  const discountedPrice = book.priceBeforeDiscount - discountAmount;

  const isLogged = cookies().get("auth_token")?.value as string;

  const customer = await getCustomer();

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
          <div className="w-[10%] bg-gray-600">
            <CartSheet isLogged={isLogged} />
          </div>
        )}
      </div>
      {isLogged && (
        <div className="w-[90%]">
          <RecommCard isLogged={isLogged} />
        </div>
      )}
    </div>
  );
}
