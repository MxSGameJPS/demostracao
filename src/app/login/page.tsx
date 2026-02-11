import { Metadata } from "next";
import LoginForm from "./components/LoginForm";
import LoginCarousel from "./components/LoginCarousel";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Entrar - Equilibra Mind",
  description: "Faça login para acessar conteúdos exclusivos.",
};

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
      <LoginCarousel />
    </div>
  );
}
