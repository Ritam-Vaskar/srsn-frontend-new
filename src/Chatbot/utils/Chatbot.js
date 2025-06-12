// utils/chatbotUtils.js

// Format timestamp for display
export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now - date) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  } else if (diffInHours < 168) { // Less than a week
    return date.toLocaleDateString([], { 
      weekday: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } else {
    return date.toLocaleDateString([], { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
};

// Generate unique message ID
export const generateMessageId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Validate message content
export const isValidMessage = (message) => {
  return message && 
         typeof message === 'string' && 
         message.trim().length > 0 && 
         message.trim().length <= 1000; // Max 1000 characters
};

// Sanitize message content
export const sanitizeMessage = (message) => {
  return message
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .substring(0, 1000); // Limit to 1000 characters
};

// Check if API is available
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_CHATBOT_API_URL}/`, {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Local storage helpers
export const STORAGE_KEYS = {
  CHAT_HISTORY: 'chatbot_history',
  USER_PREFERENCES: 'chatbot_preferences',
  CHAT_STATE: 'chatbot_state'
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
};

// Message processing utilities
export const processMessageText = (text) => {
  // Convert URLs to clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
};

// Debounce utility for search/typing
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (error.name === 'AbortError') {
    return 'Request was cancelled';
  }
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network connection error. Please check your internet connection.';
  }
  
  if (error.status === 429) {
    return 'Too many requests. Please wait a moment before trying again.';
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  if (error.status === 404) {
    return 'Service not found. Please contact support.';
  }
  
  return error.message || 'An unexpected error occurred';
};

// Constants
export const CHATBOT_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 1000,
  MAX_MESSAGES_HISTORY: 50,
  TYPING_DELAY: 1000,
  AUTO_SCROLL_DELAY: 100,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  REQUEST_TIMEOUT: 30000,
  ANIMATION_DURATION: 300,
  MOBILE_BREAKPOINT: 768,
  MESSAGES_PER_PAGE: 20
};

// Theme utilities
export const applyTheme = (theme) => {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('chatbot-dark-theme');
  } else if (theme === 'light') {
    root.classList.remove('chatbot-dark-theme');
  } else {
    // Auto theme based on system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('chatbot-dark-theme');
    } else {
      root.classList.remove('chatbot-dark-theme');
    }
  }
};

// Accessibility utilities
export const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Performance utilities
export const isReducedMotionPreferred = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const supportsBackdropFilter = () => {
  return CSS.supports('backdrop-filter', 'blur(1px)') || 
         CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  SEND_MESSAGE: 'Enter',
  NEW_LINE: 'Shift+Enter',
  CLOSE_CHAT: 'Escape',
  CLEAR_CHAT: 'Ctrl+K',
  FOCUS_INPUT: 'Ctrl+/',
};

export const handleKeyboardShortcut = (event, handlers) => {
  const { key, ctrlKey, shiftKey, altKey, metaKey } = event;
  const shortcut = [
    ctrlKey && 'Ctrl',
    altKey && 'Alt', 
    metaKey && 'Meta',
    shiftKey && 'Shift',
    key
  ].filter(Boolean).join('+');

  if (handlers[shortcut]) {
    event.preventDefault();
    handlers[shortcut]();
  }
};