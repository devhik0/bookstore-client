import { BASE_URL } from "@/lib/constants";
import { Book } from "@/lib/types";
import { unstable_noStore } from "next/cache";

export type BookDetails = Book & { authorNameList: string[]; genreTagList: string[] };

export const getBook = async (params: { id: number }) => {
  unstable_noStore();

  console.log("book id: ", params.id);

  const data = await fetch(`${BASE_URL}/books/${params.id}`);
  const book = (await data.json()) as BookDetails;
  return book;
};
