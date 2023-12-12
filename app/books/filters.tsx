"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../../components/ui/button";

export default function Filters() {
  const [lang, setLang] = useState("");
  const [genre, setGenre] = useState("");

  return (
    <div>
      <form className="flex gap-4 flex-col justify-center">
        <div className="flex flex-col gap-2 justify-around p-2">
          <h3>Genre</h3>
          <label className={`flex gap-2 justify-between ${genre === "Fiction" ? "bg-accent p-2 text-gray-100" : ""}`}>
            <input
              type="radio"
              checked={genre === "Fiction"}
              onChange={(e) => setGenre(e.target.value)}
              value={"Fiction"}
            />
            Fiction
          </label>
          <label className={`flex gap-2 justify-between ${genre === "Drama" && "bg-accent p-2 text-gray-100"}`}>
            <input
              type="radio"
              checked={genre === "Drama"}
              onChange={(e) => setGenre(e.target.value)}
              value={"Drama"}
            />
            Drama
          </label>
          <label className={`flex gap-2 justify-between ${genre === "Adventure" && "bg-accent p-2 text-gray-100"}`}>
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
          <h3>Language</h3>
          <label className={`flex gap-2 justify-between ${lang === "ENGLISH" ? "bg-accent p-2 text-gray-100" : ""}`}>
            <input
              type="radio"
              checked={lang === "ENGLISH"}
              onChange={(e) => setLang(e.target.value)}
              value={"ENGLISH"}
            />
            ENGLISH{" "}
          </label>
          <label className={`flex gap-2 justify-between ${lang === "ROMANIAN" ? "bg-accent p-2 text-gray-100" : ""}`}>
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
          <Button type="submit" className="w-full bg-accent text-xs md:text-[1rem]">
            Filter
          </Button>
        </Link>
        <Link href={`/books`}>
          <Button type="submit" variant={"destructive"} className="w-full text-xs md:text-[1rem]">
            Clear Filters
          </Button>
        </Link>
      </form>
    </div>
  );
}
