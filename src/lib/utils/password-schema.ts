import { z } from "zod/v4"

const minLengthErrorMessage = "Password must be at least 8 characters long.";
const maxLengthErrorMessage = "Password must be no more than 20 characters.";
const uppercaseErrorMessage = "Password must contain at least one uppercase letter.";
const lowercaseErrorMessage = "Password must contain at least one lowercase letter.";
const numberErrorMessage = "Password must contain at least one digit.";
const specialCharacterErrorMessage = "Password must contain at least one special character (!@#$%^&*).";

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine(password => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine(password => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine(password => /[0-9]/.test(password), {
    message: numberErrorMessage,
  })
  .refine(password => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export default passwordSchema
