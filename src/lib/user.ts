'use server'

import { currentUser } from "@clerk/nextjs";

import prisma from "./prisma";

export async function findOrCreateUserFromClerkUser(userId: string | null) {
  if (!userId) return undefined

  const existingUser = await prisma.user.findUnique({ where: { id: userId } })

  if (existingUser) {
    return existingUser
  } else {
    const clerkUser = await currentUser()

    if (!clerkUser) return undefined

    const user = await prisma.user.upsert({
      where: { id: clerkUser.id },
      update: {},
      create: {
        id: clerkUser.id,
        username: clerkUser.username as string,
      },
    })

    return user
  }
}

export async function getUserLinkTree(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      Item: true
    }
  })

  return user
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      Item: true
    }
  })

  return user
}

export async function updateUser(data: any) {
  const displayName = data.get('displayName')

  console.log({ displayName })

  await fetch('http://localhost:3000/api/user', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ displayName })
  })
}