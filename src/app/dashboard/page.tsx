import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "@/components/auth/SignOut";
import { createTree } from "../(actions)/tree";
import prisma from "@/lib/prisma";

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
          return <p key={tree.id}>{tree.slug}</p>;
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
