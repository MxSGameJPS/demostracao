"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  User,
} from "lucide-react";
import Image from "next/image";
import styles from "./SpecialistProfile.module.css";

export default function SpecialistProfile({ id }: { id: string }) {
  // Mock data - in real app would fetch based on ID
  const specialist = {
    name: "Dra. Ana Silva",
    image: "https://placehold.co/150/81D4FA/white?text=AS",
    role: "Psicóloga Clínica (CRP 06/12345)",
    price: 150.0,
    bio: "Especialista em Terapia Cognitivo-Comportamental com mais de 10 anos de experiência clínica. Acredito que o autoconhecimento é a chave para uma vida equilibrada e plena. Minha abordagem é focada em resultados práticos e acolhimento humanizado.",
    specialties: [
      "Ansiedade",
      "Depressão",
      "Autoestima",
      "Burnout",
      "Stress",
      "Desenvolvimento Pessoal",
    ],
    formation: [
      {
        degree: "Graduação em Psicologia",
        institution: "Universidade de São Paulo (USP)",
        year: "2012",
      },
      {
        degree: "Mestrado em Psicologia Clínica",
        institution: "PUC-SP",
        year: "2015",
      },
      {
        degree: "Especialização em TCC",
        institution: "ITC - Instituto de Terapia Cognitiva",
        year: "2016",
      },
    ],
    experience: [
      {
        role: "Psicóloga Clínica",
        company: "Consultório Particular",
        period: "2016 - Atual",
      },
      {
        role: "Psicóloga Hospitalar",
        company: "Hospital Albert Einstein",
        period: "2014 - 2016",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <motion.aside
        className={styles.sidebar}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ position: "relative", width: 150, height: 150 }}>
          <Image
            src={specialist.image}
            alt={specialist.name}
            fill
            className={styles.avatar}
          />
        </div>

        <div className={styles.name_wrapper}>
          <h1 className={styles.name}>{specialist.name}</h1>
          <p className={styles.role}>{specialist.role}</p>
        </div>

        <div className={styles.price_card}>
          <p className={styles.price_label}>Valor da sessão (50 min)</p>
          <p className={styles.price_value}>R$ {specialist.price.toFixed(2)}</p>
        </div>

        <button className={styles.schedule_btn}>Agendar Horário</button>
      </motion.aside>

      <motion.main
        className={styles.main_content}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <User size={24} /> Sobre mim
          </h2>
          <p className={styles.bio}>{specialist.bio}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <CheckCircle2 size={24} /> Áreas de Atuação
          </h2>
          <div className={styles.tags}>
            {specialist.specialties.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <BookOpen size={24} /> Formação Acadêmica
          </h2>
          <div className={styles.experience_list}>
            {specialist.formation.map((item, i) => (
              <div key={i} className={styles.experience_item}>
                <p className={styles.exp_role}>{item.degree}</p>
                <p className={styles.exp_company}>{item.institution}</p>
                <p className={styles.exp_date}>{item.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.section_title}>
            <Briefcase size={24} /> Experiência Profissional
          </h2>
          <div className={styles.experience_list}>
            {specialist.experience.map((item, i) => (
              <div key={i} className={styles.experience_item}>
                <p className={styles.exp_role}>{item.role}</p>
                <p className={styles.exp_company}>{item.company}</p>
                <p className={styles.exp_date}>{item.period}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.main>
    </div>
  );
}
