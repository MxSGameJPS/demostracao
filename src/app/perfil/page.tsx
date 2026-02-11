"use client";

import styles from "./profile.module.css";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit2,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock User Data
const USER_DATA = {
  name: "Teste User",
  email: "teste@equilibramind.com",
  role: "Membro Premium",
  phone: "(11) 99999-9999",
  location: "São Paulo, SP",
  bio: "Estou em busca de equilíbrio emocional e bem-estar no dia a dia. Participo ativamente das sessões de terapia em grupo.",
  memberSince: "Janeiro 2024",
};

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <DashboardHeader />

      <main className={styles.content}>
        {/* Back Button for mobile mainly */}
        <div style={{ marginBottom: "1rem" }}>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#6b7280",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            <ArrowLeft size={16} />
            Voltar para Dashboard
          </Link>
        </div>

        {/* Header Card */}
        <div className={styles.profile_header}>
          <div className={styles.header_bg}></div>

          <div className={styles.avatar_container}>
            <div
              className={styles.avatar}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#e0e0e0",
                color: "#757575",
              }}
            >
              <User size={48} />
            </div>
            {/* Ideally utilize next/image if real avatar url exists */}
          </div>

          <div className={styles.user_info}>
            <h1 className={styles.user_name}>{USER_DATA.name}</h1>
            <span className={styles.user_role}>{USER_DATA.role}</span>
          </div>

          <button className={styles.edit_btn}>
            <Edit2 size={16} />
            Editar
          </button>
        </div>

        {/* Personal Info */}
        <section className={styles.section_card}>
          <h2 className={styles.section_title}>
            <User size={20} color="#512DA8" />
            Informações Pessoais
          </h2>

          <div className={styles.info_grid}>
            <div className={styles.info_group}>
              <span className={styles.label}>Nome Completo</span>
              <span className={styles.value}>{USER_DATA.name}</span>
            </div>

            <div className={styles.info_group}>
              <span className={styles.label}>Biografia</span>
              <span
                className={styles.value}
                style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
              >
                {USER_DATA.bio}
              </span>
            </div>

            <div className={styles.info_group}>
              <span className={styles.label}>Membro desde</span>
              <span className={styles.value}>{USER_DATA.memberSince}</span>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className={styles.section_card}>
          <h2 className={styles.section_title}>
            <Mail size={20} color="#512DA8" />
            Contato
          </h2>

          <div className={styles.info_grid}>
            <div className={styles.info_group}>
              <span className={styles.label}>Email</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Mail size={16} color="#9ca3af" />
                <span className={styles.value}>{USER_DATA.email}</span>
              </div>
            </div>

            <div className={styles.info_group}>
              <span className={styles.label}>Telefone</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Phone size={16} color="#9ca3af" />
                <span className={styles.value}>{USER_DATA.phone}</span>
              </div>
            </div>

            <div className={styles.info_group}>
              <span className={styles.label}>Localização</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <MapPin size={16} color="#9ca3af" />
                <span className={styles.value}>{USER_DATA.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Security / Account Mock */}
        <section className={styles.section_card}>
          <h2 className={styles.section_title}>
            <Shield size={20} color="#512DA8" />
            Segurança
          </h2>

          <div className={styles.info_grid}>
            <div className={styles.info_group}>
              <span className={styles.label}>Senha</span>
              <span className={styles.value}>••••••••••••</span>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#512DA8",
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 0,
                  marginTop: "0.25rem",
                  fontSize: "0.85rem",
                }}
              >
                Alterar senha
              </button>
            </div>
          </div>
        </section>

        <div className={styles.logout_section}>
          <button
            className={styles.logout_btn}
            onClick={() => {
              // Mock logout logic
              alert("Você saiu da conta (Simulação)");
              router.push("/");
            }}
          >
            <LogOut size={18} />
            Sair da Conta
          </button>
        </div>
      </main>
    </div>
  );
}
