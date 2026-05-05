import useJournalStore from '../store/useJournalStore'
import EntryCard from './EntryCard'
 
export default function EntryList() {
  const entries = useJournalStore((state) => state.entries)
  const isLoading = useJournalStore((state) => state.isLoading)
  const error = useJournalStore((state) => state.error)
  const searchQuery = useJournalStore((state) => state.searchQuery)
 
  const filteredEntries = searchQuery.trim()
    ? entries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.date.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : entries
 
  if (isLoading) return <p className="loading">Loading entries...</p>
  if (error) return <p className="error">Something went wrong: {error}</p>
 
  return (
    <div className="entry-list">
      <p className="entry-count">
        {filteredEntries.length}{' '}
        {filteredEntries.length === 1 ? 'entry' : 'entries'}
      </p>
      {filteredEntries.length === 0 ? (
        <p className="empty-state">No entries found.</p>
      ) : (
        filteredEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))
      )}
    </div>
  )
}
