import { useState } from 'react';
import ChatContainer from './ChatContainer';
import MoodMeter from './MoodMeter';
import JournalEntry from './JournalEntry';
import '../styles/main.css';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('chat');
  
  return (
    <div className="app-container">
      <nav className="nav-bar">
        <button 
          onClick={() => setSelectedTab('chat')}
          className={selectedTab === 'chat' ? 'active' : ''}
        >
          Chat
        </button>
        <button 
          onClick={() => setSelectedTab('journal')}
          className={selectedTab === 'journal' ? 'active' : ''}
        >
          Journal
        </button>
        <button 
          onClick={() => setSelectedTab('mood')}
          className={selectedTab === 'mood' ? 'active' : ''}
        >
          Mood Meter
        </button>
      </nav>

      <main className="content-area">
        {selectedTab === 'chat' && <ChatContainer />}
        {selectedTab === 'journal' && <JournalEntry />}
        {selectedTab === 'mood' && <MoodMeter />}
      </main>
    </div>
  );
};

export default App;
