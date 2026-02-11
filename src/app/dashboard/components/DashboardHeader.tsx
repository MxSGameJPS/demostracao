"use client";

import {
  Sparkles,
  Home,
  Users,
  MessageCircle,
  Calendar,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "../dashboard.module.css";

export default function DashboardHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <Link href="/dashboard" className={styles.header_logo}>
          <Sparkles size={24} style={{ color: "white" }} />
          Equilibra Mind
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
          href="/dashboard"
          className={`${styles.nav_link} ${pathname === "/dashboard" ? styles.nav_link_active : ""}`}
        >
          <Home size={18} />
          Início
        </Link>

        <Link
          href="/especialistas"
          className={`${styles.nav_link} ${pathname.startsWith("/especialistas") ? styles.nav_link_active : ""}`}
        >
          <Users size={18} />
          Especialistas
        </Link>
        <Link
          href="/chat"
          className={`${styles.nav_link} ${pathname.startsWith("/chat") ? styles.nav_link_active : ""}`}
        >
          <MessageCircle size={18} />
          Chat
        </Link>
        <Link
          href="/sessoes"
          className={`${styles.nav_link} ${pathname === "/sessoes" ? styles.nav_link_active : ""}`}
        >
          <Calendar size={18} />
          Sessões
        </Link>
      </nav>

      <div className={styles.user_actions}>
        <button className={styles.icon_btn}>
          <Bell size={20} />
        </button>
        <Link href="/perfil" className={styles.avatar}>
          <User size={20} color="white" />
        </Link>
      </div>
    </header>
  );
}
