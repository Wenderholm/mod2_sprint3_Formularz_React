import style from "./RegistrationForm.module.css";

export default function FormInput({
  name,
  placeholder,
  register,
  error,
  type = "text",
}) {
  return (
    <div className={style.field}>
      <input type={type} {...register(name)} placeholder={placeholder} />
      {error && <p className={style.error}>{error.message}</p>}
    </div>
  );
}
