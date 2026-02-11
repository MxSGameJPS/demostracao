import styles from "../signup.module.css";

export default function SignupCarousel() {
  return (
    <div className={styles.promo_section}>
      <div className={styles.carousel_content}>
        <div className={styles.carousel_image}>
          {/* Mockup or Image here */}
          <div
            style={{
              padding: "2rem",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "3rem" }}>🌟</span>
          </div>
        </div>
        <h2 className={styles.carousel_title}>Sessões online</h2>
        <p className={styles.carousel_desc}>
          Com profissionais certificados a qualquer hora e em qualquer lugar com
          segurança.
        </p>

        <div className={styles.dots}>
          <div className={styles.dot}></div>
          <div className={`${styles.dot} ${styles.dot_active}`}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}
