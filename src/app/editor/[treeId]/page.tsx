import { createTreeItem, updateTreeItem } from "@/app/(actions)/tree";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

type TreeEditorPageProps = {
  params: {
    treeId: string;
  };
};

export default async function TreeEditorPage({ params }: TreeEditorPageProps) {
  const { treeId } = params;

  const tree = await prisma.tree.findUnique({
    where: { id: treeId },
    include: {
      items: true,
    },
  });

  if (!tree) {
    return notFound();
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <Link href={`/${tree.slug}`}>{tree.slug}</Link>

      {tree.items.map((item) => (
        <div key={item.id}>
          <form action={updateTreeItem}>
            <input type="hidden" name="id" value={item.id} />
            <label htmlFor="text">
              <input
                className="text-black"
                defaultValue={item.text ?? ""}
                name="text"
                id="text"
              />
            </label>
            <label htmlFor="link">
              <input
                className="text-black"
                defaultValue={item.link ?? ""}
                name="link"
                id="link"
              />
            </label>

            <button type="submit">Update Item</button>
          </form>
        </div>
      ))}

      <form action={createTreeItem}>
        <input type="hidden" name="id" value={tree.id} />
        <button type="submit">Add Link</button>
      </form>
    </div>
  );
}
