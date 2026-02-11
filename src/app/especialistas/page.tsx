"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronDown,
  Heart,
  X,
  Check,
} from "lucide-react";
import SpecialistCard, { Specialist } from "@/components/SpecialistCard";
import styles from "./specialists.module.css";
import specialistsData from "@/data/specialists.json";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SpecialistsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("Todos");

  const [selectedMotive, setSelectedMotive] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");

  const [isMotiveOpen, setIsMotiveOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  // Derive Filters
  const motives = useMemo(() => {
    const allTags = specialistsData.flatMap((s) => s.tags);
    return ["Todos", ...Array.from(new Set(allTags))];
  }, []);

  const specialistTypes = useMemo(() => {
    const allTypes = specialistsData.map((s) => s.specialty);
    return ["Todos", ...Array.from(new Set(allTypes))];
  }, []);

  const filteredSpecialists = specialistsData.filter(
    (specialist: Specialist) => {
      // 1. Search Term
      const matchesSearch =
        searchTerm === "" ||
        specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialist.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialist.tags.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      // 2. Main declaration tags (LGBTQ+, etc)
      // If activeTag is "Todos", pass. Else check if specialist has this tag.
      // Note: In real app "pretos" might map to a specific field, but here we use tags array.
      const matchesTag =
        activeTag === "Todos" ||
        specialist.tags.some(
          (t) => t.toLowerCase() === activeTag.toLowerCase(),
        );

      // 3. Dropdown Motive
      const matchesMotive =
        selectedMotive === "Todos" || specialist.tags.includes(selectedMotive);

      // 4. Dropdown Type
      const matchesType =
        selectedType === "Todos" || specialist.specialty === selectedType;

      return matchesSearch && matchesTag && matchesMotive && matchesType;
    },
  );

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag("Todos");
    } else {
      setActiveTag(tag);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header with Search and Filters */}
      <header className={styles.header}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "2rem",
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
              href="/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Início
            </Link>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "0.8rem" }}>👤</span>
            </div>
          </div>
        </div>

        <div className={styles.search_bar_row}>
          <div className={styles.search_input_container}>
            <Search size={20} color="#9CA3AF" />
            <input
              type="text"
              placeholder="Procure por nome, especialidade, motivo..."
              className={styles.search_input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <X size={16} color="#9CA3AF" />
              </button>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button
              className={styles.filter_dropdown}
              onClick={() => {
                setIsMotiveOpen(!isMotiveOpen);
                setIsTypeOpen(false);
              }}
            >
              <span>
                {selectedMotive === "Todos" ? "Motivo" : selectedMotive}
              </span>
              <ChevronDown size={16} />
            </button>

            {isMotiveOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  minWidth: "200px",
                  zIndex: 20,
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {motives.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMotive(m);
                      setIsMotiveOpen(false);
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "none",
                      background: "white",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: "#374151",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {m}
                    {selectedMotive === m && (
                      <Check size={16} color="#512DA8" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button
              className={styles.filter_dropdown}
              onClick={() => {
                setIsTypeOpen(!isTypeOpen);
                setIsMotiveOpen(false);
              }}
            >
              <span>
                {selectedType === "Todos"
                  ? "Tipo de especialista"
                  : selectedType}
              </span>
              <ChevronDown size={16} />
            </button>

            {isTypeOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  minWidth: "200px",
                  zIndex: 20,
                }}
              >
                {specialistTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedType(t);
                      setIsTypeOpen(false);
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "none",
                      background: "white",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: "#374151",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {t}
                    {selectedType === t && <Check size={16} color="#512DA8" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className={styles.advanced_filters}>
            Mais filtros
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <div className={styles.tags_row}>
          <span className={styles.filter_label}>
            Especialistas que se declaram como:
          </span>
          {["LGBTQIAPN+", "pretos", "sêniores"].map((tag) => (
            <button
              key={tag}
              className={`${styles.tag_filter} ${activeTag === tag ? styles.tag_filter_active : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
          <button
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            seus favoritos <Heart size={16} />
          </button>
        </div>

        <div className={styles.controls_row}>
          <button className={styles.sort_dropdown}>
            ordenar por: <strong>mais relevantes</strong>
            <ChevronDown size={16} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              <span style={{ textDecoration: "underline" }}>
                fuso horário: sua região
              </span>{" "}
              |<span>disponível agora</span>
              <div
                style={{
                  width: "32px",
                  height: "18px",
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "10px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    background: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                  }}
                ></div>
              </div>
            </div>

            <div className={styles.toggle_view}>
              <button
                className={`${styles.view_btn} ${viewMode === "grid" ? styles.view_btn_active : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`${styles.view_btn} ${viewMode === "list" ? styles.view_btn_active : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.content}>
        <p className={styles.results_count}>
          Encontramos {filteredSpecialists.length} especialistas em{" "}
          <span
            style={{
              color: "#7E57C2",
              fontWeight: 600,
              background: "#EDE7F6",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
            }}
          >
            Português
          </span>
        </p>

        <div className={viewMode === "grid" ? styles.grid : styles.list}>
          {filteredSpecialists.map((specialist) => (
            <SpecialistCard
              key={specialist.id}
              specialist={specialist}
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredSpecialists.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "4rem", color: "#6B7280" }}
          >
            <h3>Nenhum especialista encontrado</h3>
            <p>Tente ajustar seus filtros de busca.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTag("Todos");
                setSelectedMotive("Todos");
                setSelectedType("Todos");
              }}
              style={{
                marginTop: "1rem",
                background: "#512DA8",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
