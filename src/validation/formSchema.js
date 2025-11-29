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
    phone: z.string().regex(/^\d{9}$/i, "Numer telefonu musi mieć 9 cyfr"),
    mode: z.enum(["online", "stationary"], {
      required_error: "Wybierz formę nauki",
    }),
    technologies: z
      .array(z.string())
      .min(1, "Wybierz przynajmniej jedną technologię"),
    cv: z.preprocess(
      (val) => {
        if (val instanceof File) return val;
        if (val instanceof FileList) return val.item(0);
        return undefined;
      },
      z
        .instanceof(File, { message: "Musisz dodać plik CV" })
        .refine(
          (file) => file.type === "image/jpeg" || file.type === "image/png",
          { message: "CV musi być obrazem JPEG lub PNG" }
        )
    ),
    hasExp: z.boolean(),
    experience: z.array(experienceSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasExp) {
      if (!data.experience || data.experience.length === 0) {
        ctx.addIssue({
          path: ["experience"],
          message:
            "Dodaj przynajmniej jedno doświadczenie z wypełnionymi polami",
          code: z.ZodIssueCode.custom,
        });
        return;
      }

      const hasEmptyField = data.experience.some(
        (exp) => !exp.technology || !exp.level
      );
      if (hasEmptyField) {
        ctx.addIssue({
          path: ["experience"],
          message: "Wszystkie pola doświadczenia muszą być wypełnione",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
