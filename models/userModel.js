import bcrypt from "bcryptjs";
import { mongoose } from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "lastName",
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    phone: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valid phone",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// hash user's password with salt before saving document to db
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// extend matchPassword function unto userSchema
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
