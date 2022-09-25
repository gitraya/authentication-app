import { ValidationError } from "utils/errors";

export const checkPassword = (password: string) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters");
  }

  if (!passwordPattern.test(password)) {
    throw new ValidationError(
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
    );
  }
};

export default { checkPassword };
