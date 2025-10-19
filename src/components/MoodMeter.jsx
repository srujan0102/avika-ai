import { useState } from 'react';
import { getMoodEmoji, formatTimestamp } from '../utils/helpers';

const MoodMeter = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [reason, setReason] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    try {
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, reason })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMoodHistory(prev => [...prev, data]);
        setReason('');
      }
    } catch (error) {
      console.error('Failed to save mood:', error);
    }
  };

  return (
    <div className="mood-meter">
      <h2>How are you feeling today?</h2>
      <div className="mood-grid">
        <button
          className={`mood-btn ${selectedMood === 'Red' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('Red')}
        >
          Tense 😤
        </button>
        <button
          className={`mood-btn ${selectedMood === 'Yellow' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('Yellow')}
        >
          Bright 😊
        </button>
        <button
          className={`mood-btn ${selectedMood === 'Green' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('Green')}
        >
          Calm 😌
        </button>
        <button
          className={`mood-btn ${selectedMood === 'Blue' ? 'selected' : ''}`}
          onClick={() => handleMoodSelect('Blue')}
        >
          Low 😔
        </button>
      </div>
      
      {selectedMood && (
        <div className="mood-details">
          <input
            type="text"
            placeholder="Why are you feeling this way?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button onClick={() => handleMoodSelect(selectedMood)}>
            Save Mood
          </button>
        </div>
      )}
      
      <div className="mood-history">
        <h3>Mood History</h3>
        <div className="history-timeline">
          {moodHistory.map(entry => (
            <div key={entry.id} className="history-entry">
              <span className="emoji">{getMoodEmoji(entry.mood)}</span>
              <span className="time">{formatTimestamp(entry.timestamp)}</span>
              {entry.reason && <span className="reason">{entry.reason}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodMeter;
