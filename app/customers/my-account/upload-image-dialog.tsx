import { addCover } from "@/app/_actions/addCover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Book } from "@/lib/types";
import { Upload } from "lucide-react";

export default async function UploadImageDialog({ book }: { book: Book }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 text-xs" size={"sm"}>
          <Upload size={"1rem"} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Cover</DialogTitle>
          <DialogDescription>Please upload a image to set book cover</DialogDescription>
        </DialogHeader>
        <form action={addCover} className="flex items-center justify-between border border-green-400 p-4">
          <input type="hidden" name="id" value={book.id} />
          <input type="file" name="file" />
          <Button type="submit" className="bg-green-600">
            Add Cover
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
