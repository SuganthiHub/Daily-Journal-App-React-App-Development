import { useState } from 'react'
import useJournalStore from '../store/useJournalStore'
 
export default function EntryCard({ entry }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(entry.title)
  const [editContent, setEditContent] = useState(entry.content)
 
  const editEntry = useJournalStore((state) => state.editEntry)
  const deleteEntry = useJournalStore((state) => state.deleteEntry)
 
  function handleSave() {
    if (!editTitle.trim() || !editContent.trim()) return
    editEntry(entry.id, editTitle, editContent)
    setIsEditing(false)
  }
 
  function handleCancel() {
    setEditTitle(entry.title)
    setEditContent(entry.content)
    setIsEditing(false)
  }
 
  if (isEditing) {
    return (
      <div className="entry-card">
        <input
          className="input-field"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          className="textarea-field"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={4}
        />
        <div className="entry-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    )
  }
 
  return (
    <div className="entry-card">
      <p className="entry-date">{entry.date}</p>
      <h2 className="entry-title">{entry.title}</h2>
      <p className="entry-content">{entry.content}</p>
      <div className="entry-actions">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn-delete" onClick={() => deleteEntry(entry.id)}>Delete</button>
      </div>
    </div>
  )
}
