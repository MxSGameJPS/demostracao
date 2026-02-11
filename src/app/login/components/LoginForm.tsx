"use client";

import { Sparkles, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "../login.module.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "teste@teste.com",
    password: "teste123",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);

    // Specialist Login
    if (
      formData.email === "especialista@teste.com" &&
      formData.password === "teste123"
    ) {
      window.location.href = "/dashboard-especialista";
      return;
    }

    // Client Login
    if (
      formData.email === "teste@teste.com" &&
      formData.password === "teste123"
    ) {
      window.location.href = "/dashboard";
      return;
    }

    alert("Credenciais inválidas!");
  };

  return (
    <div className={styles.form_section}>
      <div className={styles.brand_section}>
        <Link href="/" className={styles.brand_logo}>
          <Sparkles size={28} style={{ color: "#81D4FA" }} />
          <span
            style={{
              background: "linear-gradient(to right, #81D4FA, #CE93D8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.25rem",
            }}
          >
            Equilibra Mind
          </span>
        </Link>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Entrar</h1>
        <p className={styles.subtitle}>Informe seu e-mail e senha abaixo:</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label className={styles.label}>E-mail</label>
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_group}>
          <label className={styles.label}>Senha</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={styles.input}
              placeholder="*************"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#9CA3AF",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Link href="#" className={styles.forgot_password}>
          Esqueceu a Senha?
        </Link>

        <button type="submit" className={styles.submit_btn}>
          ENTRAR
        </button>

        <Link
          href="/cadastro"
          className={styles.create_account_btn}
          style={{ textDecoration: "none" }}
        >
          Criar conta
        </Link>
      </form>

      <div className={styles.footer}>
        <Link href="#" className={styles.help_link}>
          Sou paciente e preciso de ajuda
        </Link>
        <p className={styles.legal_text}>
          Ao continuar você concorda com os{" "}
          <Link href="#" className={styles.legal_link}>
            Termos
          </Link>{" "}
          e{" "}
          <Link href="#" className={styles.legal_link}>
            Política de Privacidade
          </Link>
        </p>
        <p className={styles.legal_text} style={{ marginTop: "0.5rem" }}>
          ©2026 Equilibra Mind
        </p>
      </div>
    </div>
  );
}
