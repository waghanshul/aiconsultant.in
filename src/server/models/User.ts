import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  goals: [{
    text: String,
    completed: Boolean,
    createdAt: Date,
  }],
  chatHistory: [{
    profile: String,
    messages: [{
      role: String,
      content: String,
      timestamp: Date,
    }],
  }],
});

export default mongoose.model('User', UserSchema);