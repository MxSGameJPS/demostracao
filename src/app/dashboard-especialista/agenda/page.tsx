"use client";

import { useState } from "react";
import styles from "./agenda.module.css";
import SpecialistHeader from "../components/SpecialistHeader";
import { ChevronLeft, ChevronRight, Plus, Clock, User, X } from "lucide-react";

// Types
interface TimeSlot {
  id: number;
  date: string;
  time: string;
  duration: number; // in minutes
  isAvailable: boolean;
  patientName?: string;
  patientId?: number;
}

// Mock Data
const MOCK_SLOTS: TimeSlot[] = [
  {
    id: 1,
    date: "2026-02-12",
    time: "09:00",
    duration: 50,
    isAvailable: false,
    patientName: "Maria Silva",
    patientId: 1,
  },
  {
    id: 2,
    date: "2026-02-12",
    time: "10:00",
    duration: 50,
    isAvailable: true,
  },
  {
    id: 3,
    date: "2026-02-12",
    time: "14:00",
    duration: 50,
    isAvailable: false,
    patientName: "João Santos",
    patientId: 2,
  },
  {
    id: 4,
    date: "2026-02-13",
    time: "10:00",
    duration: 50,
    isAvailable: false,
    patientName: "Ana Costa",
    patientId: 3,
  },
  {
    id: 5,
    date: "2026-02-13",
    time: "14:00",
    duration: 50,
    isAvailable: true,
  },
  {
    id: 6,
    date: "2026-02-13",
    time: "15:00",
    duration: 50,
    isAvailable: true,
  },
  {
    id: 7,
    date: "2026-02-14",
    time: "09:00",
    duration: 50,
    isAvailable: true,
  },
];

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>(MOCK_SLOTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: "",
    time: "",
    duration: 50,
  });

  // Calendar functions
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(clickedDate);
  };

  const getSlotsForDate = (dateString: string) => {
    return slots.filter((slot) => slot.date === dateString);
  };

  const hasAppointment = (day: number) => {
    const dateString = formatDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    );
    return slots.some((slot) => slot.date === dateString && !slot.isAvailable);
  };

  const hasAvailableSlot = (day: number) => {
    const dateString = formatDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
    );
    return slots.some((slot) => slot.date === dateString && slot.isAvailable);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleAddSlot = () => {
    if (selectedDate) {
      setNewSlot({
        ...newSlot,
        date: formatDate(selectedDate),
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmitSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSlot.date && newSlot.time) {
      const slot: TimeSlot = {
        id: Date.now(),
        date: newSlot.date,
        time: newSlot.time,
        duration: newSlot.duration,
        isAvailable: true,
      };
      setSlots([...slots, slot]);
      setIsModalOpen(false);
      setNewSlot({
        date: "",
        time: "",
        duration: 50,
      });
    }
  };

  const handleDeleteSlot = (slotId: number) => {
    if (confirm("Tem certeza que deseja remover este horário?")) {
      setSlots(slots.filter((slot) => slot.id !== slotId));
    }
  };

  const selectedDateSlots = selectedDate
    ? getSlotsForDate(formatDate(selectedDate))
    : [];

  return (
    <div className={styles.container}>
      <SpecialistHeader />

      <main className={styles.content}>
        {/* Header */}
        <div className={styles.header_section}>
          <h1 className={styles.page_title}>Agenda</h1>
          <button className={styles.add_slot_btn} onClick={handleAddSlot}>
            <Plus size={20} />
            Adicionar Horário
          </button>
        </div>

        <div className={styles.calendar_grid_layout}>
          {/* Calendar */}
          <div className={styles.calendar_section}>
            <div className={styles.calendar_header}>
              <h2 className={styles.month_title}>
                {currentDate.toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className={styles.nav_buttons}>
                <button className={styles.nav_btn} onClick={handlePrevMonth}>
                  <ChevronLeft size={18} />
                </button>
                <button className={styles.nav_btn} onClick={handleNextMonth}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className={styles.calendar_grid}>
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className={styles.day_header}>
                  {day}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className={`${styles.day_cell} ${styles.day_cell_disabled}`}
                ></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const isSelected =
                  selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === currentDate.getMonth() &&
                  selectedDate?.getFullYear() === currentDate.getFullYear();

                return (
                  <div
                    key={day}
                    className={`${styles.day_cell} ${
                      isSelected ? styles.day_cell_selected : ""
                    } ${isToday(day) ? styles.day_cell_today : ""}`}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className={styles.day_number}>{day}</div>
                    <div className={styles.day_indicators}>
                      {hasAppointment(day) && (
                        <div
                          className={`${styles.indicator_dot} ${styles.indicator_appointment}`}
                        ></div>
                      )}
                      {hasAvailableSlot(day) && (
                        <div
                          className={`${styles.indicator_dot} ${styles.indicator_available}`}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar_panel}>
            <div className={styles.sidebar_card}>
              <h3 className={styles.sidebar_title}>
                {selectedDate
                  ? selectedDate.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                    })
                  : "Selecione uma data"}
              </h3>

              {selectedDateSlots.length > 0 ? (
                <div className={styles.time_slots_list}>
                  {selectedDateSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`${styles.time_slot_item} ${
                        !slot.isAvailable ? styles.time_slot_item_booked : ""
                      }`}
                    >
                      <div className={styles.time_slot_info}>
                        <Clock size={16} color="#6b7280" />
                        <div>
                          <div className={styles.time_text}>{slot.time}</div>
                          {slot.patientName && (
                            <div className={styles.patient_name}>
                              {slot.patientName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          className={`${styles.slot_badge} ${
                            slot.isAvailable
                              ? styles.badge_available
                              : styles.badge_booked
                          }`}
                        >
                          {slot.isAvailable ? "Disponível" : "Agendado"}
                        </span>
                        {slot.isAvailable && (
                          <button
                            className={styles.delete_btn}
                            onClick={() => handleDeleteSlot(slot.id)}
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  style={{
                    color: "#9ca3af",
                    textAlign: "center",
                    padding: "2rem 0",
                  }}
                >
                  {selectedDate
                    ? "Nenhum horário configurado para este dia"
                    : "Selecione uma data para ver os horários"}
                </p>
              )}
            </div>

            {/* Legend */}
            <div className={styles.sidebar_card}>
              <h3 className={styles.sidebar_title}>Legenda</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    className={`${styles.indicator_dot} ${styles.indicator_appointment}`}
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                  <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                    Consulta Agendada
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    className={`${styles.indicator_dot} ${styles.indicator_available}`}
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                  <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                    Horário Disponível
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={styles.modal_overlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modal_title}>Adicionar Horário Disponível</h2>

            <form onSubmit={handleSubmitSlot}>
              <div className={styles.form_group}>
                <label className={styles.form_label}>Data</label>
                <input
                  type="date"
                  className={styles.form_input}
                  value={newSlot.date}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.form_label}>Horário</label>
                <input
                  type="time"
                  className={styles.form_input}
                  value={newSlot.time}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, time: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.form_label}>Duração (minutos)</label>
                <select
                  className={styles.form_select}
                  value={newSlot.duration}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, duration: Number(e.target.value) })
                  }
                >
                  <option value={30}>30 minutos</option>
                  <option value={50}>50 minutos</option>
                  <option value={60}>60 minutos</option>
                  <option value={90}>90 minutos</option>
                </select>
              </div>

              <div className={styles.modal_actions}>
                <button
                  type="button"
                  className={styles.btn_cancel}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.btn_submit}>
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
