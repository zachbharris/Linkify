import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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