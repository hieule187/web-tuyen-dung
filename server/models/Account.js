const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const AccountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'candidate', 'recruiter'],
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    keyName: {
      type: String,
      required: true,
    },
    keyRole: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Account = mongoose.model('Account', AccountSchema);

// Kiểm tra cấu trúc dữ liệu trước khi gửi request
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Mật khẩu'),
  });
  return schema.validate(data);
};

module.exports = { Account, validate };
