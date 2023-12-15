"use server";

import { BASE_URL } from "@/lib/constants";
import { Books, SearchParams } from "@/lib/types";
import { unstable_noStore } from "next/cache";

export const getBooks = async ({ searchString, genre, language }: SearchParams) => {
  unstable_noStore();

  if (searchString && !genre && !language) {
    const data = await fetch(`${BASE_URL}/books?searchString=${searchString}`);
    return (await data.json()) as Books;
  } else if (searchString && genre && !language) {
    const data = await fetch(`${BASE_URL}/books?searchString=${searchString}&genre=${genre}`);
    return (await data.json()) as Books;
  } else if (searchString && genre && language) {
    const data = await fetch(`${BASE_URL}/books?searchString=${searchString}&genre=${genre}&language=${language}`);
    return (await data.json()) as Books;
  } else if (genre && !searchString && !language) {
    const data = await fetch(`${BASE_URL}/books?genre=${genre}`);
    return (await data.json()) as Books;
  } else if (genre && language && !searchString) {
    const data = await fetch(`${BASE_URL}/books?genre=${genre}&language=${language}`);
    return (await data.json()) as Books;
  } else if (language && !genre && !searchString) {
    const data = await fetch(`${BASE_URL}/books?language=${language}`);
    return (await data.json()) as Books;
  } else if (language && searchString && !genre) {
    const data = await fetch(`${BASE_URL}/books?searchString=${searchString}&language=${language}`);
    return (await data.json()) as Books;
  } else {
    const data = await fetch(`${BASE_URL}/books`);
    return (await data.json()) as Books;
  }

  // if (searchString) {
  //   const datas = await fetch(`${BASE_URL}/books?searchString=${searchString}`);
  //   if (genre) {
  //     const datag = await fetch(`${BASE_URL}/books?searchString=${searchString}&genre=${genre}`);
  //     if (language) {
  //       const datal = await fetch(`${BASE_URL}/books?searchString=${searchString}&genre=${genre}&language=${language}`);
  //       return (await datal.json()) as Books;
  //     } else {
  //       return (await datag.json()) as Books;
  //     }
  //   } else {
  //     return (await datas.json()) as Books;
  //   }
  // }
  // else if (genre) {
  //   const datage = await fetch(`${BASE_URL}/books?searchString=${searchString}&genre=${genre}`);
  //   if () {}
  //   else {

  //     const data = await fetch(`${BASE_URL}/books`);
  //     return (await data.json()) as Books;
  //   }
  // }

  // if (searchString) {
  //   const data = await fetch(`${BASE_URL}/books?searchString=${searchString}`);
  //   return (await data.json()) as Books;
  // } else if (searchString && genre) {
  //   const data = await fetch(`${BASE_URL}/books?searchString=${searchString}&genre=${genre}&language=${language}`);
  //   return (await data.json()) as Books;
  // } else if (searchString && genre && language) {
  //   const data = await fetch(`${BASE_URL}/books?searchString=${searchString}&genre=${genre}`);
  //   return (await data.json()) as Books;
  // }
  // // else if (searchString && !genre && language) {
  // //   const data = await fetch(`${BASE_URL}/books?searchString=${searchString}&language=${language}`);
  // //   return (await data.json()) as Books;
  // // }
};
