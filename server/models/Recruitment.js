const mongoose = require('mongoose');

const RecruitmentSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    workingForm: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    display: {
      type: Boolean,
      default: true,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    keyTitle: {
      type: String,
      required: true,
    },
    keyCompany: {
      type: String,
      required: true,
    },
    keyLocation: {
      type: String,
      required: true,
    },
    keyCareer: {
      type: String,
      required: true,
    },
    keyWkForm: {
      type: String,
      required: true,
    },
    keyLevel: {
      type: String,
      required: true,
    },
    keyExp: {
      type: String,
      required: true,
    },
    cv: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cv',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Recruitment', RecruitmentSchema);
