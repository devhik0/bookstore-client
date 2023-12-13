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
      <form className="flex gap-4 flex-col justify-center">
        <div className="flex flex-col gap-2 justify-around p-2">
          <h3>Genre</h3>
          {/* //todo: genres.map */}
          {genres.map((g) => (
            <label
              key={g.id}
              className={`flex gap-2 justify-between ${g.genre === genre ? "bg-accent p-1 text-gray-100" : ""}`}
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

        <div className="flex flex-col gap-2 justify-around  p-2">
          <h3>Language</h3>
          <label className={`flex gap-2 justify-between ${lang === "ENGLISH" ? "bg-accent p-2 text-gray-100" : ""}`}>
            <input
              type="radio"
              checked={lang === "ENGLISH"}
              onChange={(e) => setLang(e.target.value)}
              value={"ENGLISH"}
            />
            English{" "}
          </label>
          <label className={`flex gap-2 justify-between ${lang === "ROMANIAN" ? "bg-accent p-2 text-gray-100" : ""}`}>
            <input
              type="radio"
              checked={lang === "ROMANIAN"}
              onChange={(e) => setLang(e.target.value)}
              value={"ROMANIAN"}
            />
            Romanian{" "}
          </label>
          <label className={`flex gap-2 justify-between ${lang === "SPANISH" ? "bg-accent p-2 text-gray-100" : ""}`}>
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
