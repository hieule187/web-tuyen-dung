const mongoose = require('mongoose');

const CvSchema = new mongoose.Schema(
  {
    profile: {
      type: Object,
    },
    recruitmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruitment',
    },
    recruitment: {
      type: Object,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    status: {
      type: Boolean,
      default: false,
    },
    failed: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    keyName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    keyTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    keyCompany: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Cv', CvSchema);
