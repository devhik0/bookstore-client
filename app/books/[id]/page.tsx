import { Button } from "@/components/ui/button";
import { Book } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export type BookDetails = Book & { authorNameList: string[]; genreTagList: string[] };

export default async function Book({ params }: { params: { id: number } }) {
  const data = await fetch(`http://localhost:8080/api/books/${params.id}`);
  const book = (await data.json()) as BookDetails;

  const discountAmount = (book.priceBeforeDiscount * book.discountPercent) / 100;
  const discountedPrice = book.priceBeforeDiscount - discountAmount;

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
      <Link href={`/cart`} className="mt-2">
        <Button className="bg-orange-800">Add to Cart</Button>
      </Link>
    </div>
  );
}
