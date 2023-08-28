"use client"

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { Autosave, useAutosave } from "react-autosave"

const Editor = ({ entry }) => {
  const [text, setText] = useState(entry.content)
  const [currentEntry, setEntry] = useState(entry)
  const [isSaving, setIsSaving] = useState(false)
  const [value, setValue] = useState(entry.content)
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsSaving(true)
      const updated = await updateEntry(entry.id, _value)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isSaving && <div>loading..</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
export default Editor
