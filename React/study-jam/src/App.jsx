import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyButton from './components/MyButton.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyButton name="Orange" label="Button 1">Button 1</MyButton>
    </>
  )
}

export default App
