import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getData = async () => {
  const user = await getUserByClerkId()
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  })
  const sum = analysis.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)
  const average = Math.round(sum / analysis.length)
  return { analysis, average }
}
const History = async () => {
  const { analysis, average } = await getData()
  return (
    <div className="h-full w-full">
      <div>average sentiment: {average}</div>
      <div className="h-full w-full">
        <HistoryChart data={analysis} />
      </div>
    </div>
  )
}

export default History
