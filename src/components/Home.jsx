import { useState } from 'react'
import SearchBar from './SearchBar'
import SelectMenu from './SelectMenu'
import CountriesList from './CountriesList'
import useTheme from '../contexts/ThemeContext'

export default function Home() {
  const [query, setQuery] = useState('')
  const [isDark] = useTheme();

  return (
    <main className={`${isDark? 'dark': ''}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery}/>
      </div>
      {query === 'unmount' ? '' : <CountriesList query={query} />}
    </main>
  )
}