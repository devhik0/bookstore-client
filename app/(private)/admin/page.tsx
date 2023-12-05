export default async function Admin() {
  const admin = false;
  return <>{admin ? <>Admin</> : <>Not Authorized </>}</>;
}
