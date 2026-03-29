import { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessage, resetChat } from '../services/geminiService';

const SUGGESTIONS = [
  '🧠 What is dyslexia?',
  '🔍 How does this tool work?',
  '📋 Signs of dyslexia',
];

function renderMarkdown(text) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let listType = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      const Tag = listType === 'ol' ? 'ol' : 'ul';
      elements.push(<Tag key={key++} className="pl-6 mb-3 space-y-1.5">{listItems}</Tag>);
      listItems = [];
      listType = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^[-*•]\s+/.test(trimmed)) {
      if (listType !== 'ul') flushList();
      listType = 'ul';
      const content = trimmed.replace(/^[-*•]\s+/, '');
      listItems.push(<li key={key++} className="list-disc marker:text-[#a78bfa]">{inlineMarkdown(content)}</li>);
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      if (listType !== 'ol') flushList();
      listType = 'ol';
      const content = trimmed.replace(/^\d+[.)]\s+/, '');
      listItems.push(<li key={key++} className="list-decimal marker:text-[#a78bfa] font-medium">{inlineMarkdown(content)}</li>);
      continue;
    }

    flushList();

    if (!trimmed) continue;

    elements.push(<p key={key++} className="mb-2 leading-relaxed">{inlineMarkdown(trimmed)}</p>);
  }

  flushList();
  return elements;
}

