"use client";

import { useModal } from "@/context/ModalContext";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const { openSignup } = useModal();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Sua jornada para o equilíbrio começa aqui
        </motion.h1>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Conecte-se com especialistas verificados e inicie sua transformação
          emocional com segurança e privacidade. Uma plataforma que cuida de
          quem você é.
        </motion.p>

        <motion.div
          className={styles.cta_container}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button className={styles.cta_primary} onClick={openSignup}>
            Agendar Sessão
          </button>
          <button className={styles.cta_secondary}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <PlayCircle size={20} />
              Como Funciona
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
