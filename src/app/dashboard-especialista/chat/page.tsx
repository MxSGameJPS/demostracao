"use client";

import { useState, KeyboardEvent } from "react";
import styles from "./specialist-chat.module.css";
import SpecialistHeader from "../components/SpecialistHeader";
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
  sender: "me" | "patient";
  text: string;
  timestamp: string;
  read: boolean;
}

interface PatientConversation {
  id: number;
  patientId: number;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastMessage: string;
  unreadCount: number;
  lastMessageTime: string;
  nextAppointment?: string;
  messages: Message[];
}

// Mock Data
const MOCK_CONVERSATIONS: PatientConversation[] = [
  {
    id: 1,
    patientId: 1,
    name: "Maria Silva",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "online",
    lastMessage: "Obrigada pelo acompanhamento, doutor!",
    unreadCount: 2,
    lastMessageTime: "10:30",
    nextAppointment: "Hoje, 14:00",
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Olá Maria! Como você está se sentindo hoje?",
        timestamp: "10:00",
        read: true,
      },
      {
        id: 2,
        sender: "patient",
        text: "Oi Doutor. Estou me sentindo melhor, as técnicas de respiração ajudaram muito.",
        timestamp: "10:05",
        read: true,
      },
      {
        id: 3,
        sender: "me",
        text: "Ótimo! Continue praticando. Vamos conversar mais sobre isso na sessão de hoje.",
        timestamp: "10:15",
        read: true,
      },
      {
        id: 4,
        sender: "patient",
        text: "Sim, claro! Tenho algumas dúvidas.",
        timestamp: "10:20",
        read: true,
      },
      {
        id: 5,
        sender: "patient",
        text: "Obrigada pelo acompanhamento, doutor!",
        timestamp: "10:30",
        read: false,
      },
    ],
  },
  {
    id: 2,
    patientId: 2,
    name: "João Santos",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "offline",
    lastMessage: "Entendi. Vou preparar o exercício.",
    unreadCount: 0,
    lastMessageTime: "Ontem",
    nextAppointment: "Amanhã, 15:00",
    messages: [
      {
        id: 1,
        sender: "patient",
        text: "Doutor, fiz o exercício que você passou mas ainda tenho dificuldade.",
        timestamp: "14:00",
        read: true,
      },
      {
        id: 2,
        sender: "me",
        text: "João, vamos trabalhar isso na próxima sessão. Prepare um exemplo para discutirmos.",
        timestamp: "16:45",
        read: true,
      },
      {
        id: 3,
        sender: "patient",
        text: "Entendi. Vou preparar o exercício.",
        timestamp: "17:00",
        read: true,
      },
    ],
  },
  {
    id: 3,
    patientId: 3,
    name: "Ana Costa",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    status: "online",
    lastMessage: "Até quinta-feira!",
    unreadCount: 0,
    lastMessageTime: "Segunda",
    nextAppointment: "Quinta, 10:00",
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Ana, como foram os exercícios da semana?",
        timestamp: "09:00",
        read: true,
      },
      {
        id: 2,
        sender: "patient",
        text: "Foram bem! Consegui identificar os padrões que conversamos.",
        timestamp: "09:15",
        read: true,
      },
      {
        id: 3,
        sender: "me",
        text: "Excelente! Vamos aprofundar na próxima sessão.",
        timestamp: "09:20",
        read: true,
      },
      {
        id: 4,
        sender: "patient",
        text: "Até quinta-feira!",
        timestamp: "09:21",
        read: true,
      },
    ],
  },
  {
    id: 4,
    patientId: 4,
    name: "Pedro Oliveira",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "offline",
    lastMessage: "Obrigado doutor, até mais!",
    unreadCount: 0,
    lastMessageTime: "Terça",
    nextAppointment: "Próxima semana",
    messages: [
      {
        id: 1,
        sender: "patient",
        text: "Doutor, preciso remarcar nossa sessão.",
        timestamp: "08:00",
        read: true,
      },
      {
        id: 2,
        sender: "me",
        text: "Sem problemas Pedro. Que dia funciona melhor para você?",
        timestamp: "08:30",
        read: true,
      },
      {
        id: 3,
        sender: "patient",
        text: "Obrigado doutor, até mais!",
        timestamp: "08:35",
        read: true,
      },
    ],
  },
];

export default function SpecialistChatPage() {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] =
    useState<PatientConversation[]>(MOCK_CONVERSATIONS);

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
      <SpecialistHeader />

      <main className={styles.chat_layout}>
        {/* Sidebar - Patient List */}
        <aside
          className={`${styles.sidebar} ${activeChatId ? styles.hidden_on_mobile : ""}`}
        >
          <div className={styles.sidebar_header}>
            <h2 className={styles.sidebar_title}>Pacientes</h2>
          </div>

          <div className={styles.search_container}>
            <Search size={18} className={styles.search_icon} />
            <input
              type="text"
              placeholder="Buscar paciente..."
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
                  <p className={styles.last_message}>{chat.lastMessage}</p>
                  {chat.nextAppointment && (
                    <div className={styles.appointment_badge}>
                      📅 {chat.nextAppointment}
                    </div>
                  )}
                  {chat.unreadCount > 0 && (
                    <span className={styles.unread_badge}>
                      {chat.unreadCount}
                    </span>
                  )}
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
              <h3>Selecione um paciente</h3>
              <p>Escolha um paciente ao lado para visualizar a conversa.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
