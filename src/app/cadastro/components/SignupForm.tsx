"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "../signup.module.css";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Add submission logic here
  };

  return (
    <div className={styles.form_section}>
      <div className={styles.brand_section}>
        <div className={styles.brand_logo}>
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
        </div>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Cadastre-se agora</h1>
        <p className={styles.subtitle}>
          Inicie a sua jornada de saúde emocional
        </p>
      </div>

      <div className={styles.back_nav}>
        <Link href="/" className={styles.back_btn}>
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </Link>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <input
            type="text"
            name="name"
            className={styles.input}
            placeholder="Nome" // Matching screenshot placeholder style
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_group}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div
              className={styles.input}
              style={{
                width: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🇧🇷
            </div>
            <input
              type="tel"
              name="phone"
              className={styles.input}
              placeholder="Telefone" // Matching screenshot placeholder style
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.input_group}>
          <input
            type="text" // Changed to text to allow placeholder behavior initially or use onFocus type='date' trick if needed, but keeping simple for now
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => !e.target.value && (e.target.type = "text")}
            name="birthDate"
            className={styles.input}
            placeholder="Data de nascimento"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_group}>
          <select
            name="gender"
            className={styles.input}
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ color: formData.gender ? "inherit" : "#9CA3AF" }}
          >
            <option value="" disabled hidden>
              Como você se identifica?
            </option>
            <option value="woman">Mulher</option>
            <option value="man">Homem</option>
            <option value="nonbinary">Não-binário</option>
            <option value="other">Outro</option>
            <option value="prefere_nao_dizer">Prefiro não dizer</option>
          </select>
        </div>

        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_group}>
          <input
            type="password"
            name="password"
            className={styles.input}
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          <p
            style={{
              fontSize: "0.75rem",
              color: "#6B7280",
              marginTop: "0.25rem",
              lineHeight: "1.4",
            }}
          >
            A senha deve possuir letras minúsculas, maiúsculas, números,
            caracteres especiais e no mínimo 8 caracteres.
          </p>
        </div>

        <button type="submit" className={styles.submit_btn}>
          CRIAR A MINHA CONTA
        </button>
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
