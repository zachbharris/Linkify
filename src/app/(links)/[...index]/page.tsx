import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    index: string[];
  };
};

export default async function LinkPage({ params: { index } }: Props) {
  const [slug] = index;
  const session = await getServerSession(authOptions);

  const tree = await prisma.tree.findUnique({
    where: {
      slug,
    },
    include: {
      items: true,
    },
  });

  if (!tree) {
    return notFound();
  }

  // request planetscale data
  return (
    <div>
      {session?.user?.id === tree.userId ? (
        <Link href={`/editor/${tree.id}`}>Go to Editor</Link>
      ) : null}
      <p>@{tree.slug}</p>
      {tree.description ? <p>{tree.description}</p> : null}
      {tree.items.map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
