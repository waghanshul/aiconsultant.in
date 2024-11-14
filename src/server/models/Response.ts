import mongoose from 'mongoose';

const ResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  sectionId: {
    type: String,
    required: true,
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Response', ResponseSchema);
