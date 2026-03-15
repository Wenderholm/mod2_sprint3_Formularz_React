import styles from "./Modal.module.css";
import MyImage from "../assets/mis.png";

export default function Modal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={styles.modalOverlay}>
      <h1 className={styles.title}>Dane z formularza</h1>

      <div className={styles.modal}>
        <h2 className={styles.description}>Dane osobowe :</h2>
        <p>Imię: {data.firstName}</p>
        <p>Nazwisko: {data.lastName}</p>
        <p>Email: {data.email}</p>
        <p>Telefon: {data.phone}</p>

        <h2 className={styles.description}>Doświadczenie zawodowe:</h2>
        {data.hasExp && data.experience.length > 0 && (
          <ul className={styles.list}>
            {data.experience.map((exp, index) => (
              <li key={index}>
                Technologia: {exp.technology} / poziom: {exp.level}
              </li>
            ))}
          </ul>
        )}

        <h2 className={styles.description}>Preferencje kursowe:</h2>
        <p>Typ kursu: {data.mode}</p>

        <p>Preferowane technologie:</p>
        <ul className={styles.list}>
          {data.technologies.map((tech) => (
            <li key={tech} className={styles.techItem}>
              {tech}
            </li>
          ))}
        </ul>

        <h2 className={styles.description}>Curriculum vitae:</h2>
        <div className={styles.cvContainer}>
          <img src={MyImage} alt="CV" width="100" />
        </div>

        <button onClick={onClose} className={styles.closeBtn}>
          Zamknij
        </button>
      </div>
    </div>
  );
}
