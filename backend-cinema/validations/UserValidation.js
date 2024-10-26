import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверная почта").isEmail(),
  body("fullName", "Неверное имя").isLength({ min: 3 }),
  body("password", "Неверный пароль").isLength({ min: 4, max: 60 }),
  body("imgUrl").optional().isString(),
];
export const loginValidation = [
  body("email", "Неверная почта").isEmail(),
  body("password", "Неверный пароль").isLength({ min: 3 }),
];
