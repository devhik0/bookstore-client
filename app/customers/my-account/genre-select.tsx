import { Genre } from "@/lib/types";

export default function GenreSelect({
  genres,
} // genre,
// setGenre,
// children,
: {
  genres: Genre[];
  // genre: Genre;
  // setGenre: Dispatch<SetStateAction<string>>;
  // children: ReactNode;
}) {
  return (
    <select
      name="genre"
      className="col-span-3 rounded-sm p-1"
      required
      // value={genre.genre}
      // onChange={(e) => setGenre(e.target.value as Genre["genre"])}
    >
      {genres.map((genre) => (
        <option key={genre.id} value={genre.genre}>
          {genre.genre}
        </option>
      ))}
    </select>
  );
}
