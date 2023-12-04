import { Book } from "@/lib/types";

export type BookDetails = Book & { authorNameList: string[]; genreTagList: string[] };

export const getBook = async (params: { id: number }) => {
  const data = await fetch(`http://localhost:8080/api/books/${params.id}`);
  const book = (await data.json()) as BookDetails;
  return book;
};
