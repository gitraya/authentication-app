export const userFields: any[] = [
  {
    name: "name",
    validation: {
      required: { value: true, message: "Name is required" },
      minLength: { value: 3, message: "Name must be at least 3 characters" },
      maxLength: { value: 20, message: "Name must be at most 20 characters" },
    },
  },
  {
    name: "bio",
    validation: {
      minLength: { value: 3, message: "Bio must be at least 3 characters" },
      maxLength: { value: 100, message: "Bio must be at most 100 characters" },
    },
  },
  {
    name: "phone",
    validation: {
      minLength: { value: 10, message: "Phone must be at least 10 characters" },
      maxLength: { value: 20, message: "Phone must be at most 20 characters" },
      pattern: {
        value:
          /^((\+\d{2}|0)(\d{2,3}))[ .-]?\d{1,4}[ .-]?\d{2,4}[ .-]?\d{2,4}$/i,
        message: "Phone must be a number",
      },
    },
  },
  {
    name: "email",
    validation: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "password",
    validation: {
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      },
    },
  },
];

export const session = {
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
};
