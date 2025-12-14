import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { sendChatMessage } from "../../services/chatService";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: 'Hello! How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // const handleSend = async () => {
  //   if (!input.trim() || isLoading) return;

  //   const userMessage: ChatMessage = {
  //     id: Date.now().toString(),
  //     sender: "user",
  //     text: input.trim(),
  //     timestamp: new Date(),
  //   };

  //   // Add user message immediately
  //   setMessages((prev) => [...prev, userMessage]);
  //   const userInput = input;
  //   setInput("");
  //   setIsLoading(true);
  //   setIsTyping(true);

  //   try {
  //     // Get plain text response (NOT stream)
  //     const replyText = await sendChatMessage(userInput);
  //    // const stream = await sendChatMessage(userInput);
  //    // const reader = stream.getReader();
  //     const decoder = new TextDecoder();


  //     // Create empty bot message
  //     const botMessageId = (Date.now() + 1).toString();
  //     const botMessage: ChatMessage = {
  //       id: botMessageId,
  //       sender: "bot",
  //       text: replyText,
  //       timestamp: new Date(),
  //     };
  //     setMessages((prev) => [...prev, botMessage]);

  //     const updateBotMessage = (id: string, text: string) => {
  //       setMessages(prev =>
  //         prev.map(msg =>
  //           msg.id === id ? { ...msg, text } : msg
  //         )
  //       );
  //     };

  //     let botText = "";   // safe variable

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) break;

  //       const chunk = decoder.decode(value);
  //       console.log("Received chunkkkkkkkkkkk:", chunk);
  //       botText += chunk;

  //       // Update bot message incrementally
  //       updateBotMessage(botMessageId, botText);
  //     }
  //   } catch (error) {
  //     console.error("Chat error:", error);
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now().toString(),
  //         sender: "bot",
  //         text: "Sorry, I encountered an error. Please try again.",
  //         timestamp: new Date(),
  //       },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //     setIsTyping(false);
  //   }
  // };


  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get plain text response - NO STREAMING, NO READER
      const replyText = await sendChatMessage(userInput);

      console.log("Received response:", replyText); // Debug log

      // Create bot message with the complete text
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };


  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          className="chat-toggle-button"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-container">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">
                <img
                  src="/avatars/girlbot.jpg"
                  alt="AI"
                  className="avatar-img"
                />
              </div>
              <div>
                <h3 className="bot-name">Assistant</h3>
                <span className={`status ${isTyping ? "typing" : "online"}`}>
                  {isTyping ? "typing..." : "online"}
                </span>
              </div>
              <button
                className="minimize-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="messages-container" ref={chatContainerRef}>
            <div className="messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-wrapper ${msg.sender === "user" ? "user-wrapper" : "bot-wrapper"
                    }`}
                >
                  {msg.sender === "bot" && (
                    <div className="avatar bot-avatar-small">
                      <img
                        src="/avatars/girlbot.jpg"
                        alt="AI"
                        className="avatar-img-small"
                      />
                    </div>
                  )}

                  <div className="message-content">
                    <div
                      className={`message-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"
                        }`}
                    >
                      <div className="message-text">{msg.text}</div>
                      <div className="message-time">{formatTime(msg.timestamp)}</div>
                    </div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="avatar user-avatar">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="message-wrapper bot-wrapper">
                  <div className="avatar bot-avatar-small">
                    <Bot size={16} />
                  </div>
                  <div className="message-content">
                    <div className="message-bubble bot-bubble typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="input-area">
            <div className="input-wrapper">
              <textarea
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Your message..."

                rows={2}
                disabled={isLoading}
              />
              <button
                className="send-button"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

// Add this CSS to your global styles or a CSS module
const styles = `
.chat-container {
  position: fixed;
  right: 22px;
  bottom: 22px;
  display: flex;
  flex-direction: column;
  height: 400px;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: transparent;
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-img-small {
  width: 22px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-toggle-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
  background: linear-gradient(90deg, #D3D3D3 25%, #1e40af 70%);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  z-index: 10000;
}

.minimize-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  padding: 8px;
}

/* Chat Header */
.chat-header {
  background:  cadetblue;
  color: #fff;
  padding: 5px 8px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bot-avatar {
  width: 24px;
  height: 24px;
  background: cadetblue;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.bot-name {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.status {
  font-size: 12px;
  opacity: 0.9;
}

.status.typing {
  color: #fff;
  font-weight: 400;
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #f0f2f5;
  scroll-behavior: smooth;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.message-wrapper {
  display: flex;
  align-items: flex-end;
  max-width: 85%;
  gap: 4px;
}

.user-wrapper {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.bot-wrapper {
  align-self: flex-start;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 4px;
}

.bot-avatar-small {
  background: linear-gradient(35deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-avatar {
  background: cadetblue;
  color: white;
}

.message-content {
  flex: 1;
}

.message-bubble {
  padding: 6px 8px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.user-bubble {
  background: cadetblue;
  color: white;
  border-bottom-right-radius: 4px;
}

.bot-bubble {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.message-text {
  font-size: 13px;
  line-height: 1.1;
  white-space: pre-wrap;
}

.message-time {
  font-size: 10px;
  opacity: 0.7;
  margin-top: 4px;
  text-align: right;
  font-weight: 300;
}

.user-bubble .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.bot-bubble .message-time {
  color: #999;
}

/* Typing Indicator */
.typing-indicator {
  padding: 6px 10px;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #999;
  animation: typing-bounce 1.4s infinite ease-in-out both;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.6; }
  40% { transform: scale(1); opacity: 1; }
}

/* Input Area */
.input-area {
  border-top: 1px solid #e9edef;
  padding: 8px 6px;
  background: white;
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  border: 1px solid #e9edef;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  font-family: inherit;
  transition: all 0.2s;
  background: #f0f2f5;
}

.chat-input:focus {
  outline: none;
  border-color: #0084ff;
  background: white;
  box-shadow: 0 0 0 3px rgba(0, 132, 255, 0.1);
}

.chat-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button {
  width: 24px;
  height:24px;
  border-radius: 50%;
  background: linear-gradient(90deg, #667eea 20%, cadetblue 100%);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-button:active:not(:disabled) {
  transform: translateY(0);
}

.input-hint {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 8px;
  font-weight: 400;
}

/* Scrollbar Styling */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 600px) {
  .chat-container {
    height: 90vh;
    border-radius: 0;
    max-width: 100%;
  }
  
  .message-wrapper {
    max-width: 95%;
  }
}
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
}