"use client";

import { useState, KeyboardEvent } from "react";
import styles from "./chat.module.css";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import {
  Search,
  Send,
  MoreVertical,
  Paperclip,
  Check,
  CheckCheck,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

// Types
interface Message {
  id: number;
  sender: "me" | "specialist";
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: number;
  specialistId: number;
  name: string;
  avatar: string; // URL
  status: "online" | "offline";
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: string;
  messages: Message[];
}

// Mock Data
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    specialistId: 101,
    name: "Dr. Everson Araujo",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "online",
    lastMessage: "Claro, podemos agendar para quarta-feira.",
    unreadCount: 2,
    lastMessageTime: "10:30",
    messages: [
      {
        id: 1,
        sender: "specialist",
        text: "Olá! Como você está se sentindo hoje?",
        timestamp: "10:00",
        read: true,
      },
      {
        id: 2,
        sender: "me",
        text: "Oi Doutor. Estou um pouco ansioso com o trabalho.",
        timestamp: "10:05",
        read: true,
      },
      {
        id: 3,
        sender: "specialist",
        text: "Entendo. Vamos conversar sobre isso na próxima sessão?",
        timestamp: "10:15",
        read: true,
      },
      {
        id: 4,
        sender: "me",
        text: "Sim, seria ótimo.",
        timestamp: "10:20",
        read: true,
      },
      {
        id: 5,
        sender: "specialist",
        text: "Claro, podemos agendar para quarta-feira.",
        timestamp: "10:30",
        read: false,
      },
    ],
  },
  {
    id: 2,
    specialistId: 102,
    name: "Julia Ost",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "offline",
    lastMessage: "Obrigada pelo envio do diário.",
    unreadCount: 0,
    lastMessageTime: "Ontem",
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Oi Julia, acabei de enviar o diário de emoções por email.",
        timestamp: "14:00",
        read: true,
      },
      {
        id: 2,
        sender: "specialist",
        text: "Obrigada pelo envio do diário. Vou analisar antes da nossa consulta.",
        timestamp: "16:45",
        read: true,
      },
    ],
  },
  {
    id: 3,
    specialistId: 103,
    name: "Bruno P. de Mello",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    status: "online",
    lastMessage: "Fico no aguardo.",
    unreadCount: 0,
    lastMessageTime: "Segunda",
    messages: [
      {
        id: 1,
        sender: "specialist",
        text: "Olá, precisamos confirmar o horário.",
        timestamp: "09:00",
        read: true,
      },
      {
        id: 2,
        sender: "specialist",
        text: "Fico no aguardo.",
        timestamp: "09:01",
        read: true,
      },
    ],
  },
];

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageInput, setMessageInput] = useState("");

  // Clone conversations for local state manipulation (like adding messages)
  // In a real app this would be more complex with effects/reducers
  const [conversations, setConversations] =
    useState<Conversation[]>(MOCK_CONVERSATIONS);

  const activeConversation = conversations.find((c) => c.id === activeChatId);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeChatId) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: newMessage.text,
            lastMessageTime: newMessage.timestamp,
          };
        }
        return c;
      }),
    );

    setMessageInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <DashboardHeader />

      <main className={styles.chat_layout}>
        {/* Sidebar - Conversation List */}
        <aside
          className={`${styles.sidebar} ${activeChatId ? styles.hidden_on_mobile : ""}`}
        >
          <div className={styles.sidebar_header}>
            <h2 className={styles.sidebar_title}>Conversas</h2>
          </div>

          <div className={styles.search_container}>
            <Search size={18} className={styles.search_icon} />
            <input
              type="text"
              placeholder="Buscar conversa..."
              className={styles.search_input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.chat_list}>
            {filteredConversations.map((chat) => (
              <div
                key={chat.id}
                className={`${styles.chat_item} ${activeChatId === chat.id ? styles.chat_item_active : ""}`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className={styles.chat_avatar}
                />
                <div className={styles.chat_info}>
                  <div className={styles.chat_top_row}>
                    <span className={styles.chat_name}>{chat.name}</span>
                    <span className={styles.chat_time}>
                      {chat.lastMessageTime}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p className={styles.last_message}>{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className={styles.unread_badge}>
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <section
          className={`${styles.chat_area} ${activeChatId ? styles.mobile_active : ""}`}
        >
          {activeConversation ? (
            <>
              {/* Header */}
              <header className={styles.chat_header}>
                <div className={styles.header_user_info}>
                  <button
                    className={styles.back_btn}
                    onClick={() => setActiveChatId(null)}
                  >
                    <ArrowLeft size={20} />
                  </button>

                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className={styles.chat_avatar}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className={styles.header_details}>
                    <h3>{activeConversation.name}</h3>
                    <div className={styles.header_status}>
                      <span className={styles.status_dot}></span>
                      {activeConversation.status === "online"
                        ? "Online"
                        : "Offline"}
                    </div>
                  </div>
                </div>

                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                  }}
                >
                  <MoreVertical size={20} />
                </button>
              </header>

              {/* Messages */}
              <div className={styles.messages_container}>
                {activeConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.message_wrapper} ${msg.sender === "me" ? styles.message_sent : styles.message_received}`}
                  >
                    <div className={styles.message_bubble}>
                      {msg.text}
                      <span className={styles.message_time}>
                        {msg.timestamp}
                        {msg.sender === "me" && (
                          <span
                            style={{
                              marginLeft: "4px",
                              verticalAlign: "middle",
                            }}
                          >
                            {msg.read ? (
                              <CheckCheck size={12} />
                            ) : (
                              <Check size={12} />
                            )}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className={styles.input_area}>
                <button className={styles.attach_btn}>
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className={styles.message_input}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button className={styles.send_btn} onClick={handleSendMessage}>
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className={styles.empty_state}>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  background: "#f3f4f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <MessageCircle size={48} color="#d1d5db" />
              </div>
              <h3>Comece uma conversa</h3>
              <p>Selecione um especialista ao lado para enviar uma mensagem.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
