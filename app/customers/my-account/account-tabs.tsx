import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Genre } from "@/lib/types";
import AddBookDialog from "./add-book-dialog";
import BookList from "./book-list";
import TabCustomers from "./tab-customers";
import TabOrders from "./tab-orders";

export default function AccountTabs({ genres }: { genres: Genre[] }) {
  return (
    <Tabs defaultValue="books" className="w-full justify-center">
      <TabsList className="mt-2 flex w-full justify-center gap-2 bg-gray-100 p-4">
        <TabsTrigger value="orders" className="rounded-lg bg-gray-300 p-2 text-black">
          Orders
        </TabsTrigger>
        <TabsTrigger value="books" className="rounded-lg bg-gray-300 p-2 text-black">
          Books
        </TabsTrigger>
        <TabsTrigger value="customers" className="rounded-lg bg-gray-300 p-2 text-black">
          Customers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="books">
        <AddBookDialog genres={genres} />
        <BookList />
      </TabsContent>
      <TabsContent value="orders">
        <TabOrders />
      </TabsContent>
      <TabsContent value="customers">
        <TabCustomers />
      </TabsContent>
    </Tabs>
  );
}
