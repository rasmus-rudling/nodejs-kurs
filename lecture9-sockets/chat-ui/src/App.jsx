import { useState } from 'react'
import './App.css'
import Chat from "./Chat.jsx";

function App() {
    const [currentUsername, setCurrentUserName] = useState(null)
    const [count, setCount] = useState(0)

    const onUserNameSubmit = (username) => {
        setCurrentUserName(username)
    }

    // TODO
    // 1. Ange vem man är
    // 2. Skicka meddelanden
    // 3. Se meddelanden
    // 4. Ladda upp filer

    if (!currentUsername) return <GiveUserName onUserNameSubmit={onUserNameSubmit} />

    return <Chat username={currentUsername} />
}

function GiveUserName({onUserNameSubmit}) {
    const [currentUsername, setCurrentUsername] = useState("")

    return <div>
        <input value={currentUsername} onChange={e => setCurrentUsername(e.target.value)}/>
        <button onClick={() => onUserNameSubmit(currentUsername)}>Gå med i chatt</button>
    </div>
}


export default App
