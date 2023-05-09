import { findOrCreateUserFromClerkUser } from "@/lib/user";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth()

  const user = await findOrCreateUserFromClerkUser(userId)

  const dashboardURL = new URL('/dashboard', req.url)
  const homeURL = new URL('/', req.url)

  return NextResponse.redirect(user ? dashboardURL : homeURL)
}