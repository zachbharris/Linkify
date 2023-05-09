import { getUserById, updateUser } from "@/lib/user";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditorPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/signin");
  }

  const linkTree = await getUserById(user.id);

  return (
    <div>
      <Link href={`/${user?.username}`}>Go To Link /{user?.username}</Link>

      <br />

      <form action={updateUser} method="post">
        <label>
          <span>Display Name</span>

          <input type="text" defaultValue={linkTree?.displayName ?? ""} />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
