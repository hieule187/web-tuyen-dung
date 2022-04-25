const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Nam', 'Nữ'],
      required: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Profile', ProfileSchema);
