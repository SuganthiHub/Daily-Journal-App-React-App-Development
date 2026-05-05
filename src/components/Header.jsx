import useJournalStore from '../store/useJournalStore'
 
export default function Header() {
  const theme = useJournalStore((state) => state.theme)
  const toggleTheme = useJournalStore((state) => state.toggleTheme)
  const searchQuery = useJournalStore((state) => state.searchQuery)
  const setSearchQuery = useJournalStore((state) => state.setSearchQuery)
 
  return (
    <header className="header">
      <h1 className="header-title">My Daily Journal</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search entries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  )
}
