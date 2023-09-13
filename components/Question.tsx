"use client"

import { askQuestion } from "@/utils/api"
import { useState } from "react"
import Spinner from "./Spinner"

const Question = () => {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const onChange = (e) => {
    e.preventDefault()
    // action
    setValue(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue("")
    setLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={value}
          placeholder="ask"
          className="border border-black/20 px-4 py-2 mr-2 outline-none text-lg rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-200 hover:bg-slate-300 px-4 py-2  rounded-lg text-lg "
          type="submit"
        >
          Ask
        </button>
      </form>
      {loading && <Spinner />}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Question
