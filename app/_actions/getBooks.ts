import { Books, SearchParams } from "@/lib/types";

export const getBooks = async (params: SearchParams) => {
  if (params.searchString) {
    const data = await fetch(`http://localhost:8080/api/books?searchString=${params.searchString}`);
    return (await data.json()) as Books;
  } else {
    if (params.genre && params.language) {
      const data = await fetch(`http://localhost:8080/api/books?genre=${params.genre}&language=${params.language}`);
      return (await data.json()) as Books;
    }
    if (params.genre && !params.language) {
      const data = await fetch(`http://localhost:8080/api/books?genre=${params.genre}`);
      return (await data.json()) as Books;
    } else if (!params.genre && params.language) {
      const data = await fetch(`http://localhost:8080/api/books?language=${params.language}`);
      return (await data.json()) as Books;
    } else {
      const data = await fetch(`http://localhost:8080/api/books`);
      return (await data.json()) as Books;
    }
  }
};
