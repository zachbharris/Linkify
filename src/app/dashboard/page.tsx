import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "@/components/auth/SignOut";
import { createTree, deleteTree } from "../(actions)/tree";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const trees = await prisma.tree.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div>
      <h1>Hello {session?.user?.name}</h1>
      <SignOut />

      <div className="m-4">
        <h2>Trees</h2>
        {trees.map((tree) => {
          return (
            <div key={tree.id} className="flex flex-row gap-4">
              <Link className="flex mx-4" href={`/editor/${tree.id}`}>
                {tree.slug}
              </Link>

              <form action={deleteTree}>
                <input type="hidden" name="id" value={tree.id} />
                <button
                  type="submit"
                  className="flex bg-red-800 rounded-lg p-4"
                >
                  Delete Tree
                </button>
              </form>
            </div>
          );
        })}
      </div>

      <form action={createTree}>
        <label htmlFor="slug">
          <input className="text-black" type="text" id="slug" name="slug" />
        </label>
        <label htmlFor="description">
          <input
            className="text-black"
            type="text"
            id="description"
            name="description"
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
