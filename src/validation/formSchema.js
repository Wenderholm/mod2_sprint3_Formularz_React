import { z } from "zod";

const experienceSchema = z.object({
  technology: z.string().min(1, "Podaj technologię"),
  level: z.string().min(1, "Podaj poziom"),
});

export const formSchema = z
  .object({
    firstName: z.string().min(3, "Imię musi mieć min. 3 znaki"),

    lastName: z.string().min(3, "Nazwisko musi mieć min. 3 znaki"),

    email: z.string().email("Niepoprawny adres e-mail"),

    phone: z.string().regex(/^\d{9}$/, "Numer telefonu musi mieć 9 cyfr"),

    mode: z.enum(["online", "stationary"], {
      required_error: "Wybierz formę nauki",
    }),

    technologies: z
      .array(z.string())
      .min(1, "Wybierz przynajmniej jedną technologię"),

    cv: z
      .instanceof(File, { message: "Musisz dodać plik CV" })
      .refine(
        (file) => ["image/jpeg", "image/png"].includes(file.type),
        "CV musi być obrazem JPEG lub PNG",
      ),

    hasExp: z.boolean(),

    experience: z.array(experienceSchema).default([]),
  })
  .refine((data) => !data.hasExp || data.experience.length > 0, {
    message: "Dodaj przynajmniej jedno doświadczenie",
    path: ["experience"],
  });
