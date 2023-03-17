import { useState } from 'react'
import BlogsList from './components/blogsList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BlogsList />
    </>
  )
}

export default App
