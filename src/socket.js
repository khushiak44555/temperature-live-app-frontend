/**
 * Socket.IO Client Configuration
 * Manages WebSocket connection to backend server
 */

import { io } from 'socket.io-client';

// Backend URL - production by default, localhost for local dev
const PRODUCTION_BACKEND = 'https://temperature-live-app-backend.onrender.com';
const LOCAL_BACKEND = 'http://localhost:3001';

// Function to get backend URL at runtime
function getBackendUrl() {
  // 1. Check for explicit environment variable
  if (import.meta.env.VITE_BACKEND_URL) {
    console.log('🔗 Using VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // 2. Check if running on localhost
  const hostname = window.location.hostname;
  console.log('🌍 Detected hostname:', hostname);
  
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
    console.log('🏠 Running locally, using:', LOCAL_BACKEND);
    return LOCAL_BACKEND;
  }
  
  // 3. Default to production
  console.log('☁️ Running in production, using:', PRODUCTION_BACKEND);
  return PRODUCTION_BACKEND;
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
