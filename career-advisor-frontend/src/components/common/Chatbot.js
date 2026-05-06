import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! I\'m your AI Career Advisor. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'What career suits me?',
    'How to become a software engineer?',
    'Best skills to learn?',
    'Career growth tips?'
  ];

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: 'Thanks for your question! This is a demo response. In production, this would connect to an AI backend.',
          sender: 'bot'
        }]);
      }, 1000);
      
      setInput('');
    }
  };

  const handleQuickQuestion = (question) => {
    setMessages([...messages, { text: question, sender: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: `Great question about "${question}"! This would provide detailed career guidance.`,
        sender: 'bot'
      }]);
    }, 1000);
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <span className="bot-icon">🤖</span>
            AI Career Advisor
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="quick-questions">
          {quickQuestions.map((q, idx) => (
            <button key={idx} className="quick-btn" onClick={() => handleQuickQuestion(q)}>
              {q}
            </button>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
};

export default Chatbot;
