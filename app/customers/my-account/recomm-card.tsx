import { getRecommendations } from "@/app/_actions/getRecommendations";
import { Book } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function RecommCard({ isLogged }: { isLogged: string }) {
  const recommendations = (await getRecommendations()) as Book[];

  return (
    <div className="m-2">
      <h3 className="ml-2 text-lg font-bold">Recommendations</h3>
      <div>
        {recommendations && recommendations.length === 0 ? (
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
          recommendations &&
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
                  <div className="flex flex-row items-center gap-2">
                    <Link href={`/books/${recBook.id}`}>
                      <div className="my-4 flex flex-row items-center gap-2">
                        <p>{recBook.title}</p>
                        <span className="line-through">€ {recBook.priceBeforeDiscount}</span>
                        <span className="text-red-500"> -%{recBook.discountPercent}</span> <br />
                        <span className="">€ {discountedPriceRec.toPrecision(4)}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
            .reverse()
        )}
      </div>
    </div>
  );
}
