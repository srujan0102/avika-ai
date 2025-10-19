export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const getMoodEmoji = (mood) => {
  const moodEmojis = {
    'Red': '😤',
    'Yellow': '😊',
    'Green': '😌',
    'Blue': '😔'
  };
  return moodEmojis[mood] || '😐';
};

export const generateMoodHistory = (moodEntries) => {
  return moodEntries.map(entry => ({
    ...entry,
    formattedDate: new Date(entry.timestamp).toLocaleDateString(),
    emoji: getMoodEmoji(entry.mood)
  }));
};
