"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In to Linkify</h1>
      <button onClick={() => signIn("google")}>Google</button>
    </div>
  );
}
