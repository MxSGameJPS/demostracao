"use client";

import { motion } from "framer-motion";
import { PlayCircle, Heart, Star, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./SpecialistCard.module.css";

interface Slot {
  day: string;
  date: string;
  times: string[];
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  crp?: string;
  experience: string;
  video_url?: string;
  image: string;
  tags: string[];
  bio: string;
  rating: number;
  review_count: number;
  session_count: number;
  price: number;
  verified: boolean;
  slots: Slot[];
}

interface SpecialistCardProps {
  specialist: Specialist;
  viewMode: "grid" | "list";
}

function InfoSection({
  specialist,
  viewMode,
}: {
  specialist: Specialist;
  viewMode: "grid" | "list";
}) {
  const {
    id,
    name,
    specialty,
    crp,
    experience,
    video_url,
    image,
    tags,
    bio,
    rating,
    review_count,
    session_count,
    price,
    verified,
  } = specialist;

  return (
    <div className={styles.info}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div className={styles.avatar_container}>
          <Image
            src={image}
            alt={name}
            className={styles.avatar}
            width={80}
            height={80}
          />
          <button className={styles.like_btn}>
            <Heart size={20} />
          </button>
        </div>
        <div>
          <div className={styles.name_row}>
            <Link
              href={`/especialistas/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3 className={styles.name}>{name}</h3>
            </Link>
            {verified && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  fill="#2962FF"
                />
                <path
                  d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div className={styles.specialty_row}>
            <span style={{ fontWeight: 600, color: "#374151" }}>
              {specialty}
            </span>
            {crp && <span className={styles.crp}>{crp}</span>}
            <span className={styles.experience}>{experience}</span>
          </div>
          {video_url && (
            <Link href={video_url} className={styles.video_link}>
              <PlayCircle size={16} fill="red" color="white" />
              <span style={{ color: "#374151", textDecoration: "underline" }}>
                ver vídeo de apresentação
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.tags}>
        {tags.slice(0, 3).map((tag, i) => (
          <span key={i} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {viewMode === "grid" && <p className={styles.bio}>{bio}</p>}

      {/* Stats only for grid or list left side */}
      <div className={styles.stats_row}>
        <div className={styles.rating}>
          <Star size={16} className={styles.star} />
          <span>{rating}</span>
          <span className={styles.stat_text}>({review_count} comentários)</span>
        </div>
        <div className={styles.session_count}>
          <User size={16} />
          <span>{session_count}</span>
          <span className={styles.stat_text}>atendimentos</span>
        </div>
      </div>

      <div className={styles.price_row}>
        <span className={styles.price_label}>Sessão 50 min</span>
        <span className={styles.price}>R$ {price.toFixed(0)}</span>
      </div>
    </div>
  );
}

export default function SpecialistCard({
  specialist,
  viewMode,
}: SpecialistCardProps) {
  const { slots } = specialist;
  const cardClass = viewMode === "grid" ? styles.card_grid : styles.card_list;

  return (
    <motion.div
      className={`${styles.card} ${cardClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {viewMode === "grid" ? (
        <InfoSection specialist={specialist} viewMode={viewMode} />
      ) : (
        <>
          <div className={styles.list_info_section}>
            <InfoSection specialist={specialist} viewMode={viewMode} />
          </div>

          <div className={styles.calendar_section}>
            <div className={styles.calendar_header}>
              {slots.map((slot, i) => (
                <div key={i} className={styles.calendar_day}>
                  <div className={styles.day_name}>{slot.day}</div>
                  <div className={styles.day_date}>{slot.date}</div>
                </div>
              ))}
              <div className={styles.calendar_day}>
                <button
                  style={{
                    background: "#7E57C2",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    padding: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  &gt;
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {slots.map((slot, i) => (
                <div
                  key={i}
                  className={styles.time_slots_col}
                  style={{ flex: 1 }}
                >
                  {slot.times.length > 0 ? (
                    slot.times.map((time, j) => (
                      <button key={j} className={styles.time_slot}>
                        {time}
                      </button>
                    ))
                  ) : (
                    <span style={{ color: "#E5E7EB" }}>-</span>
                  )}
                </div>
              ))}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Empty nav col */}
              </div>
            </div>

            <div className={styles.more_slots}>
              <button
                style={{
                  width: "100%",
                  background: "#E1BEE7",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  fontWeight: 700,
                  padding: "0.25rem",
                  marginTop: "1rem",
                  cursor: "pointer",
                }}
              >
                Agendar
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
