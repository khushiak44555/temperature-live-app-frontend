/**
 * Socket.IO Client Configuration
 * Manages WebSocket connection to backend server
 */

import { io } from 'socket.io-client';

// Function to get backend URL at runtime
function getBackendUrl() {
  // Check for environment variable first
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // Detect environment based on hostname
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isLocalhost = hostname === 'localhost' || 
                      hostname === '127.0.0.1' ||
                      hostname === '';
  
  const url = isLocalhost 
    ? 'http://localhost:3001'
    : 'https://temperature-live-app-backend.onrender.com';
  
  console.log('🔗 Connecting to backend:', url, '(hostname:', hostname + ')');
  return url;
}

const SOCKET_URL = getBackendUrl();

// Create and export socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

// Connection event handlers for debugging
socket.on('connect', () => {
  console.log('✅ Connected to server:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
});
