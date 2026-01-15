/**
 * Socket.IO Client Configuration
 * Manages WebSocket connection to backend server
 */

import { io } from 'socket.io-client';

// Backend server URL - automatically detects environment
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 
  (import.meta.env.PROD 
    ? 'https://temperature-live-app-backend.onrender.com' 
    : 'http://localhost:3001');

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
