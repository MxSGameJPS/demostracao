"use client";

import { useState } from "react";
import SpecialistCard from "./SpecialistCard";
import styles from "./SpecialistGrid.module.css";

const SPECIALISTS_DATA = [
  {
    id: "1",
    name: "Dra. Ana Silva",
    image: "https://placehold.co/150/81D4FA/white?text=AS",
    specialty: "Psicóloga Clínica",
    experience: "8 anos de experiência",
    tags: ["Ansiedade", "Depressão", "Terapia Cognitivo-Comportamental"],
    bio: "Especialista em Terapia Cognitivo-Comportamental com foco em ansiedade e depressão.",
    rating: 4.8,
    review_count: 127,
    session_count: 850,
    price: 150,
    verified: true,
    slots: [
      { day: "SEG", date: "12/02", times: ["14:00", "15:00"] },
      { day: "QUA", date: "14/02", times: ["10:00", "11:00"] },
    ],
  },
  {
    id: "2",
    name: "Dr. Carlos Mendes",
    image: "https://placehold.co/150/A5D6A7/white?text=CM",
    specialty: "Terapeuta de Casal",
    experience: "12 anos de experiência",
    tags: ["Relacionamentos", "Comunicação", "Conflitos Familiares"],
    bio: "Terapeuta especializado em dinâmicas de casal e família.",
    rating: 4.9,
    review_count: 203,
    session_count: 1240,
    price: 200,
    verified: true,
    slots: [
      { day: "TER", date: "13/02", times: ["18:00", "19:00"] },
      { day: "QUI", date: "15/02", times: ["19:00", "20:00"] },
    ],
  },
  {
    id: "3",
    name: "Julia Ramos",
    image: "https://placehold.co/150/CE93D8/white?text=JR",
    specialty: "Coach de Carreira",
    experience: "6 anos de experiência",
    tags: ["Carreira", "Liderança", "Transição Profissional"],
    bio: "Coach profissional focada em desenvolvimento de carreira e liderança.",
    rating: 4.7,
    review_count: 98,
    session_count: 620,
    price: 180,
    verified: true,
    slots: [
      { day: "SEG", date: "12/02", times: ["09:00", "10:00"] },
      { day: "SEX", date: "16/02", times: ["15:00", "16:00"] },
    ],
  },
  {
    id: "4",
    name: "Roberto Souza",
    image: "https://placehold.co/150/FFAB91/white?text=RS",
    specialty: "Psicanalista",
    experience: "15 anos de experiência",
    tags: ["Autoestima", "Traumas", "Insegurança"],
    bio: "Psicanalista com vasta experiência em processos de autoconhecimento.",
    rating: 5.0,
    review_count: 312,
    session_count: 2100,
    price: 160,
    verified: true,
    slots: [
      { day: "TER", date: "13/02", times: ["16:00", "17:00"] },
      { day: "QUI", date: "15/02", times: ["14:00", "15:00"] },
    ],
  },
];

const FILTERS = [
  "Todos",
  "Ansiedade",
  "Carreira",
  "Relacionamentos",
  "Autoestima",
];

export default function SpecialistGrid() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredData =
    activeFilter === "Todos"
      ? SPECIALISTS_DATA
      : SPECIALISTS_DATA.filter((s) => s.tags.includes(activeFilter));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Encontre o especialista ideal para você</h2>

      <div className={styles.filters}>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`${styles.filter_button} ${activeFilter === filter ? styles.active : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredData.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            viewMode="grid"
          />
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className={styles.empty_state}>
          Nenhum especialista encontrado para este filtro.
        </p>
      )}
    </div>
  );
}
