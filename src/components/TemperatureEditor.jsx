/**
 * Temperature Editor Component
 * Allows users to edit temperature entries
 */

import { useState } from 'react';
import './TemperatureEditor.css';

function TemperatureEditor({ currentTemperatures, backendUrl }) {
  const [textInput, setTextInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleEdit = () => {
    // Populate with current temperatures
    const tempText = currentTemperatures
      .map(t => t.original)
      .join('\n');
    setTextInput(tempText);
    setIsEditing(true);
    setMessage({ type: '', text: '' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTextInput('');
    setMessage({ type: '', text: '' });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Split by newlines and filter empty lines
      const temperatures = textInput
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const response = await fetch(`${backendUrl}/api/temperatures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ temperatures }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: `✅ ${data.count} temperatures updated successfully!` 
        });
        setTimeout(() => {
          setIsEditing(false);
          setTextInput('');
          setMessage({ type: '', text: '' });
        }, 2000);
      } else {
        setMessage({ 
          type: 'error', 
          text: `❌ ${data.error || 'Failed to update'}` 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: `❌ Connection error: ${error.message}` 
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="temperature-editor">
      {!isEditing ? (
        <button className="edit-button" onClick={handleEdit}>
          ✏️ Edit Temperatures
        </button>
      ) : (
        <div className="editor-panel">
          <h3>Edit Temperatures</h3>
          <p className="editor-hint">
            Enter one temperature per line (e.g., 32C, 100F)
          </p>
          
          <textarea
            className="editor-textarea"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="32C&#10;100F&#10;0C&#10;212F"
            rows={10}
            disabled={isSaving}
          />

          {message.text && (
            <div className={`editor-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="editor-actions">
            <button 
              className="save-button"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? '💾 Saving...' : '💾 Save'}
            </button>
            <button 
              className="cancel-button"
              onClick={handleCancel}
              disabled={isSaving}
            >
              ❌ Cancel
            </button>
          </div>

          <div className="editor-examples">
            <strong>Valid formats:</strong>
            <ul>
              <li>32C (Celsius)</li>
              <li>100F (Fahrenheit)</li>
              <li>-40C (Negative values)</li>
              <li>98.6F (Decimal values)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemperatureEditor;
