import { useFieldArray } from "react-hook-form";
import styles from "./ExperienceFields.module.css";

export default function ExperienceFields({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
  const technologies = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "C++", label: "C++" },
    { value: "Inne", label: "Inne" },
  ];

  const level = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => append({ technology: "", level: "" })}
        className={styles.addBtn}
      >
        Dodaj doświadczenie
      </button>

      {fields.map((field, index) => (
        <div key={field.id} className={styles.expBlock}>
          <select
            className={styles.input}
            {...register(`experience.${index}.technology`)}
          >
            {technologies.map((tech) => (
              <option key={tech.value} value={tech.value}>
                {tech.label}
              </option>
            ))}
          </select>

          <select
            className={styles.input}
            {...register(`experience.${index}.level`)}
          >
            {level.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => remove(index)}
            className={styles.removeBtn}
          >
            Usuń
          </button>
        </div>
      ))}
    </div>
  );
}
