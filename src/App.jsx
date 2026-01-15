/**
 * Main App Component
 * Handles WebSocket connection and state management
 */

import { useState, useEffect } from 'react';
import { socket } from './socket';
import TemperatureTable from './components/TemperatureTable';
import TemperatureEditor from './components/TemperatureEditor';
import './App.css';

function App() {
  const [temperatures, setTemperatures] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get backend URL from socket config
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  useEffect(() => {
    // Connection status handlers
    function onConnect() {
      setIsConnected(true);
      console.log('Connected to temperature monitor');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('Disconnected from server');
    }

    // Temperature data handler
    function onTemperaturesUpdate(data) {
      console.log('Received temperature update:', data);
      setTemperatures(data);
      setIsLoading(false);
    }

    // Register event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('temperatures-update', onTemperaturesUpdate);

    // Set initial connection state
    setIsConnected(socket.connected);

    // Request initial data
    if (socket.connected) {
      socket.emit('request-data');
    }

    // Cleanup on unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('temperatures-update', onTemperaturesUpdate);
    };
  }, []);

  return (
    <div className="app">
      <TemperatureEditor 
        currentTemperatures={temperatures}
        backendUrl={backendUrl}
      />
      <TemperatureTable 
        temperatures={temperatures}
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
