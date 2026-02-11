"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2, Fingerprint, Heart } from "lucide-react";
import styles from "./SocialProof.module.css";

export default function SocialProof() {
  const logos = [
    { name: "BemViver", icon: Heart },
    { name: "CorpMind", icon: Building2 },
    { name: "SecureLife", icon: Fingerprint },
    { name: "JobFit", icon: Briefcase },
  ];

  const stats = [
    { value: "+10k", label: "Clientes Atendidos" },
    { value: "4.9", label: "Avaliação Média" },
    { value: "250+", label: "Especialistas" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Confiam na nossa plataforma
        </motion.p>

        <div className={styles.logos}>
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              className={styles.logo_item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <logo.icon size={24} />
              {logo.name}
            </motion.div>
          ))}
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.stat_item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              <p className={styles.stat_number}>{stat.value}</p>
              <p className={styles.stat_label}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
