import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'multiple-choice',
      'multiple-response',
      'true-false',
      'fill-in-blank',
      'matching',
      'ordering',
      'numeric',
      'short-answer',
      'essay',
      'file-upload'
    ]
  },
  text: { type: String, required: true },
  points: { type: Number, default: 1 },
  options: [{ type: String }], // For MC, Multiple Response, Matching choices
  correctAnswer: mongoose.Schema.Types.Mixed, // String, Array, or Object
  explanation: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Tied to a specific admin user
  adminPassword: { type: String }, // Legacy field for older tests
  introduction: { type: String, default: '' },
  theme: { type: String, default: 'default' }, // TestMoz has colors like 'corporate', 'crimson'
  language: { type: String, default: 'en' },
  status: { type: String, default: 'draft', enum: ['draft', 'published'] },
  
  settings: {
    pagination: { type: String, default: 'all', enum: ['all', 'one-per-page'] },
    randomizeQuestions: { type: Boolean, default: false },
    allowBlank: { type: Boolean, default: false },
    negativeMarking: { type: Number, default: 0 },
    
    review: {
      showScore: { type: Boolean, default: true },
      showOutline: { type: Boolean, default: true },
      showCorrectness: { type: Boolean, default: true },
      showCorrectAnswers: { type: Boolean, default: true },
      showExplanations: { type: Boolean, default: true },
      conclusionText: { type: String, default: '' }
    },
    
    access: {
      mode: { type: String, default: 'anyone', enum: ['anyone', 'passcode', 'identifier', 'email'] },
      passcode: { type: String, default: '' },
      timeLimit: { type: Number, default: 0 }, // 0 means unlimited
      attempts: { type: Number, default: 0 } // 0 means unlimited
    },
    
    browser: {
      disableRightClick: { type: Boolean, default: false },
      disableCopyPaste: { type: Boolean, default: false },
      proctoring: { type: Boolean, default: false }
    }
  },
  
  questions: [QuestionSchema],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Test || mongoose.model('Test', TestSchema);
