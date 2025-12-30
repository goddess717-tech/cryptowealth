import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    lastLogin: Date,
    otpCode: String,
    otpExpiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
