import Link from "next/link"

export default async function Home() {
  const data = await fetch("http://localhost:8080/api/books", {})
  const books = await data.json()

  // console.log("Books: ", books)

  return (
    <>Bookstore Test Here data comes from server:
    <div style={{border: "1px solid green", padding: "1rem"}}>
     {books.map(book => <div key={book.id} style={{border: "1px solid blue", margin: "1rem", padding: "1rem"}}>
      <h3>{book.title}</h3>
      <span>{book.yearPublished}</span>
      <p>{book.description}</p>
      <span>{book.numPages}</span>
     </div>)}
    </div>
     <Link href={"/staff"} className="bg-green-400 border border-green-400">Go to staff</Link>
    </>
  )
}
