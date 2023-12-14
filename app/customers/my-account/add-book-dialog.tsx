import { uploadBook } from "@/app/_actions/uploadBook";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Genre } from "@/lib/types";
import { Plus } from "lucide-react";

export default async function AddBookDialog({ genres }: { genres: Genre[] }) {
  return (
    <div className="mr-2 flex justify-end text-sm">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600" size={"sm"}>
            <Plus size={"1rem"} className="" />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[93vh] bg-blue-300">
          <h3 className="m-0 p-0">Add Book</h3>
          <form action={uploadBook} className="m-0 grid gap-2 p-1 text-sm">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title:
              </label>
              <input name="title" className="col-span-3 rounded-sm p-1" placeholder="Title" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Description:
              </label>
              <textarea
                name="description"
                className="col-span-3 rounded-sm p-1"
                rows={1}
                cols={10}
                placeholder="Book desc."
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Price:
              </label>
              <input
                type="number"
                name="price"
                max={100}
                className="col-span-3 rounded-sm p-1"
                placeholder="€ 12.33"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Discount:
              </label>
              <input
                type="number"
                name="discount"
                max={60}
                min={5}
                className="col-span-3 rounded-sm p-1"
                placeholder="% 60"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Language:
              </label>
              <select name="language" className="col-span-3 rounded-sm p-1" placeholder="% 60" required>
                <option value={"ENGLISH"}>English</option>
                <option value={"ROMANIAN"}>Romanian</option>
                <option value={"SPANISH"}>Spanish</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Page number:
              </label>
              <input
                type="number"
                name="numPages"
                max={1000}
                className="col-span-3 rounded-sm p-1"
                placeholder="300"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Publisher:
              </label>
              <input
                type="text"
                name="publisher"
                className="col-span-3 rounded-sm p-1"
                placeholder="X Publishing"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Year Published:
              </label>
              <input
                type="number"
                name="yearPublished"
                className="col-span-3 rounded-sm p-1"
                max={2023}
                min={1950}
                placeholder="2023"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Available Copies:
              </label>
              <input
                type="number"
                name="copiesAvailable"
                className="col-span-3 rounded-sm p-1"
                placeholder="500"
                min={1}
                max={1000}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Author:
              </label>
              <input type="text" name="author" className="col-span-3 rounded-sm p-1" placeholder="Dan Brown" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Genre:
              </label>
              <select name="genre" className="col-span-3 rounded-sm p-1" required>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.genre}>
                    {genre.genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Image (Optional):
              </label>
              <input type="file" name="file" className="col-span-3 rounded-sm p-1" placeholder="img.jpg" />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600" size={"sm"}>
                Add Book
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
