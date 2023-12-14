"use client";

import { Genre } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../components/ui/button";

export default function Filters({ genres }: { genres: Genre[] }) {
  const [lang, setLang] = useState("");
  const [genre, setGenre] = useState("");

  return (
    <div>
      <form className="flex flex-col justify-center gap-4">
        <div className="flex flex-col justify-around gap-2 p-2">
          <h3>Genre</h3>
          {/* //todo: genres.map */}
          {genres.map((g) => (
            <label
              key={g.id}
              className={`flex justify-between gap-2 ${g.genre === genre ? "bg-accent p-1 text-gray-100" : ""}`}
            >
              <input
                type="radio"
                checked={g.genre === genre}
                onChange={(e) => setGenre(e.target.value)}
                value={g.genre}
              />
              {g.genre}
            </label>
          ))}
        </div>

        <div className="flex flex-col justify-around gap-2  p-2">
          <h3>Language</h3>
          <label className={`flex justify-between gap-2 ${lang === "ENGLISH" ? "bg-accent p-2 text-gray-100" : ""}`}>
            <input
              type="radio"
              checked={lang === "ENGLISH"}
              onChange={(e) => setLang(e.target.value)}
              value={"ENGLISH"}
            />
            English{" "}
          </label>
          <label className={`flex justify-between gap-2 ${lang === "ROMANIAN" ? "bg-accent p-2 text-gray-100" : ""}`}>
            <input
              type="radio"
              checked={lang === "ROMANIAN"}
              onChange={(e) => setLang(e.target.value)}
              value={"ROMANIAN"}
            />
            Romanian{" "}
          </label>
          <label className={`flex justify-between gap-2 ${lang === "SPANISH" ? "bg-accent p-2 text-gray-100" : ""}`}>
            <input
              type="radio"
              checked={lang === "SPANISH"}
              onChange={(e) => setLang(e.target.value)}
              value={"SPANISH"}
            />
            Spanish{" "}
          </label>
        </div>
        <Link href={`/books?genre=${genre}&language=${lang}`}>
          <Button type="submit" className="bg-accent w-full text-xs md:text-[1rem]">
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
