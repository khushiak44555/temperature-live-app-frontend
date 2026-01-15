/**
 * Temperature Table Component
 * Displays real-time temperature data in a responsive table
 */

import React from 'react';

export default function TemperatureTable({ temperatures, isConnected, isLoading }) {
  return (
    <div className="temperature-container">
      {/* Header with status indicator */}
      <div className="header">
        <h1>🌡️ Temperature Monitor</h1>
        <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          {isConnected ? 'Live Updates Enabled' : 'Disconnected'}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Waiting for temperature data...</p>
        </div>
      )}

      {/* No data state */}
      {!isLoading && temperatures.length === 0 && (
        <div className="no-data">
          <p>📭 No temperature data available</p>
          <p className="hint">Add temperatures to temperature.txt to see them here</p>
        </div>
      )}

      {/* Temperature table */}
      {!isLoading && temperatures.length > 0 && (
        <div className="table-wrapper">
          <table className="temperature-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Original Value</th>
                <th>Celsius (°C)</th>
                <th>Fahrenheit (°F)</th>
              </tr>
            </thead>
            <tbody>
              {temperatures.map((temp, index) => (
                <tr key={index} className="fade-in">
                  <td>{index + 1}</td>
                  <td className="original-value">{temp.original}</td>
                  <td className="celsius">{temp.celsius}°C</td>
                  <td className="fahrenheit">{temp.fahrenheit}°F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer info */}
      <div className="footer">
        <p>Total entries: <strong>{temperatures.length}</strong></p>
        <p className="update-hint">✨ Updates automatically when temperature.txt changes</p>
      </div>
    </div>
  );
}
