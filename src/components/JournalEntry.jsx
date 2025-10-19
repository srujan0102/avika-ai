import { useState } from 'react';
import { formatTimestamp } from '../utils/helpers';

const JournalEntry = () => {
  const [entry, setEntry] = useState({
    title: '',
    content: '',
    mood: '',
    tags: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      
      if (response.ok) {
        setEntry({
          title: '',
          content: '',
          mood: '',
          tags: []
        });
        alert('Journal entry saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save journal entry:', error);
      alert('Failed to save journal entry. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="journal-entry">
      <input
        type="text"
        placeholder="Entry Title"
        value={entry.title}
        onChange={(e) => setEntry({...entry, title: e.target.value})}
      />
      <textarea
        placeholder="Write your thoughts..."
        value={entry.content}
        onChange={(e) => setEntry({...entry, content: e.target.value})}
      />
      <select
        value={entry.mood}
        onChange={(e) => setEntry({...entry, mood: e.target.value})}
      >
        <option value="">Select your mood</option>
        <option value="Red">Tense</option>
        <option value="Yellow">Bright</option>
        <option value="Green">Calm</option>
        <option value="Blue">Low</option>
      </select>
      <button type="submit">Save Entry</button>
    </form>
  );
};

export default JournalEntry;
