import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <textarea
          placeholder="Enter diary entry"
          cols={50}
          rows={10}
        />
      </div>
        <button>Obtain your positive feedback</button>
    </div>
  )
}

export default App
