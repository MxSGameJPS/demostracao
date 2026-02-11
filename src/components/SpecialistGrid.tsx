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
    tags: ["Ansiedade", "Depressão", "Terapia Cognitivo-Comportamental"],
    price: 150,
    slots: [
      { day: "SEG", time: "14:00" },
      { day: "QUA", time: "10:00" },
    ],
  },
  {
    id: "2",
    name: "Dr. Carlos Mendes",
    image: "https://placehold.co/150/A5D6A7/white?text=CM",
    specialty: "Terapeuta de Casal",
    tags: ["Relacionamentos", "Comunicação", "Conflitos Familiares"],
    price: 200,
    slots: [
      { day: "TER", time: "18:00" },
      { day: "QUI", time: "19:00" },
    ],
  },
  {
    id: "3",
    name: "Julia Ramos",
    image: "https://placehold.co/150/CE93D8/white?text=JR",
    specialty: "Coach de Carreira",
    tags: ["Carreira", "Liderança", "Transição Profissional"],
    price: 180,
    slots: [
      { day: "SEG", time: "09:00" },
      { day: "SEX", time: "15:00" },
    ],
  },
  {
    id: "4",
    name: "Roberto Souza",
    image: "https://placehold.co/150/FFAB91/white?text=RS",
    specialty: "Psicanalista",
    tags: ["Autoestima", "Traumas", "Insegurança"],
    price: 160,
    slots: [
      { day: "QUA", time: "11:00" },
      { day: "SEX", time: "16:00" },
    ],
  },
  {
    id: "5",
    name: "Fernanda Lima",
    image: "https://placehold.co/150/FFF59D/333?text=FL",
    specialty: "Psicóloga",
    tags: ["Ansiedade", "Burnout", "Stress"],
    price: 190,
    slots: [
      { day: "TER", time: "13:00" },
      { day: "QUI", time: "17:00" },
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
          <SpecialistCard key={specialist.id} {...specialist} verified={true} />
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
