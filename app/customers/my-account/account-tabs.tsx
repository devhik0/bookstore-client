import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Genre } from "@/lib/types";
import AddBookDialog from "./add-book-dialog";
import BookList from "./book-list";
import TabCustomers from "./tab-customers";
import TabOrders from "./tab-orders";

export default function AccountTabs({ genres }: { genres: Genre[] }) {
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
