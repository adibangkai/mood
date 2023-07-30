import { prisma } from "@/utils/db" // koneksi ke db
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
const createdNewUser = async () => {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    // cek user
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }
  redirect("/journal")
}

const NewUserPage = async () => {
  await createdNewUser()
  return <div>...LOADING</div>
}

export default NewUserPage
