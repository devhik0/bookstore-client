import { deleteCustomer } from "@/app/_actions/deleteCustomer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Customer } from "@/lib/types";
import { Trash2 } from "lucide-react";

export default async function DeleteCustomerDialog({ customer }: { customer: Customer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs" variant={"destructive"} size={"sm"}>
          <Trash2 size={"1rem"} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this user and remove it from our servers.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <form action={deleteCustomer.bind(null, customer.id)}>
              <Button variant={"destructive"}>Delete</Button>
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
