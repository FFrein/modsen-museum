import * as yup from "yup";

export const searchSchema = yup.object().shape({
  search: yup
    .string()
    .required("Поисковый запрос обязателен")
    .min(3, "Введите минимум 3 символа"),
});
