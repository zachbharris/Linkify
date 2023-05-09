import { getUserLinkTree } from "@/lib/user";

type Props = {
  params: {
    index: string[];
  };
};

export default async function LinkPage({ params: { index } }: Props) {
  const [username] = index;

  // request planetscale data
  const linkTree = await getUserLinkTree(username);

  return <div>{linkTree?.username ? <h1>@{linkTree.username}</h1> : null}</div>;
}
