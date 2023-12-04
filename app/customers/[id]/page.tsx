import Link from "next/link";

export default async function Customer({ params }: { params: { id: number } }) {
  return (
    <>
      Customer: {params.id}
      <Link href={`/customers/${params.id}/orders`} />
    </>
  );
}
