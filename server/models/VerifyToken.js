const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerifyTokenSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'account',
    unique: true,
  },
  verifyToken: { type: String, require: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 }, // 1 hours
});

module.exports = mongoose.model('VerifyToken', VerifyTokenSchema);
