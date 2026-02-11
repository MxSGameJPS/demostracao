"use client";

import {
  PlayCircle,
  Heart,
  Star,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./profile.module.css";
import specialistsData from "@/data/specialists.json";

export default function SpecialistProfilePage() {
  const { id } = useParams();
  const specialist =
    specialistsData.find((s) => s.id === id) || specialistsData[0]; // Fallback to first if not found for demo

  // Mock Reviews Data based on screenshot
  const reviews = [
    {
      name: "Diana",
      date: "Dezembro, 2024",
      rating: 5,
      text: "Recomendo bastante! O processo fluiu com muita naturalidade. Apenas de ser via internet, nos planos atuais, ajudou no horizonte e compreensão da minha pessoa! Muito obrigado pela tempo disponibilizado!",
    },
    {
      name: "Taís",
      date: "Janeiro, 2025",
      rating: 5,
      text: "Estou muito contente com encontrar um profissional como ele. O contato, que já pela descrição e seu perfil, é possível notar a grande bagagem que possui para auxilhar os seus pacientes. É nitida e diferente as participações da minha primeira sessão, com um olhar atento aos meus questionamentos.",
    },
    {
      name: "Bernardo",
      date: "Outubro, 2024",
      rating: 5,
      text: "Olá! Everson é um excelente profissional. Tem habilidade em interpretar os relatos e fazer pontuações ótimas. Na primeira sessão, já consegui ter reflexões profundas sobre as questões que trouxe pra ele. Recomendadíssimo!",
    },
    {
      name: "Felipe",
      date: "Junho, 2024",
      rating: 4,
      text: "Estou gostando muito da abordagem dele",
    },
    {
      name: "Natalia",
      date: "Março, 2024",
      rating: 5,
      text: "Direto e acolhedor, Everson é um profissional excepcional. Me recebe nas sessões com cuidado, incentivando a reflexão sobre os temas discutidos e oferece materiais de apoio para auxiliar no processo. Recomendo!",
    },
    {
      name: "Janaina",
      date: "Agosto, 2025",
      rating: 5,
      text: "Após apenas três sessões, já consigo perceber mudanças significativas na forma como me compreendo e lido com questões internas. Nossas conversas me ajudam a identificar 'pontos cegos' que antes passavam despercebidos, trazendo mais clareza e organização emocional.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header (Same as Specialists Page) */}
      <header className={styles.header}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            <Sparkles />
            Equilibra Mind
          </Link>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              href="/especialistas"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ChevronLeft size={16} /> Voltar para lista
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Card Area */}
      <div className={styles.profile_header_card}>
        <div className={styles.bg_purple_top}></div>
        <div className={styles.profile_content}>
          {/* Left Info */}
          <div className={styles.profile_info}>
            <div className={styles.main_info}>
              <Image
                src={specialist.image}
                alt={specialist.name}
                className={styles.avatar_large}
                width={100}
                height={100}
              />
              <div>
                <div className={styles.name_section}>
                  <h1>{specialist.name}</h1>
                  <Heart
                    size={20}
                    color="#9CA3AF"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <p className={styles.specialty_subtitle}>
                  {specialist.specialty}
                </p>
                {specialist.video_url && (
                  <button className={styles.video_btn}>
                    <PlayCircle size={16} fill="red" color="white" />
                    ver vídeo de apresentação
                  </button>
                )}
              </div>
            </div>

            <div className={styles.tags_row}>
              {specialist.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <p className={styles.bio_text}>{specialist.bio}</p>

            <div className={styles.stats_bar}>
              <div className={styles.stat_item}>
                <Star size={16} fill="#FFB300" color="#FFB300" />
                {specialist.rating}
                <span className={styles.stat_label}>
                  ({specialist.review_count} comentários)
                </span>
              </div>
              <div className={styles.stat_item}>
                <User size={16} />
                {specialist.session_count}
                <span className={styles.stat_label}>atendimentos</span>
              </div>
            </div>

            <div className={styles.price_footer}>
              <span style={{ fontSize: "0.9rem", color: "#6B7280" }}>
                Sessão 50 min
              </span>
              <span className={styles.price_val}>
                R$ {specialist.price.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Right Calendar Sidebar */}
          <div className={styles.calendar_sidebar}>
            <div className={styles.calendar_nav}>
              <button
                style={{
                  background: "#E0E7FF",
                  border: "none",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={16} color="#512DA8" />
              </button>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div className={styles.cal_day_col}>
                  <div className={styles.cal_day_name}>QUA</div>
                  <div className={styles.cal_day_num}>11</div>
                  <div style={{ fontSize: "0.6rem", color: "#9CA3AF" }}>
                    FEV
                  </div>
                </div>
                <div className={styles.cal_day_col}>
                  <div className={styles.cal_day_name}>QUI</div>
                  <div className={styles.cal_day_num}>12</div>
                  <div style={{ fontSize: "0.6rem", color: "#9CA3AF" }}>
                    FEV
                  </div>
                </div>
                <div className={styles.cal_day_col}>
                  <div className={styles.cal_day_name}>SEX</div>
                  <div className={styles.cal_day_num}>13</div>
                  <div style={{ fontSize: "0.6rem", color: "#9CA3AF" }}>
                    FEV
                  </div>
                </div>
              </div>
              <button
                style={{
                  background: "#512DA8",
                  border: "none",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={16} color="white" />
              </button>
            </div>

            <div className={styles.time_slots_grid}>
              <div className={styles.slot_column}>
                {/* Empty for Wed */}
                <span style={{ textAlign: "center", color: "#E5E7EB" }}>-</span>
              </div>
              <div className={styles.slot_column}>
                <button className={styles.time_btn}>08:00</button>
                <button className={styles.time_btn}>14:00</button>
                <button className={styles.time_btn}>20:00</button>
              </div>
              <div className={styles.slot_column}>
                <button className={styles.time_btn}>09:00</button>
                <button className={styles.time_btn}>11:00</button>
              </div>
            </div>

            <div
              style={{
                marginTop: "2rem",
                textAlign: "center",
                fontSize: "0.9rem",
                color: "#6B7280",
              }}
            >
              Selecione uma data
            </div>
            <button className={styles.schedule_btn} disabled>
              agendar
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Info Sections */}
      <div className={styles.details_section}>
        <h2 className={styles.section_title}>Perfil</h2>

        <div className={styles.info_block}>
          <div className={styles.block_label}>EXPERIÊNCIA</div>
          <div className={styles.block_content}>
            <ul className={styles.list_items}>
              {specialist.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
              <li>neuroatuação profissional</li>
              <li>relacionamentos / conflitos familiares</li>
              <li>transtorno de déficit de atenção e hiperatividade (TDAH)</li>
            </ul>
          </div>
        </div>

        <div className={styles.info_block}>
          <div className={styles.block_label}>ESPECIALIDADES</div>
          <div className={styles.block_content}>
            <ul className={styles.list_items}>
              <li>Abordagem fenomenológica</li>
              <li>psicanálise</li>
              <li>terapia junguiana</li>
            </ul>
          </div>
        </div>

        <div className={styles.info_block}>
          <div className={styles.block_label}>FORMAÇÃO</div>
          <div className={styles.block_content}>
            <ul className={styles.list_items}>
              <li>
                graduação - filosofia - universidade de minas gerais - conclusão
                em 1999
              </li>
              <li>
                mestrado - pesquisa: mídia, tecnologia e comportamento -
                universidade federal de santa catarina - conclusão em 2007
              </li>
              <li>
                curso - Filosofia Clı́nica - pós graduação - instituto packter -
                conclusão em 2009
              </li>
              <li>
                doutorado - sociologia - pesquisa sobre adoecimento no trabalho
                - universidade federal do paraná - conclusão em 2014
              </li>
              <li>
                psicanálise clı́nica - escola de psicanálise de curitiba -
                conclusão em 2024
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.info_block}>
          <div className={styles.block_label}>DESCRIÇÃO PESSOAL</div>
          <div className={styles.block_content}>
            <p
              style={{ lineHeight: 1.6, color: "#4B5563", fontSize: "0.95rem" }}
            >
              Sou psicanalista, filósofo clı́nico (AGORA/PR) e escritor. Me
              considero um pesquisador da alma humana e apaixonado por estudar a
              mente, o cérebro e seu potencial.
              <br />
              <br />
              Já realizei milhares de sessões e ajudei centenas de pacientes no
              Brasil e outros paı́ses. Se você busca uma abordagem inovadora e
              boas ferramentas para resolver seus problemas, quero te apresentar
              meu método. Comigo, você vai aprender como funciona sua estrutura
              de pensamento e como seu inconsciente pode estar te afetando
              negativamente. Venha aprender como desbloquear seu potencial.
              Vamos juntos, iniciar uma jornada de transformação e superar
              padrões negativos de autossabotagem, estresse, desânimo e
              procrastinação.
              <br />
            </p>
          </div>
        </div>

        <div className={styles.info_block}>
          <div className={styles.block_label} style={{ color: "#512DA8" }}>
            POLÍTICA DE REMARCAÇÃO
          </div>
          <div className={styles.block_content}>
            <p style={{ fontSize: "0.9rem", color: "#4B5563" }}>
              remarcações podem ocorrer até 2 horas antes sem custo adicional
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviews_section}>
        <div className={styles.reviews_container}>
          <div className={styles.reviews_header}>
            <div className={styles.reviews_title}>
              <h2>Minhas avaliações</h2>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <div style={{ display: "flex" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} fill="#FFB300" color="#FFB300" />
                  ))}
                </div>
                <span style={{ fontSize: "0.9rem" }}>
                  Baseado em <strong>{specialist.review_count} opiniões</strong>
                </span>
              </div>
            </div>
            <button
              style={{
                background: "transparent",
                border: "1px solid white",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Agendar sessão
            </button>
          </div>

          <div className={styles.reviews_grid}>
            {reviews.map((review, i) => (
              <div key={i} className={styles.review_container_item}>
                <div className={styles.review_card}>
                  <div className={styles.review_rating}>
                    {"★".repeat(review.rating)}
                  </div>
                  <p className={styles.review_text}>{review.text}</p>
                </div>
                <div style={{ marginTop: "1.5rem", marginLeft: "1.5rem" }}>
                  <span
                    className={styles.reviewer_name}
                    style={{ color: "white" }}
                  >
                    {review.name}
                  </span>
                  <span
                    className={styles.review_date}
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
