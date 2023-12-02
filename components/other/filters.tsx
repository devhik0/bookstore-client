"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Filters() {
  const [lang, setLang] = useState("");
  const [genre, setGenre] = useState("");

  return (
    <div className="">
      <form className="flex gap-4 flex-col justify-center">
        <div className="flex flex-col gap-2 justify-around  p-2">
          <h3>Filter by Genre</h3>
          <label
            className={`flex gap-2 justify-between ${genre === "Fiction" ? "bg-orange-800 p-2 text-gray-100" : ""}`}
          >
            <input
              type="radio"
              checked={genre === "Fiction"}
              onChange={(e) => setGenre(e.target.value)}
              value={"Fiction"}
            />
            Fiction
          </label>
          <label className={`flex gap-2 justify-between ${genre === "Drama" && "bg-orange-800 p-2 text-gray-100"}`}>
            <input
              type="radio"
              checked={genre === "Drama"}
              onChange={(e) => setGenre(e.target.value)}
              value={"Drama"}
            />
            Drama
          </label>
          <label className={`flex gap-2 justify-between ${genre === "Adventure" && "bg-orange-800 p-2 text-gray-100"}`}>
            <input
              type="radio"
              checked={genre === "Adventure"}
              onChange={(e) => setGenre(e.target.value)}
              value={"Adventure"}
            />
            Adventure
          </label>
        </div>

        <div className="flex flex-col gap-2 justify-around  p-2">
          <h3>Filter by Language</h3>
          <label
            className={`flex gap-2 justify-between ${lang === "ENGLISH" ? "bg-orange-800 p-2 text-gray-100" : ""}`}
          >
            <input
              type="radio"
              checked={lang === "ENGLISH"}
              onChange={(e) => setLang(e.target.value)}
              value={"ENGLISH"}
            />
            ENGLISH{" "}
          </label>
          <label
            className={`flex gap-2 justify-between ${lang === "ROMANIAN" ? "bg-orange-800 p-2 text-gray-100" : ""}`}
          >
            <input
              type="radio"
              checked={lang === "ROMANIAN"}
              onChange={(e) => setLang(e.target.value)}
              value={"ROMANIAN"}
            />
            ROMANIAN{" "}
          </label>
        </div>
        <Link href={`/books?genre=${genre}&language=${lang}`}>
          <Button type="submit" className="w-full bg-orange-800">
            Filter
          </Button>
        </Link>
        <Link href={`/books`}>
          <Button type="submit" variant={"destructive"} className="w-full">
            Clear Filters
          </Button>
        </Link>
      </form>
    </div>
  );
}
