import { useState } from 'react'
import StaffScreen, { DEFAULT_NAME, type Screen } from './StaffScreen'

function App() {
  const [screen, setScreen] = useState<Screen>('nameGate')
  const [name, setName] = useState(DEFAULT_NAME)

  return (
    <StaffScreen
      name={name}
      onNameChange={setName}
      onNavigate={setScreen}
      screen={screen}
    />
  )
}

export default App
