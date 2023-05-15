import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>The princess you are looking for is in another castle.</p>
      <Link href="/">Back Home</Link>
    </div>
  );
}
