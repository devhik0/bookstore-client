"use server";

import { BASE_URL } from "@/lib/constants";

export const getGenres = async () => {
  const data = await fetch(`${BASE_URL}/genre-tags`);
  const genres = await data.json();
  return genres;
};
