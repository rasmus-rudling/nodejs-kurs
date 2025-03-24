import {useEffect, useState} from "react";
import {socket} from './socket.jsx'
import {ConnectionState} from "./ConnectionState.jsx"
import {Events} from "./Events.jsx"
import {ConnectionManager} from "./ConnectionManager.jsx"
import {MyForm} from "./MyForm.jsx"

export default function Chat({username}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messageEvents, setMessageEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessageEvent(value) {
      setMessageEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, []);

  return (
    <div className="App">
      Hej {username}
      <ConnectionState isConnected={ isConnected } />
      <Events events={ messageEvents } />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}
