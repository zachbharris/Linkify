'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'

export async function createTree(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('You must be signed in to create a tree')
  }

  await prisma.tree.create({
    data: {
      userId: session.user.id,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
    }
  })

  revalidatePath('/dashboard')
}

export async function updateTree(formData: FormData) {
  const id = formData.get('id') as string
}

export async function deleteTree(formData: FormData) {
  const id = formData.get('id') as string
}