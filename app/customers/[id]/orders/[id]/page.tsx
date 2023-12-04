export default async function CustomerOrderDetail({ params }: { params: { id: number } }) {
  return <>Order Details for : {params.id}</>;
}
