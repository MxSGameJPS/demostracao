import { Metadata } from "next";
import SignupCarousel from "./components/SignupCarousel";
import SignupForm from "./components/SignupForm";
import styles from "./signup.module.css";

export const metadata: Metadata = {
  title: "Criar Conta - Equilibra Mind",
  description: "Comece sua jornada de saúde emocional.",
};

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <SignupForm />
      <SignupCarousel />
    </div>
  );
}
