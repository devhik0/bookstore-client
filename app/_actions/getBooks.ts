"use server";

import { BASE_URL } from "@/lib/constants";
import { Books, SearchParams } from "@/lib/types";

export const getBooks = async ({ searchString, genre, language }: SearchParams) => {
  if (searchString) {
    const data = await fetch(`${BASE_URL}/books?searchString=${searchString}`);
    return (await data.json()) as Books;
  } else {
    if (genre && language) {
      const data = await fetch(`${BASE_URL}/books?genre=${genre}&language=${language}`);
      return (await data.json()) as Books;
    }
    if (genre && !language) {
      const data = await fetch(`${BASE_URL}/books?genre=${genre}`);
      return (await data.json()) as Books;
    } else if (!genre && language) {
      const data = await fetch(`${BASE_URL}/books?language=${language}`);
      return (await data.json()) as Books;
    } else {
      const data = await fetch(`${BASE_URL}/books`);
      return (await data.json()) as Books;
    }
  }
};
