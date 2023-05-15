type Props = {
  params: {
    index: string[];
  };
};

export default async function LinkPage({ params: { index } }: Props) {
  const [username] = index;

  // request planetscale data
  return <p>@{username}</p>;
}
