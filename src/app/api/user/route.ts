import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401,
    })
  } else {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      return NextResponse.json({ ...user })
    } catch (err) {
      return NextResponse.json({
        message: 'Something went wrong.'
      }, {
        status: 500,
      })
    }
  }
}

export async function POST(req: Request, res: Response) {
  const { displayName } = await req.json()
  const { userId } = auth()

  if (!userId) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 401,
    })
  }

  await prisma.user.update({
    where: { id: userId },
    data: { displayName }
  })
}