"use client";

import { Sparkles, PlayCircle } from "lucide-react";
import styles from "../login.module.css";

export default function LoginCarousel() {
  return (
    <div className={styles.promo_section}>
      <div className={styles.carousel_content}>
        <div
          className={styles.carousel_image}
          style={{ transform: "rotate(2deg)" }}
        >
          <div className={styles.carousel_badge}>
            <PlayCircle size={20} color="#7E57C2" />
            Conteúdos exclusivos
          </div>
          <div
            style={{
              padding: "2rem",
              height: "250px",
              width: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F3E5F5",
              overflow: "hidden",
              borderRadius: "0.5rem",
            }}
          >
            <span style={{ fontSize: "4rem" }}>🎧</span>
          </div>
        </div>

        <h2 className={styles.carousel_title}>
          <span
            style={{
              background: "#FFECB3",
              color: "#5D4037",
              padding: "0 0.5rem",
              borderRadius: "4px",
              marginRight: "0.5rem",
            }}
          >
            Conteúdos personalizados
          </span>
          para
        </h2>
        <p className={styles.carousel_desc}>
          diferentes momentos e situações da sua vida
        </p>

        <div className={styles.dots}>
          <div className={`${styles.dot} ${styles.dot_active}`}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}
