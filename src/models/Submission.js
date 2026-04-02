import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  studentName: { type: String, required: true },
  studentIdentifier: { type: String, default: '' },
  
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    answer: mongoose.Schema.Types.Mixed, // String, Array, or Object
    isCorrect: { type: Boolean, default: false },
    score: { type: Number, default: 0 }
  }],
  
  totalScore: { type: Number, default: 0 },
  maxPossibleScore: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  
  timeStarted: { type: Date, required: true },
  timeEnded: { type: Date, required: true },
  timeTaken: { type: Number, default: 0 }, // In seconds
  
  status: { type: String, default: 'submitted', enum: ['in-progress', 'submitted', 'abandoned'] },
  
  metadata: {
    ip: { type: String },
    userAgent: { type: String }
  }
});

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
