"use client";

import { motion } from "framer-motion";
import { Award, Building2, User } from "lucide-react";
import Link from "next/link";
import styles from "./SignupModal.module.css";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        layoutId="modal"
      >
        <button className={styles.close_button} onClick={onClose}>
          ✕
        </button>
        <div className={styles.header_content}>
          <h2 className={styles.title}>
            Como você quer criar a sua conta Equilibra Mind?
          </h2>
          <p className={styles.subtitle}>
            Selecione a opção que deseja criar a sua conta:
          </p>
        </div>

        <div className={styles.options_container}>
          <Link
            href="/cadastro"
            className={styles.option_card}
            onClick={onClose}
          >
            <div className={styles.icon_wrapper}>
              <User size={24} />
            </div>
            <div className={styles.text_content}>
              <h3 className={styles.option_title}>Cliente</h3>
              <p className={styles.option_desc}>
                Quero fazer sessões de terapias e ver conteúdos sobre saúde
                emocional
              </p>
            </div>
          </Link>

          <Link
            href="/cadastro"
            className={styles.option_card}
            onClick={onClose}
          >
            <div className={styles.icon_wrapper}>
              <Award size={24} />
            </div>
            <div className={styles.text_content}>
              <h3 className={styles.option_title}>Especialista</h3>
              <p className={styles.option_desc}>
                Quero atender pacientes online e fazer gestão da minha carreira
              </p>
            </div>
          </Link>

          <Link
            href="/cadastro"
            className={styles.option_card}
            onClick={onClose}
          >
            <div className={styles.icon_wrapper}>
              <Building2 size={24} />
            </div>
            <div className={styles.text_content}>
              <h3 className={styles.option_title}>Empresa</h3>
              <p className={styles.option_desc}>
                Quero promover bem-estar emocional aos meus colaboradores
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
