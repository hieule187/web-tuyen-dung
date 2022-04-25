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
  },
  { timestamps: true },
);

module.exports = mongoose.model('Cv', CvSchema);
