"use client";

import { useState } from "react";
import styles from "./sessions.module.css";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import {
  ChevronLeft,
  ChevronRight,
  Video,
  Calendar,
  Clock,
} from "lucide-react";
import Image from "next/image";

// Mock data type
interface Session {
  id: number;
  specialistName: string;
  specialistImage: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  platform: string;
}

// Mock data for sessions
const SESSIONS: Session[] = [
  {
    id: 1,
    specialistName: "Dr. Everson Araujo",
    specialistImage: "https://randomuser.me/api/portraits/men/32.jpg",
    date: (() => {
      const d = new Date();
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    })(), // Today's date dynamic
    time: "14:00",
    duration: "50 min",
    status: "paid", // or scheduled
    platform: "google_meet",
  },
  {
    id: 2,
    specialistName: "Julia Ost",
    specialistImage: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "2024-02-15",
    time: "10:00",
    duration: "50 min",
    status: "paid",
    platform: "zoom",
  },
];

export default function SessionsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<Session | null>(null);

  // Calendar Logic (Simplified)
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(newDate);
  };

  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const hasSessionOnDate = (day: number) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const dateString = getFormattedDate(checkDate);
    return SESSIONS.some((session) => session.date === dateString);
  };

  const filteredSessions = SESSIONS.filter((session) => {
    return session.date === getFormattedDate(selectedDate);
  });

  const handleStartSession = (session: Session) => {
    setActiveSession(session);
    setIsModalOpen(true);
  };

  const handlePlatformSelect = (platform: "google_meet" | "zoom") => {
    // In a real app, this would redirect correctly
    window.open(
      platform === "google_meet"
        ? "https://meet.google.com"
        : "https://zoom.us",
      "_blank",
    );
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <DashboardHeader />

      <h1 className={styles.title}>Minhas Sessões</h1>

      <main className={styles.content}>
        {/* Calendar Section */}
        <section className={styles.calendar_section}>
          <header className={styles.calendar_header}>
            <button onClick={handlePrevMonth} className={styles.nav_btn}>
              <ChevronLeft size={20} />
            </button>
            <h2 className={styles.month_title}>
              {currentDate.toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={handleNextMonth} className={styles.nav_btn}>
              <ChevronRight size={20} />
            </button>
          </header>

          <div className={styles.calendar_grid}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className={styles.weekday}>
                {day}
              </div>
            ))}
            {/* Empty cells for potential offset */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear();
              const isSelected =
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.getFullYear() === currentDate.getFullYear();
              const hasSession = hasSessionOnDate(day);

              return (
                <div
                  key={day}
                  className={`${styles.day_cell} ${
                    isToday ? styles.day_cell_today : ""
                  } ${isSelected ? styles.day_cell_selected : ""} ${
                    hasSession ? styles.day_cell_has_session : ""
                  }`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </section>

        {/* Sessions List Section */}
        <section className={styles.sessions_list_section}>
          <h3 className={styles.section_subtitle}>
            Sessões para{" "}
            {selectedDate.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
            })}
          </h3>

          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div key={session.id} className={styles.session_card}>
                <div className={styles.session_info}>
                  <Image
                    src={session.specialistImage}
                    alt={session.specialistName}
                    width={50}
                    height={50}
                    className={styles.specialist_thumb}
                  />
                  <div className={styles.session_details}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <h3>{session.specialistName}</h3>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          background: "#DCFCE7",
                          color: "#166534",
                          padding: "0.1rem 0.4rem",
                          borderRadius: "4px",
                          fontWeight: 600,
                        }}
                      >
                        PAGA
                      </span>
                    </div>
                    <p>Terapia Individual</p>
                  </div>
                </div>

                <div className={styles.session_time}>
                  <Clock size={16} />
                  <span>
                    {session.time} - {session.duration}
                  </span>
                </div>

                <button
                  className={styles.start_session_btn}
                  onClick={() => handleStartSession(session)}
                >
                  <Video size={18} />
                  Iniciar Sessão
                </button>
              </div>
            ))
          ) : (
            <div className={styles.empty_state}>
              <Calendar
                size={48}
                style={{ opacity: 0.2, marginBottom: "1rem" }}
              />
              <p>Nenhuma sessão agendada para este dia.</p>
            </div>
          )}
        </section>
      </main>

      {/* Video Call Modal */}
      {isModalOpen && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <h2 className={styles.modal_title}>Iniciar Sessão</h2>
            <p className={styles.modal_desc}>
              Escolha a plataforma para iniciar sua sessão com{" "}
              <strong>{activeSession?.specialistName}</strong>.
            </p>

            <button
              className={styles.platform_btn}
              onClick={() => handlePlatformSelect("google_meet")}
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/2491px-Google_Meet_icon_%282020%29.svg.png"
                width={24}
                height={24}
                alt="Meet"
              />
              Entrar com Google Meet
            </button>

            <button
              className={styles.platform_btn}
              onClick={() => handlePlatformSelect("zoom")}
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/25/Zoom_Logo_2022.jpg"
                width={24}
                height={24}
                alt="Zoom"
                style={{ borderRadius: "4px" }}
              />
              Entrar com Zoom
            </button>

            <button
              className={styles.close_modal_btn}
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
