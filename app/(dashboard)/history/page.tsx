import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
  const user = await getUserByClerkId()
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
    },
  })
  const sum = analysis.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)
  const average = sum / analysis.length
  return { analysis, average }
}
const History = async () => {
  const { analysis, average } = await getData()
  return <div>history: {average}</div>
}

export default History
