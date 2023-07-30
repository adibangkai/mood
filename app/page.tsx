import { auth } from "@clerk/nextjs"
import Link from "next/link"

export default async function Home() {
  const { userId } = await auth()
  let link = userId ? "/journal" : "/new-user"

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-5xl font-medium">Pikir sebelum bertindak boss!</h1>
        <p className="text-2xl text-white/60 mb-4 font-extralight">
          sebelum kita berkata-kata ada baiknya kita pikir dahulu dampak dari
          ucapan kita
        </p>
        <div>
          <Link href={link}>
            <button className="bg-purple-600 px-4 py-2 rounded-md text-xl">
              get-started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
