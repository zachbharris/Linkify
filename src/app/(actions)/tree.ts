'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function createTree(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('You must be signed in to create a tree')
  }

  const slugSchema = z
    .string()
    .min(2, "Must be at least 2 characters")
    .max(24, "Must be less than 24 characters")
    .regex(/^[a-z0-9-_]+$/, "I don't even know what to tell you haha.")

  const slug = formData.get('slug') as string
  const description = formData.get('description') as string

  // parse the slug to ensure it is valid
  const isSlugValid = slugSchema.safeParse(slug)

  if (isSlugValid.success) {
    await prisma.tree.create({
      data: {
        userId: session.user.id,
        slug,
        description,
      }
    })

    revalidatePath('/dashboard')
  }
}

export async function updateTree(formData: FormData) {
  const id = formData.get('id') as string
}

export async function deleteTree(formData: FormData) {
  const id = formData.get('id') as string

  await prisma.tree.delete({
    where: {
      id
    }
  })

  revalidatePath('/dashboard')
}

export async function createTreeItem(formData: FormData) {
  const treeId = formData.get('id') as string
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('You must be signed in to create a tree')
  }

  await prisma.treeItem.create({
    data: {
      treeId
    }
  })

  revalidatePath(`/editor/${treeId}`)
}

export async function updateTreeItem(formData: FormData) {
  const id = formData.get('id') as string
  const text = formData.get('text') as string
  const link = formData.get('link') as string

  await prisma.treeItem.update({
    where: {
      id
    },
    data: {
      text,
      link
    }
  })

  revalidatePath(`/editor/${id}`)
}