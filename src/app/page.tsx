import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  return user ? redirect("/dashboard") : redirect("/login");
}
