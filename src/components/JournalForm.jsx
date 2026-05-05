import { useState } from 'react'
import useJournalStore from '../store/useJournalStore'
 
export default function JournalForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const addEntry = useJournalStore((state) => state.addEntry)
 
  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    addEntry(title, content)
    setTitle('')
    setContent('')
  }
 
  return (
    <form className="journal-form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        placeholder="Entry title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="textarea-field"
        placeholder="What is on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <button className="btn-submit" type="submit">Add Entry</button>
    </form>
  )
}
