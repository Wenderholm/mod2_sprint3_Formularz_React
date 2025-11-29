import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../validation/formSchema";
import ExperienceFields from "./ExperienceFields";
import styles from "./RegistrationForm.module.css";
import MyImage from "../assets/mis.png";
import Modal from "./Modal";

export default function RegistrationForm() {
  const [modalData, setModalData] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      mode: "online",
      technologies: [],
      cv: null,
      hasExp: false,
      experience: [],
    },
  });

  const onSubmit = (data) => {
    setModalData(data);
  };

  const hasExp = watch("hasExp");

  return (
    <>
      <h1 className={styles.title}>
        Formularz zgłoszeniowy na kurs programowania
      </h1>

      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.description}>Dane osobowe</p>
          <div className={styles.field}>
            <input {...register("firstName")} placeholder="Imię" />
            {errors.firstName && (
              <p className={styles.error}>{errors.firstName.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <input {...register("lastName")} placeholder="Nazwisko" />
            {errors.lastName && (
              <p className={styles.error}>{errors.lastName.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <input {...register("email")} placeholder="Email" />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <input {...register("phone")} placeholder="Numer telefonu" />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>

          <div>
            <p className={styles.description}>Preferencje kursu</p>

            <div className={styles.wrap}>
              <label>Wybierz formę nauki</label>
              <div className={styles.radioWrapper}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id="online"
                  value="online"
                  {...register("mode", { required: "Wybierz formę nauki" })}
                />
                <label htmlFor="online" className={styles.radioLabel}>
                  Online
                </label>
              </div>
              <div className={styles.radioWrapper}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id="stationary"
                  value="stationary"
                  {...register("mode", { required: "Wybierz formę nauki" })}
                />
                <label htmlFor="stationary" className={styles.radioLabel}>
                  Stacjonarnie
                </label>
              </div>
            </div>

            {errors.mode && (
              <p className={styles.error}>{errors.mode.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <div className={styles.checkGroup}>
              {["React", "Node.js", "HTML", "CSS", "Next.js"].map((tech) => (
                <label className={styles.txt_checkbox} key={tech}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    value={tech}
                    {...register("technologies")}
                  />{" "}
                  <div className={styles.divTech}>{tech}</div>
                </label>
              ))}
            </div>
            {errors.technologies && (
              <p className={styles.error}>{errors.technologies.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.description}>Dodaj swoje CV</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setValue("cv", file, { shouldValidate: true });
              }}
            />
            {errors.cv && <p className={styles.error}>{errors.cv.message}</p>}
          </div>

          <div className={styles.field}>
            <p className={styles.description}>Doświadczenie w programowaniu</p>
            <label>
              <input type="checkbox" {...register("hasExp")} /> Czy masz
              doświadczenie w programowaniu
            </label>
            {errors.hasExp && (
              <p className={styles.error}>{errors.hasExp.message}</p>
            )}
          </div>

          {hasExp && (
            <>
              <ExperienceFields control={control} register={register} />
              {errors.experience?.message && (
                <p className={styles.error}>{errors.experience.message}</p>
              )}
            </>
          )}

          <button type="submit" className={styles.submit}>
            Wyślij
          </button>
        </form>

        {modalData && (
          <Modal data={modalData} onClose={() => setModalData(null)} />
        )}
      </div>
    </>
  );
}
