// components/Chatbot/EnhancedChatbot.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, 
  MessageCircle, 
  X, 
  Loader2, 
  Bot, 
  User, 
  MoreVertical,
  Trash2,
  Download,
  Minimize2,
  Maximize2,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import { useChatbot } from './hooks/Chatbot';
import { 
  formatMessageTime, 
  isValidMessage, 
  sanitizeMessage,
  announceToScreenReader,
  handleKeyboardShortcut,
  KEYBOARD_SHORTCUTS,
  CHATBOT_CONSTANTS
} from './utils/Chatbot';
import './styles/Chatbot.scss';

const EnhancedChatbot = ({ 
  isOpen, 
  onToggle, 
  theme = 'auto',
  position = 'bottom-right',
  showTimestamps = true,
  enableSounds = false,
  maxHeight = 600,
  allowMinimize = true 
}) => {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    cancelRequest
  } = useChatbot();

  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setInputMessage(transcript);

        if (event.results[0].isFinal) {
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }, CHATBOT_CONSTANTS.AUTO_SCROLL_DELAY);
  }, []);

  // Handle new messages
  useEffect(() => {
    scrollToBottom();
    
    // Update unread count if chat is closed
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'bot') {
        setUnreadCount(prev => prev + 1);
        announceToScreenReader(`New message from SRSN BOT: ${lastMessage.text.substring(0, 50)}...`);
        
        // Speak bot messages if enabled
        if (enableSounds && speechSynthRef.current) {
          speakMessage(lastMessage.text);
        }
      }
    }
  }, [messages, isOpen, scrollToBottom, enableSounds]);

  // Reset unread count when chat opens
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, CHATBOT_CONSTANTS.ANIMATION_DURATION);
    }
  }, [isOpen, isMinimized]);

  // Handle click outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMenu]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      handleKeyboardShortcut(event, {
        [KEYBOARD_SHORTCUTS.CLOSE_CHAT]: () => onToggle(),
        [KEYBOARD_SHORTCUTS.CLEAR_CHAT]: () => handleClearChat(),
        [KEYBOARD_SHORTCUTS.FOCUS_INPUT]: () => inputRef.current?.focus(),
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  // Speech functions
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const speakMessage = useCallback((text) => {
    if (speechSynthRef.current && !isSpeaking) {
      // Cancel any ongoing speech
      speechSynthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthRef.current.speak(utterance);
    }
  }, [isSpeaking]);

  const stopSpeaking = useCallback(() => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const message = sanitizeMessage(inputMessage);
    if (!isValidMessage(message) || isLoading) return;

    setInputMessage('');
    stopSpeaking(); // Stop any ongoing speech
    await sendMessage(message);
  }, [inputMessage, isLoading, sendMessage, stopSpeaking]);

  // Handle input key press
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  // Menu actions
  const handleClearChat = useCallback(() => {
    clearMessages();
    setShowMenu(false);
    stopSpeaking();
    announceToScreenReader('Chat history cleared');
  }, [clearMessages, stopSpeaking]);

  const handleDownloadChat = useCallback(() => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages.filter(msg => !msg.isError)
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowMenu(false);
    announceToScreenReader('Chat history downloaded');
  }, [messages]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
    setShowMenu(false);
  }, [isMinimized]);

  // Render message content with links
  const renderMessageContent = useCallback((text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  }, []);

  const chatContainerClass = `
    chatbot-container 
    ${isOpen ? 'chatbot-container--open' : ''}
    ${isMinimized ? 'chatbot-container--minimized' : ''}
    chatbot-container--${position}
    chatbot-container--${theme}
  `.trim();

  return (
    <>
      {/* Overlay */}
      {isOpen && !isMinimized && (
        <div 
          className="chatbot-overlay" 
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Main Container */}
      <div 
        ref={containerRef}
        className={chatContainerClass}
        style={{ maxHeight: isMinimized ? '60px' : `${maxHeight}px` }}
        role="dialog"
        aria-label="SRSN BOT Chat"
        aria-expanded={isOpen}
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header__info">
            <div className="chatbot-header__avatar">
              <Bot size={20} />
            </div>
            <div className="chatbot-header__text">
              <h3>SRSN BOT</h3>
              <span className="chatbot-header__status">
                {isLoading ? 'Typing...' : isSpeaking ? 'Speaking...' : 'Online'}
              </span>
            </div>
          </div>
          
          <div className="chatbot-header__actions">
            {/* Menu Button */}
            <div className="chatbot-menu" ref={menuRef}>
              <button 
                className="chatbot-header__action"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Chat options"
                aria-expanded={showMenu}
              >
                <MoreVertical size={16} />
              </button>
              
              {showMenu && (
                <div className="chatbot-menu__dropdown">
                  <button onClick={handleClearChat} className="chatbot-menu__item">
                    <Trash2 size={14} />
                    <span>Clear Chat</span>
                  </button>
                  <button onClick={handleDownloadChat} className="chatbot-menu__item">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Minimize Button */}
            {allowMinimize && (
              <button 
                className="chatbot-header__action"
                onClick={toggleMinimize}
                aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
            )}
            
            {/* Close Button */}
            <button 
              className="chatbot-header__action chatbot-header__close"
              onClick={onToggle}
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        {!isMinimized && (
          <>
            {error && (
              <div className="chatbot-error" role="alert">
                <p>Connection error: {error}</p>
                <button onClick={cancelRequest} className="chatbot-error__retry">
                  Retry
                </button>
              </div>
            )}
            
            <div className="chatbot-messages">
              <div className="chatbot-messages__list">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chatbot-message ${
                      message.sender === 'user' 
                        ? 'chatbot-message--user' 
                        : 'chatbot-message--bot'
                    } ${message.isError ? 'chatbot-message--error' : ''}`}
                  >
                    <div className="chatbot-message__avatar">
                      {message.sender === 'user' ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>
                    <div className="chatbot-message__content">
                      <div 
                        className="chatbot-message__bubble"
                        dangerouslySetInnerHTML={{
                          __html: renderMessageContent(message.text)
                        }}
                      />
                      {message.sender === 'bot' && speechSynthRef.current && (
                        <button
                          className="chatbot-message__speak"
                          onClick={() => speakMessage(message.text)}
                          disabled={isSpeaking}
                          aria-label="Read message aloud"
                        >
                          <Volume2 size={12} />
                        </button>
                      )}
                      {showTimestamps && (
                        <span className="chatbot-message__time">
                          {formatMessageTime(message.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="chatbot-message chatbot-message--bot chatbot-message--loading">
                    <div className="chatbot-message__avatar">
                      <Bot size={16} />
                    </div>
                    <div className="chatbot-message__content">
                      <div className="chatbot-message__bubble">
                        <div className="chatbot-typing">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Form */}
            <form className="chatbot-input" onSubmit={handleSubmit}>
              <div className="chatbot-input__wrapper">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="chatbot-input__field"
                  disabled={isLoading}
                  maxLength={CHATBOT_CONSTANTS.MAX_MESSAGE_LENGTH}
                  rows={1}
                  style={{ 
                    resize: 'none',
                    minHeight: '20px',
                    maxHeight: '100px'
                  }}
                />
                <div className="chatbot-input__actions">
                  {/* Voice Input */}
                  {recognitionRef.current && (
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      className={`chatbot-input__voice ${isListening ? 'chatbot-input__voice--active' : ''}`}
                      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                      disabled={isLoading}
                    >
                      {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                  )}
                  
                  {/* Stop Speaking */}
                  {isSpeaking && (
                    <button
                      type="button"
                      onClick={stopSpeaking}
                      className="chatbot-input__stop-speech"
                      aria-label="Stop speaking"
                    >
                      <X size={16} />
                    </button>
                  )}
                  
                  {/* Cancel Request */}
                  {isLoading && (
                    <button
                      type="button"
                      onClick={cancelRequest}
                      className="chatbot-input__cancel"
                      aria-label="Cancel request"
                    >
                      <X size={16} />
                    </button>
                  )}
                  
                  {/* Send Button */}
                  <button
                    type="submit"
                    className="chatbot-input__send"
                    disabled={!isValidMessage(inputMessage) || isLoading}
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="chatbot-input__loading" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="chatbot-input__counter">
                {inputMessage.length}/{CHATBOT_CONSTANTS.MAX_MESSAGE_LENGTH}
              </div>
            </form>
          </>
        )}
      </div>

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          className={`chatbot-fab chatbot-fab--${position}`}
          onClick={onToggle}
          aria-label="Open SRSN BOT Chat"
        >
          <MessageCircle size={24} />
          {unreadCount > 0 && (
            <span className="chatbot-fab__badge">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default EnhancedChatbot;