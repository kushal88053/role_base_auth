const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    primary_number: {
      type: String,
      minlength: [10, "Primary number must be at least 10 digits long"],
      maxlength: [15, "Primary number must not exceed 15 digits"],
      unique: true,
      required: [true, "Primary phone number is required"],
    },
    second_number: {
      type: String,
      minlength: [10, "Secondary number must be at least 10 digits long"],
      maxlength: [15, "Secondary number must not exceed 15 digits"],
      required: false,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 3,
      max: 100,
      required: true,
    },
    stutus: {
      type: String,
      enum: ["active", "deactive", "deleted"],
      default: "deactive",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["admin", "user", "manager", "staff"],
      default: "user",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //   required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
