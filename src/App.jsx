import { useEffect } from 'react'
import useJournalStore from './store/useJournalStore'
import Header from './components/Header'
import JournalForm from './components/JournalForm'
import EntryList from './components/EntryList'
import './App.css'
 
export default function App() {
  const theme = useJournalStore((state) => state.theme)
  const fetchEntries = useJournalStore((state) => state.fetchEntries)
 
  useEffect(() => {
    fetchEntries()
  }, [])
 
  return (
    <div className={theme}>
      <Header />
      <main className="main-container">
        <JournalForm />
        <EntryList />
      </main>
    </div>
  )
}
