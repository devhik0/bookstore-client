"use client";

import { editBook } from "@/app/_actions/editBook";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Book, BookForm } from "@/lib/types";
import { Pencil } from "lucide-react";
import { ReactNode, useState } from "react";

export default function EditBookDialog({ book, children }: { book: BookForm; children: ReactNode }) {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.priceBeforeDiscount);
  const [discount, setDiscount] = useState(book.discountPercent);
  const [language, setLanguage] = useState(book.language);
  const [numPage, setNumPage] = useState(book.numPages);
  const [publisher, setPublisher] = useState(book.publisher);
  const [pubYear, setPubYear] = useState(book.yearPublished);
  const [copies, setCopies] = useState(book.copiesAvailable);
  const [author, setAuthor] = useState(book.authorNameList);
  // const [genre, setGenre] = useState(book.genreTagList);

  return (
    <div className="flex flex-row items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-orange-600 text-xs" size={"sm"}>
            {/* //todo: Add Edit book feature */}
            <Pencil size={"1rem"} />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[93vh] bg-orange-300 ">
          <h3>Edit book</h3>
          <form action={editBook} className="m-1 grid gap-1 p-1 text-sm">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title:
              </label>
              <input type="hidden" name="id" value={book.id} />
              <input
                name="title"
                className="col-span-3 rounded-sm p-1"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value as string)}
              />
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
                value={description}
                onChange={(e) => setDescription(e.target.value as string)}
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
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
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
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Language:
              </label>
              <select
                name="language"
                className="col-span-3 rounded-sm p-1"
                placeholder="% 60"
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value as Book["language"])}
              >
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
                value={numPage}
                onChange={(e) => setNumPage(Number(e.target.value))}
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
                value={publisher}
                onChange={(e) => setPublisher(e.target.value as string)}
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
                value={pubYear}
                onChange={(e) => setPubYear(Number(e.target.value))}
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
                value={copies}
                onChange={(e) => setCopies(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Author:
              </label>
              <input
                type="text"
                name="author"
                className="col-span-3 rounded-sm p-1"
                placeholder="Dan Brown"
                required
                value={author}
                onChange={(e) => setAuthor([e.target.value])}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Genre:
              </label>
              {children}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="desc" className="text-right">
                Image (Optional):
              </label>
              <input type="file" name="file" className="col-span-3 rounded-sm p-1" placeholder="img.jpg" />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-orange-600" size={"sm"}>
                Edit Book
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
