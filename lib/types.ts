export type Book = {
  id: number;
  copiesAvailable: number;
  description: string;
  discountPercent: number;
  imageLink: string;
  language: "ROMANIAN" | "ENGLISH";
  numPages: number;
  priceBeforeDiscount: number;
  publisher: string;
  title: string;
  yearPublished: number;
};

export type Books = (Book & { authorNameList: string[]; genreTagList: string[] })[];

export type Author = {
  id: number;
  authorInformation: string;
  fullName: string;
};

export type Genre = {
  id: number;
  genre: string;
};

export type Customer = {
  id: number;
  address: string;
  email: string; //email regex
  fullName: string;
  password: string;
};

export type Order = {
  id: number;
  createdAt: Date;
  orderStatus: string;
  customerId: Customer["id"]; // 1: 1 Customer, Order
};

export type Staff = {
  id: number;
  fullName: string;
  password: string;
  userName: string;
};
