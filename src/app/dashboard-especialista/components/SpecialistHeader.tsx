"use client";

import {
  Sparkles,
  Home,
  Calendar,
  MessageCircle,
  Users,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./specialist.module.css";

export default function SpecialistHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <Link href="/dashboard-especialista" className={styles.header_logo}>
          <Sparkles size={24} style={{ color: "white" }} />
          Equilibra Mind - Especialista
        </Link>

        <button
          className={styles.mobile_menu_toggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav
        className={`${styles.nav} ${isMobileMenuOpen ? styles.nav_open : ""}`}
      >
        <Link
          href="/dashboard-especialista"
          className={`${styles.nav_link} ${pathname === "/dashboard-especialista" ? styles.nav_link_active : ""}`}
        >
          <Home size={18} />
          Início
        </Link>
        <Link
          href="/dashboard-especialista/agenda"
          className={`${styles.nav_link} ${pathname.startsWith("/dashboard-especialista/agenda") ? styles.nav_link_active : ""}`}
        >
          <Calendar size={18} />
          Agenda
        </Link>
        <Link
          href="/dashboard-especialista/chat"
          className={`${styles.nav_link} ${pathname.startsWith("/dashboard-especialista/chat") ? styles.nav_link_active : ""}`}
        >
          <MessageCircle size={18} />
          Pacientes
        </Link>
        <Link
          href="/dashboard-especialista/perfil"
          className={`${styles.nav_link} ${pathname.startsWith("/dashboard-especialista/perfil") ? styles.nav_link_active : ""}`}
        >
          <Users size={18} />
          Meu Perfil
        </Link>
      </nav>

      <div className={styles.user_actions}>
        <button className={styles.icon_btn}>
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}
