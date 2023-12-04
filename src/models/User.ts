import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const chatSchema = new mongoose.Schema({
  id: { type: String, default: randomUUID() },
  role: {
    // there are 2 types of role in OpenAI: 1) user, 2) assistant
    type: String,
    required: true,
  },
  content: {
    // stored messages with GPT
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

export default mongoose.model('User', userSchema);
