"use client";

import { addCover } from "@/app/_actions/addCover";
import { deleteBook } from "@/app/_actions/deleteBook";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Customer, Order } from "@/lib/types";
import { Pencil, Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";

export default function AccountTabs({
  customer,
  orders,
  books,
  uploadBook,
  genres,
  customers,
}: {
  customer: Customer;
  orders: Order[];
  books: Book[];
  uploadBook: (formData: FormData) => Promise<void>;
  genres: { id: number; genre: string }[];
  customers: Customer[];
}) {
  // todo: Add edit book feature
  return (
    <Tabs defaultValue="books" className="w-full justify-center">
      <TabsList className="flex justify-center gap-2 mt-2 w-full bg-gray-100 p-4">
        <TabsTrigger value="orders" className="bg-gray-300 text-black p-2 rounded-lg">
          Orders
        </TabsTrigger>
        <TabsTrigger value="books" className="bg-gray-300 text-black p-2 rounded-lg">
          Books
        </TabsTrigger>
        <TabsTrigger value="customers" className="bg-gray-300 text-black p-2 rounded-lg">
          Customers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="books">
        <div className="flex justify-end mr-2 text-sm">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600">
                <Plus size={"1rem"} className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-100 h-[93vh]">
              <form action={uploadBook} className="grid gap-2 m-6 p-1 text-sm">
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
                  <input
                    type="text"
                    name="author"
                    className="col-span-3 rounded-sm p-1"
                    placeholder="Dan Brown"
                    required
                  />
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
        {books
          .map((book) => (
            <div
              key={book.id}
              className="flex flex-row gap-4 justify-between items-center border border-gray-200 rounded-lg pr-2 m-2"
            >
              <Image src={book.imageLink} width={40} height={40} alt="book-img" />
              <div className="flex justify-between items-center w-full">
                <p>{book.title}</p>
                <p>€{book.priceBeforeDiscount}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="text-xs bg-orange-600" size={"sm"}>
                      {/* //todo: Add Edit book feature */}
                      <Pencil size={"1rem"} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit book</DialogTitle>
                      <DialogDescription>Edit book form</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="text-xs bg-blue-600" size={"sm"}>
                      <Upload size={"1rem"} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Cover</DialogTitle>
                      <DialogDescription>Please upload a image to set book cover</DialogDescription>
                    </DialogHeader>
                    <form action={addCover} className="border border-gray-400 p-4 flex justify-between items-center">
                      <input type="hidden" name="id" value={book.id} />
                      <input type="file" name="file" />
                      <Button type="submit" className="bg-blue-600">
                        Add Cover
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
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
                        This action cannot be undone. This will permanently delete this book and remove it from our
                        servers.
                      </DialogDescription>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <form action={deleteBook.bind(null, book.id)}>
                          <Button variant={"destructive"}>Delete</Button>
                        </form>
                      </DialogFooter>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))
          .reverse()}
      </TabsContent>
      <TabsContent value="orders">
        {customer.role === "ROLE_STAFF" && (
          <div className="border border-gray-400 w-[80%] mx-auto my-4 p-2">
            <div className="w-full">
              {orders.map((order) => (
                <div key={order.id} className="flex gap-2 flex-col border border-gray-400 m-2 p-2 justify-between">
                  <div className="flex gap-2 justify-between border-b border-b-gray-800">
                    <div>{order.id}</div>
                    <div>{order.customerId}</div>
                    <div>
                      <span>{order.createdAt.toString().slice(0, 9)}</span>{" "}
                      <span>{order.createdAt.toString().slice(11, 19)}</span>
                    </div>
                    <div>{order.orderStatus}</div>
                  </div>
                  <h3>Order Items</h3>
                  {order.orderItems.map((item) => (
                    <div key={item.id}>
                      <span>
                        {item.bookId} x {item.quantity}
                      </span>
                    </div>
                  ))}
                  <div className="flex gap-4 justify-center">
                    <Button variant={"destructive"}>Reject</Button>
                    <Button variant={"secondary"}>Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </TabsContent>
      <TabsContent value="customers">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="border border-gray-400 rounded-lg p-4 m-2 flex flex-row gap-2 justify-between items-center"
          >
            <div className="flex flex-row gap-2 w-full">
              <p>{customer.fullName}</p>
              <p>{customer.email}</p>
              <p>{customer.password || "******"}</p>
              <p className="mb-2">{customer.address}</p>
              {customer.role === "ROLE_STAFF" ? <span className="bg-blue-200 p-2">Staff</span> : <p>User</p>}
            </div>

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
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
