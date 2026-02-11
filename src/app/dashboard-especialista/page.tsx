"use client";

import styles from "./components/specialist.module.css";
import SpecialistHeader from "./components/SpecialistHeader";
import { Calendar, Clock, Plus, Settings } from "lucide-react";

// Mock data for appointments
const APPOINTMENTS = [
  {
    id: 1,
    patientName: "Maria Silva",
    date: "2026-02-12",
    time: "14:00",
    duration: "50 min",
    status: "confirmed",
    type: "Terapia Individual",
  },
  {
    id: 2,
    patientName: "João Santos",
    date: "2026-02-12",
    time: "15:00",
    duration: "50 min",
    status: "confirmed",
    type: "Consulta Inicial",
  },
  {
    id: 3,
    patientName: "Ana Costa",
    date: "2026-02-13",
    time: "10:00",
    duration: "50 min",
    status: "pending",
    type: "Terapia de Casal",
  },
  {
    id: 4,
    patientName: "Pedro Oliveira",
    date: "2026-02-13",
    time: "16:00",
    duration: "50 min",
    status: "confirmed",
    type: "Terapia Individual",
  },
];

const AVAILABILITY_SLOTS = [
  { day: "Segunda", times: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
  { day: "Terça", times: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
  { day: "Quarta", times: ["09:00", "14:00", "15:00"] },
  { day: "Quinta", times: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
  { day: "Sexta", times: ["09:00", "10:00", "14:00"] },
];

export default function SpecialistDashboard() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
  };

  const todayAppointments = APPOINTMENTS.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0],
  );

  return (
    <div className={styles.container}>
      <SpecialistHeader />

      <main className={styles.main}>
        {/* Welcome Card */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.75rem",
              margin: "0 0 0.5rem 0",
              color: "var(--color-heading)",
            }}
          >
            Bem-vindo, Dr. Especialista! 👋
          </h1>
          <p style={{ color: "#6b7280", margin: 0 }}>
            Você tem {todayAppointments.length} consultas agendadas para hoje
          </p>
        </div>

        <div className={styles.grid_layout}>
          {/* Appointments Section */}
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--color-heading)",
                  margin: 0,
                }}
              >
                Próximas Consultas
              </h2>
              <button
                style={{
                  background: "var(--color-secondary)",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Plus size={18} />
                Nova Consulta
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {APPOINTMENTS.map((apt) => (
                <div
                  key={apt.id}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "var(--shadow-sm)",
                    border:
                      apt.status === "confirmed"
                        ? "2px solid #e0f2f1"
                        : "2px solid #fff3e0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 0.25rem 0",
                          fontSize: "1.1rem",
                          color: "var(--color-heading)",
                        }}
                      >
                        {apt.patientName}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          color: "#6b7280",
                          fontSize: "0.9rem",
                        }}
                      >
                        {apt.type}
                      </p>
                    </div>
                    <span
                      style={{
                        background:
                          apt.status === "confirmed" ? "#e0f2f1" : "#fff3e0",
                        color:
                          apt.status === "confirmed" ? "#00897b" : "#f57c00",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {apt.status === "confirmed" ? "Confirmado" : "Pendente"}
                    </span>
                  </div>

                  <div
                    style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Calendar size={16} color="#9ca3af" />
                      <span style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                        {formatDate(apt.date)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Clock size={16} color="#9ca3af" />
                      <span style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                        {apt.time} ({apt.duration})
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      style={{
                        flex: 1,
                        background: "var(--color-primary)",
                        color: "white",
                        border: "none",
                        padding: "0.5rem",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      Ver Detalhes
                    </button>
                    <button
                      style={{
                        background: "white",
                        color: "#6b7280",
                        border: "1px solid #e5e7eb",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Availability Configuration */}
          <aside>
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--color-heading)",
                    margin: 0,
                  }}
                >
                  Disponibilidade
                </h2>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    cursor: "pointer",
                  }}
                >
                  <Settings size={18} />
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {AVAILABILITY_SLOTS.map((slot, idx) => (
                  <div
                    key={idx}
                    style={{
                      paddingBottom: "1rem",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#374151",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {slot.day}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      {slot.times.map((time, timeIdx) => (
                        <span
                          key={timeIdx}
                          style={{
                            background: "#f3f4f6",
                            color: "#4b5563",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "6px",
                            fontSize: "0.8rem",
                          }}
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  background: "white",
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-primary)",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Plus size={18} />
                Adicionar Horário
              </button>
            </div>

            {/* Quick Stats */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "var(--shadow-sm)",
                marginTop: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-heading)",
                  margin: "0 0 1rem 0",
                }}
              >
                Estatísticas Rápidas
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Pacientes Ativos
                  </span>
                  <span style={{ fontWeight: 600, color: "#374151" }}>24</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Consultas este mês
                  </span>
                  <span style={{ fontWeight: 600, color: "#374151" }}>67</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Taxa de comparecimento
                  </span>
                  <span style={{ fontWeight: 600, color: "#00897b" }}>94%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
