import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export default async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const { userId } = auth()

  if (!userId || userId !== id) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401,
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({
      message: 'Something went wrong.'
    }, {
      status: 500,
    })
  }
}