function inlineMarkdown(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`(.+?)`/);

    let firstMatch = null;
    let matchType = null;

    if (boldMatch && (!codeMatch || boldMatch.index <= codeMatch.index)) {
      firstMatch = boldMatch;
      matchType = 'bold';
    } else if (codeMatch) {
      firstMatch = codeMatch;
      matchType = 'code';
    }

    if (!firstMatch) {
      parts.push(remaining);
      break;
    }

    if (firstMatch.index > 0) {
      parts.push(remaining.slice(0, firstMatch.index));
    }

    if (matchType === 'bold') {
      parts.push(<strong key={key++} className="font-bold text-white tracking-wide">{firstMatch[1]}</strong>);
    } else if (matchType === 'code') {
      parts.push(<code key={key++} className="font-mono text-[0.9em] bg-black/20 text-[#e0d7ff] px-1.5 py-0.5 rounded-[4px] border border-white/5">{firstMatch[1]}</code>);
    }

    remaining = remaining.slice(firstMatch.index + firstMatch[0].length);
  }

  return parts;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(async (text) => {
    const messageText = (text || input).trim();
    if (!messageText || isLoading) return;

    setHasInteracted(true);
    setError(null);
    setInput('');

    const userMsg = { role: 'user', content: messageText, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendMessage(messageText);
      const botMsg = { role: 'bot', content: response, id: Date.now() + 1 };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    resetChat();
    setMessages([]);
    setError(null);
    setHasInteracted(false);
  };

  const handleTextareaInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  return (
    <>
      <div
        className={`fixed bottom-24 right-6 w-[360px] h-[500px] max-h-[calc(100vh-120px)] bg-[#110e28]/90 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] z-[9999] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] max-[480px]:bottom-0 max-[480px]:right-0 max-[480px]:w-full max-[480px]:h-[100dvh] max-[480px]:max-h-none max-[480px]:rounded-none ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Chat Assistant"
      >
        <div className="p-[16px_20px] flex items-center gap-3.5 bg-white/5 border-b border-white/5">
          <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-lg shadow-[0_4px_12px_rgba(102,126,234,0.3)] shrink-0">🤖</div>
          <div className="flex flex-col flex-1">
            <h3 className="m-0 text-[15px] font-bold text-white tracking-wide">Dyslexia Assistant</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="bg-transparent border-none text-white/50 text-base cursor-pointer p-1.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white"
              onClick={handleReset}
              title="Reset conversation"
            >
              🔄
            </button>
            <button
              className="bg-transparent border-none text-white/50 text-base cursor-pointer p-1.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white"
              onClick={() => setIsOpen(false)}
              title="Close chat"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-5 pb-0 flex flex-col gap-4 scroll-smooth">
          {!hasInteracted && messages.length === 0 && (
            <div className="text-center py-6 animate-fade-in-up">
              <span className="block text-[48px] animate-[flyIn_0.6s_ease_0.2s_both]">🧠</span>
              <h4 className="m-0 text-lg font-bold text-white mb-2">Hi! I'm DysBot</h4>
              <p className="m-0 mb-6 text-[13px] text-white/60 leading-relaxed">
                Ask me anything about dyslexia or how DyslexiaScan works!
              </p>
              <div className="flex flex-col gap-2.5 px-3">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="bg-white/5 border border-white/10 text-white/80 p-[10px_14px] rounded-xl text-left text-[13px] font-medium transition-all duration-250 cursor-pointer hover:-translate-y-0.5 hover:bg-[#667eea]/20 hover:border-[#667eea]/40 hover:text-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                    onClick={() => handleSend(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[90%] w-fit animate-fade-in-up [animation-duration:0.3s] ${
                msg.role === 'user' ? 'self-end flex-row-reverse max-w-[85%]' : 'self-start'
              }`}
            >
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#667eea]/80 to-[#764ba2]/80 flex items-center justify-center text-sm shadow-[0_2px_8px_rgba(0,0,0,0.2)] shrink-0 self-end mb-1">🤖</div>
              )}
              <div className={`px-[14px] py-[10px] text-[13.5px] leading-[1.5] break-words rounded-[18px] ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-[#667eea] to-[#5a6edb] text-white rounded-tr-sm shadow-[0_4px_16px_rgba(102,126,234,0.25)]'
                  : 'bg-white/10 text-white/90 rounded-tl-sm border border-white/5 shadow-sm [p:last-child]:mb-0'
              }`}>
                {msg.role === 'bot' ? renderMarkdown(msg.content) : msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[90%] self-start animate-fade-in-up [animation-duration:0.3s]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#667eea]/80 to-[#764ba2]/80 flex items-center justify-center text-sm shadow-[0_2px_8px_rgba(0,0,0,0.2)] shrink-0 self-end mb-1">🤖</div>
              <div className="px-[14px] py-[14px] text-[13.5px] leading-[1.5] break-words rounded-[18px] bg-white/10 rounded-tl-sm border border-white/5 flex items-center gap-1.5 h-[38px]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-[typingBounce_1.4s_infinite_ease-in-out_both]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-[typingBounce_1.4s_infinite_ease-in-out_both] [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-[typingBounce_1.4s_infinite_ease-in-out_both] [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          {error && (
            <div className="mx-auto my-4 max-w-[90%] px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-[13px] text-red-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-2 animate-fade-in-up [animation-duration:0.3s]">
              ⚠️ {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="text-center py-2.5 text-[9px] font-bold text-white/20 tracking-[1.5px] uppercase">
          POWERED BY GOOGLE GEMINI
        </div>

        <div className="p-3.5 pt-0">
          <div className="relative flex items-end gap-2.5 bg-white/5 border border-white/10 rounded-[20px] p-1.5 focus-within:border-[#667eea]/50 focus-within:shadow-[0_0_0_1px_rgba(102,126,234,0.3)_inset] transition-all duration-200">
            <textarea
              ref={inputRef}
              className="flex-1 max-h-[100px] min-h-[22px] p-[10px_12px] bg-transparent border-none text-[#f8fafc] text-[14px] font-[var(--font-inter)] leading-[1.5] outline-none resize-none placeholder:text-white/30"
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask about dyslexia..."
              rows={1}
              disabled={isLoading}
              id="chatbot-input"
            />
            <button
              className="w-10 h-10 rounded-[14px] border-none bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center cursor-pointer shrink-0 transition-all duration-200 shadow-[0_2px_8px_rgba(102,126,234,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:not(:disabled):-translate-y-[1px] hover:not(:disabled):shadow-[0_4px_12px_rgba(102,126,234,0.5)] active:not(:disabled):translate-y-[1px] active:not(:disabled):shadow-none"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      <button
        className={`fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full border-none bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white flex items-center justify-center cursor-pointer z-[9999] shadow-[0_8px_32px_rgba(102,126,234,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(102,126,234,0.5)] active:translate-y-0 active:scale-95 max-[480px]:bottom-5 max-[480px]:right-5 ${isOpen ? 'rotate-90 scale-90 bg-white/10 shadow-none from-[#4b5563] to-[#374151] max-[480px]:opacity-0 max-[480px]:pointer-events-none' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Close chat' : 'Chat with DysBot'}
        id="chatbot-fab"
      >
        <span className={`flex items-center justify-center text-[26px] leading-none transition-transform duration-300 ${isOpen ? '' : 'animate-[slightBounce_2s_ease-in-out_infinite] hover:animate-none'}`}>
          {isOpen ? '✕' : '💬'}
        </span>
      </button>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes flyIn {
          0% { transform: translateY(20px) scale(0.8) rotate(-10deg); opacity: 0; }
          50% { transform: translateY(-5px) scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
