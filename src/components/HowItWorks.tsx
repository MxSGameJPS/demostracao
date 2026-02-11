"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Search, Users } from "lucide-react";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Busque com Facilidade",
      description:
        "Filtre por especialidade, preço ou disponibilidade e encontre o profissional ideal para você.",
      delay: 0,
    },
    {
      icon: CalendarCheck,
      title: "Agende em Segundos",
      description:
        "Escolha o melhor horário na agenda do especialista e confirme sua sessão instantaneamente.",
      delay: 0.2,
    },
    {
      icon: Users,
      title: "Inicie sua Jornada",
      description:
        "Realize sua sessão por vídeo chamada segura e comece a transformar sua saúde emocional.",
      delay: 0.4,
    },
  ];

  return (
    <section className={styles.section}>
      <motion.h2
        className={styles.headline}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Como funciona a Equilibra Mind
      </motion.h2>

      <div className={styles.grid}>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: step.delay }}
          >
            <div className={styles.icon_wrapper}>
              <step.icon size={32} color="#0288D1" />
            </div>
            <div className={styles.step_number}>{index + 1}</div>
            <h3 className={styles.step_title}>{step.title}</h3>
            <p className={styles.step_desc}>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
