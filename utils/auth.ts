import { auth } from "@clerk/nextjs"
import { prisma } from "./db"

// sync user from clerk and db user
export const getUserByClerkId = async () => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  })
  return user
}
