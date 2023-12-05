import { BASE_URL } from "@/lib/constants";
import { Book } from "@/lib/types";

export type BookDetails = Book & { authorNameList: string[]; genreTagList: string[] };

export const getBook = async (params: { id: number }) => {
  const data = await fetch(`${BASE_URL}/books/${params.id}`);
  const book = (await data.json()) as BookDetails;
  return book;
};
