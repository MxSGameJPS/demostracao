"use client";

import { Sparkles, X, Smartphone, Search } from "lucide-react";
import DashboardHeader from "./components/DashboardHeader";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <DashboardHeader />

      <main className={styles.main}>
        {/* Welcome Section */}
        <section className={styles.welcome_card}>
          <div className={styles.welcome_content}>
            <h1>
              Boa tarde, <span style={{ fontWeight: 800 }}>Teste</span>
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span className={styles.objective_tag}>Saúde e bem estar</span>
              <div className={styles.session_status}>
                <span style={{ fontSize: "0.8rem" }}>🚫</span>
                Você ainda não realizou sessão
              </div>
            </div>
          </div>
          {/* Mock Illustration */}
          <div className={styles.welcome_illustration}>
            <div
              style={{
                width: "100px",
                height: "100px",
                background: "#EDE7F6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "3rem" }}>🧘</span>
            </div>
          </div>
        </section>

        {/* App Banner */}
        <section className={styles.banner}>
          <div className={styles.banner_content}>
            <div className={styles.app_icon_placeholder}>
              <Smartphone size={24} />
            </div>
            <div className={styles.banner_text}>
              <h3>Baixe o app do Equilibra Mind</h3>
              <p>
                Tenha uma experiência completa e não perca nada sobre suas
                sessões
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button className={styles.banner_btn}>Baixar aplicativo</button>
            <X size={16} color="#9CA3AF" style={{ cursor: "pointer" }} />
          </div>
        </section>

        {/* Start Here Section */}
        <section>
          <h2 className={styles.section_title}>Comece por aqui</h2>

          <div className={styles.action_card}>
            <div className={styles.card_content}>
              <div className={`${styles.card_icon} ${styles.icon_purple}`}>
                <Search size={24} color="white" />
              </div>
              <div className={styles.card_text}>
                <h3>Agende agora sua sessão</h3>
                <p>Encontre especialistas utilizando a busca</p>
              </div>
            </div>
            <button className={styles.action_btn}>
              Encontrar especialista
            </button>
          </div>

          
        </section>

        {/* Continue Exploring Section */}
        <section>
          <h2 className={styles.section_title}>Continue Explorando</h2>

          <div className={styles.explore_grid}>
            <div className={styles.explore_card}>
              <div className={styles.card_header}>
                <div className={styles.benefit_badge}>
                  <Sparkles size={12} />
                  Benefício corporativo
                </div>
                <X size={16} color="#9CA3AF" style={{ cursor: "pointer" }} />
              </div>
              <h3>Ative agora e tenha acesso à benefícios exclusivos</h3>
              <p>Cuide da sua saúde emocional e física</p>
              <button className={styles.activate_btn}>Ativar</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
