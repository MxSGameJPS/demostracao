"use client";

import { useState } from "react";
import styles from "./profile-form.module.css";
import SpecialistHeader from "../components/SpecialistHeader";
import { Plus, X, Save } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
interface FormationItem {
  degree: string;
  course: string;
  institution: string;
  yearCompleted: string;
}

interface SpecialistProfile {
  // Basic Info
  name: string;
  specialty: string;
  videoUrl: string;
  photo: string;

  // Professional Info
  experienceAreas: string[];
  specialties: string[];
  sessionDuration: number;
  sessionPrice: number;

  // Formation
  formations: FormationItem[];

  // Description
  personalDescription: string;
  reschedulingPolicy: string;
}

export default function SpecialistProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<SpecialistProfile>({
    name: "Dr. Especialista",
    specialty: "Psicanalista",
    videoUrl: "",
    photo: "",
    experienceAreas: ["angústia", "ansiedade", "autoconhecimento"],
    specialties: ["abordagem fenomenológica", "psicanálise"],
    sessionDuration: 50,
    sessionPrice: 107,
    formations: [
      {
        degree: "graduação",
        course: "filosofia",
        institution: "universidade de minas gerais",
        yearCompleted: "1999",
      },
    ],
    personalDescription: "",
    reschedulingPolicy:
      "remarcações podem ocorrer até 2 horas antes com custo adicional",
  });

  const [newExperienceArea, setNewExperienceArea] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleAddExperienceArea = () => {
    if (newExperienceArea.trim()) {
      setProfile({
        ...profile,
        experienceAreas: [...profile.experienceAreas, newExperienceArea.trim()],
      });
      setNewExperienceArea("");
    }
  };

  const handleRemoveExperienceArea = (index: number) => {
    setProfile({
      ...profile,
      experienceAreas: profile.experienceAreas.filter((_, i) => i !== index),
    });
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfile({
        ...profile,
        specialties: [...profile.specialties, newSpecialty.trim()],
      });
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setProfile({
      ...profile,
      specialties: profile.specialties.filter((_, i) => i !== index),
    });
  };

  const handleAddFormation = () => {
    setProfile({
      ...profile,
      formations: [
        ...profile.formations,
        {
          degree: "",
          course: "",
          institution: "",
          yearCompleted: "",
        },
      ],
    });
  };

  const handleRemoveFormation = (index: number) => {
    setProfile({
      ...profile,
      formations: profile.formations.filter((_, i) => i !== index),
    });
  };

  const handleFormationChange = (
    index: number,
    field: keyof FormationItem,
    value: string,
  ) => {
    const newFormations = [...profile.formations];
    newFormations[index][field] = value;
    setProfile({ ...profile, formations: newFormations });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile saved:", profile);
    alert("Perfil salvo com sucesso!");
    // Aqui você enviaria para uma API
  };

  return (
    <div className={styles.container}>
      <SpecialistHeader />

      <main className={styles.content}>
        <div className={styles.profile_header}>
          <h1 className={styles.page_title}>Meu Perfil Profissional</h1>
          <p className={styles.page_subtitle}>
            Complete suas informações para que os pacientes possam conhecê-lo
            melhor
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className={styles.form_card}>
            <h2 className={styles.section_title}>Informações Básicas</h2>

            <div className={styles.form_grid}>
              <div className={styles.form_grid_2cols}>
                <div className={styles.form_group}>
                  <label
                    className={`${styles.form_label} ${styles.form_label_required}`}
                  >
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className={styles.form_input}
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label
                    className={`${styles.form_label} ${styles.form_label_required}`}
                  >
                    Especialidade Principal
                  </label>
                  <input
                    type="text"
                    className={styles.form_input}
                    placeholder="Ex: Psicanalista, Psicólogo..."
                    value={profile.specialty}
                    onChange={(e) =>
                      setProfile({ ...profile, specialty: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className={styles.form_group}>
                <label className={styles.form_label}>
                  URL do Vídeo de Apresentação
                </label>
                <input
                  type="url"
                  className={styles.form_input}
                  placeholder="https://youtube.com/..."
                  value={profile.videoUrl}
                  onChange={(e) =>
                    setProfile({ ...profile, videoUrl: e.target.value })
                  }
                />
                <span className={styles.input_hint}>
                  Link do YouTube ou Vimeo (opcional)
                </span>
              </div>

              <div className={styles.form_grid_2cols}>
                <div className={styles.form_group}>
                  <label
                    className={`${styles.form_label} ${styles.form_label_required}`}
                  >
                    Duração da Sessão (minutos)
                  </label>
                  <input
                    type="number"
                    className={styles.form_input}
                    value={profile.sessionDuration}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        sessionDuration: Number(e.target.value),
                      })
                    }
                    min="30"
                    max="120"
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label
                    className={`${styles.form_label} ${styles.form_label_required}`}
                  >
                    Valor da Sessão (R$)
                  </label>
                  <input
                    type="number"
                    className={styles.form_input}
                    value={profile.sessionPrice}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        sessionPrice: Number(e.target.value),
                      })
                    }
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Experience Areas */}
          <div className={styles.form_card}>
            <h2 className={styles.section_title}>Áreas de Experiência</h2>

            <div className={styles.form_group}>
              <label className={styles.form_label}>
                Quais problemas/temas você tem experiência em atender?
              </label>

              <div className={styles.tags_input_wrapper}>
                {profile.experienceAreas.map((area, index) => (
                  <div key={index} className={styles.tag_item}>
                    {area}
                    <button
                      type="button"
                      className={styles.tag_remove}
                      onClick={() => handleRemoveExperienceArea(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
              >
                <input
                  type="text"
                  className={styles.form_input}
                  placeholder="Ex: ansiedade, depressão, relacionamentos..."
                  value={newExperienceArea}
                  onChange={(e) => setNewExperienceArea(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddExperienceArea())
                  }
                />
                <button
                  type="button"
                  className={styles.add_item_btn}
                  onClick={handleAddExperienceArea}
                  style={{ marginTop: 0 }}
                >
                  <Plus size={18} />
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className={styles.form_card}>
            <h2 className={styles.section_title}>Especialidades</h2>

            <div className={styles.form_group}>
              <label className={styles.form_label}>
                Quais abordagens/técnicas você utiliza?
              </label>

              <div className={styles.tags_input_wrapper}>
                {profile.specialties.map((specialty, index) => (
                  <div key={index} className={styles.tag_item}>
                    {specialty}
                    <button
                      type="button"
                      className={styles.tag_remove}
                      onClick={() => handleRemoveSpecialty(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
              >
                <input
                  type="text"
                  className={styles.form_input}
                  placeholder="Ex: terapia cognitivo-comportamental, psicanálise..."
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddSpecialty())
                  }
                />
                <button
                  type="button"
                  className={styles.add_item_btn}
                  onClick={handleAddSpecialty}
                  style={{ marginTop: 0 }}
                >
                  <Plus size={18} />
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          {/* Formation */}
          <div className={styles.form_card}>
            <h2 className={styles.section_title}>Formação Acadêmica</h2>

            {profile.formations.map((formation, index) => (
              <div key={index} className={styles.list_item}>
                <button
                  type="button"
                  className={styles.remove_item_btn}
                  onClick={() => handleRemoveFormation(index)}
                >
                  <X size={14} />
                </button>

                <div className={styles.form_grid}>
                  <div className={styles.form_grid_2cols}>
                    <div className={styles.form_group}>
                      <label className={styles.form_label}>Nível</label>
                      <select
                        className={styles.form_select}
                        value={formation.degree}
                        onChange={(e) =>
                          handleFormationChange(index, "degree", e.target.value)
                        }
                      >
                        <option value="">Selecione</option>
                        <option value="graduação">Graduação</option>
                        <option value="pós-graduação">Pós-graduação</option>
                        <option value="mestrado">Mestrado</option>
                        <option value="doutorado">Doutorado</option>
                        <option value="curso">Curso</option>
                      </select>
                    </div>

                    <div className={styles.form_group}>
                      <label className={styles.form_label}>Curso</label>
                      <input
                        type="text"
                        className={styles.form_input}
                        placeholder="Ex: Psicologia"
                        value={formation.course}
                        onChange={(e) =>
                          handleFormationChange(index, "course", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.form_grid_2cols}>
                    <div className={styles.form_group}>
                      <label className={styles.form_label}>Instituição</label>
                      <input
                        type="text"
                        className={styles.form_input}
                        placeholder="Ex: Universidade Federal..."
                        value={formation.institution}
                        onChange={(e) =>
                          handleFormationChange(
                            index,
                            "institution",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className={styles.form_group}>
                      <label className={styles.form_label}>
                        Ano de Conclusão
                      </label>
                      <input
                        type="text"
                        className={styles.form_input}
                        placeholder="Ex: 2020"
                        value={formation.yearCompleted}
                        onChange={(e) =>
                          handleFormationChange(
                            index,
                            "yearCompleted",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className={styles.add_item_btn}
              onClick={handleAddFormation}
            >
              <Plus size={18} />
              Adicionar Formação
            </button>
          </div>

          {/* Descriptions */}
          <div className={styles.form_card}>
            <h2 className={styles.section_title}>Sobre Você</h2>

            <div className={styles.form_group}>
              <label
                className={`${styles.form_label} ${styles.form_label_required}`}
              >
                Descrição Pessoal/Profissional
              </label>
              <textarea
                className={`${styles.form_textarea} ${styles.form_textarea_large}`}
                placeholder="Conte aos pacientes sobre sua abordagem, experiência e como você pode ajudá-los..."
                value={profile.personalDescription}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    personalDescription: e.target.value,
                  })
                }
                required
              />
              <span className={styles.input_hint}>
                Esta descrição aparecerá no seu perfil público
              </span>
            </div>

            <div className={styles.form_group}>
              <label className={styles.form_label}>
                Política de Remarcação
              </label>
              <textarea
                className={styles.form_textarea}
                placeholder="Ex: Remarcações podem ocorrer até 24 horas antes sem custo adicional..."
                value={profile.reschedulingPolicy}
                onChange={(e) =>
                  setProfile({ ...profile, reschedulingPolicy: e.target.value })
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btn_cancel}
              onClick={() => router.push("/dashboard-especialista")}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.btn_save}>
              <Save size={18} style={{ marginRight: "0.5rem" }} />
              Salvar Perfil
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
