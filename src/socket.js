/**
 * Socket.IO Client Configuration
 * Manages WebSocket connection to backend server
 */

import { io } from 'socket.io-client';

// Backend server URL - automatically detects environment
// Uses production URL if not on localhost
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname === '';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 
  (isLocalhost 
    ? 'http://localhost:3001'
    : 'https://temperature-live-app-backend.onrender.com');

console.log('🔗 Connecting to backend:', SOCKET_URL);

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
