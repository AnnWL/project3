import { body } from "express-validator";

export const validateRegistrationData = [
  body("username", "username is required").notEmpty(),
  body("username", "username min is 10 and max is 50 characters").isLength({
    min: 10,
    max: 50,
  }),
  body("password", "password is required").notEmpty(),
  body("password", "password min is 10 and max is 50 characters").isLength({
    min: 10,
    max: 50,
  }),
  body("email", "email is required").isEmail(),
];

export const validateLoginData = [
  body("username", "username is required").notEmpty(),
  body("password", "password is required").notEmpty(),
];
