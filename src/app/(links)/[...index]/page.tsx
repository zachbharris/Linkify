import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: {
    index: string[];
  };
};

export default async function LinkPage({ params: { index } }: Props) {
  const [slug] = index;

  const tree = await prisma.tree.findUnique({
    where: {
      slug,
    },
  });

  if (!tree) {
    return notFound();
  }

  // request planetscale data
  return (
    <div>
      <p>@{tree.slug}</p>
      {tree.description ? <p>{tree.description}</p> : null}
    </div>
  );
}
