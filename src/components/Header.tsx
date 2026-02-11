"use client";

import { useModal } from "@/context/ModalContext";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const { openSignup } = useModal();
  const pathname = usePathname();

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/especialistas") ||
    pathname.startsWith("/sessoes") ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/perfil")
  ) {
    return null;
  }

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Sparkles size={24} color="#CE93D8" />
          <span
            style={{
              background: "linear-gradient(to right, #81D4FA, #CE93D8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Equilibra Mind
          </span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Início
          </Link>
          <Link href="/especialistas" className={styles.link}>
            Especialistas
          </Link>
          <Link href="#" className={styles.link}>
            Para Empresas
          </Link>
          <button className={styles.cta} onClick={openSignup}>
            Agendar Sessão
          </button>
          <Link
            href="/login"
            className={styles.link}
            style={{ fontWeight: 600 }}
          >
            Entrar
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
