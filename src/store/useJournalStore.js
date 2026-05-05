import { create } from 'zustand'
import { persist } from 'zustand/middleware'
 
const initialState = {
  entries: [],
  isLoading: false,
  error: null,
  theme: 'light',
  searchQuery: '',
}
 
const useJournalStore = create(
  persist(
    (set) => ({
      ...initialState,
 
      reset: () => set(initialState),
 
      fetchEntries: async () => {
        set({ isLoading: true, error: null })
        try {
          const res = await fetch('https://api.programiz.pro/api/Demo/v1/journal-entries')
          const data = await res.json()
          set({ entries: data, isLoading: false })
        } catch (err) {
          set({ error: err.message, isLoading: false })
        }
      },
 
      addEntry: (title, content) => set((state) => ({
        entries: [
          ...state.entries,
          {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString()
          }
        ]
      })),
 
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id)
      })),
 
      editEntry: (id, title, content) => set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id ? { ...entry, title, content } : entry
        )
      })),
 
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
 
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'journal-store',
      partialize: (state) => ({
        theme: state.theme,
        searchQuery: state.searchQuery,
      }),
    }
  )
)
 
export default useJournalStore
