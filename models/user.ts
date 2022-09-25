import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IUser {
  name?: string;
  phone?: string;
  email: string;
  passwordHash: string;
  photoUrl?: string;
  bio?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  phone: {
    type: String,
    minlength: [10, "Phone number must be at least 10 characters long"],
    validate: {
      validator: (v: string) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(v),
      message: "{VALUE} is not a valid phone number!",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (v: string) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: "{VALUE} is not a valid email!",
    },
  },
  passwordHash: {
    type: String,
  },
  photoUrl: {
    type: String,
    validate: {
      validator: (v: string) =>
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
          v
        ),
      message: "{VALUE} is not a valid URL!",
    },
  },
  bio: {
    type: String,
    maxlength: 300,
  },
});

userSchema.set("toJSON", {
  transform: (document: any, returnedObject: mongoose.AnyObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.models.User || mongoose.model("User", userSchema);
