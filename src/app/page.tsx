"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default async function Home() {
  const session = useSession();

  return (
    <div>
      <h1>Hello World</h1>
      {session.status === "authenticated" ? (
        <button
          className="border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-4"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 px-4"
          onClick={() => signIn("google")}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
