'use client';

import { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  Edit3, 
  GripVertical,
  HelpCircle
} from 'lucide-react';
import { addQuestion, deleteQuestion, updateQuestion } from '../../question-actions';
import styles from './questions-list.module.css';

export default function QuestionList({ testId, initialQuestions }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [editingId, setEditingId] = useState(null);

  const handleAdd = async (type) => {
    await addQuestion(testId, type);
    // Refresh questions via Server Component refresh (automatic with revalidatePath)
  };

  const handleDelete = async (qId) => {
    if (confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(testId, qId);
    }
  };

  const handleUpdate = async (qId, update) => {
    await updateQuestion(testId, qId, update);
    setEditingId(null);
  };

  const questionTypes = [
    { label: 'Multiple Choice', value: 'multiple-choice' },
    { label: 'True/False', value: 'true-false' },
    { label: 'Fill in the Blank', value: 'fill-in-blank' },
    { label: 'Numeric', value: 'numeric' },
    { label: 'Short Answer', value: 'short-answer' },
    { label: 'Essay', value: 'essay' }
  ];

  return (
    <div className={styles.questionsContainer}>
      <div className={styles.questionsList}>
        {initialQuestions.map((q, index) => (
          <div key={q._id} className={`${styles.questionCard} card`}>
            <div className={styles.questionHeader}>
              <span className={styles.qNumber}>Question {index + 1}</span>
              <div className="q-actions">
                <button onClick={() => handleDelete(q._id)} className={styles.deleteBtn}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className={styles.qBody}>
              <div className="q-text-row">
                <textarea 
                  defaultValue={q.text} 
                  onBlur={(e) => handleUpdate(q._id, { text: e.target.value })}
                  placeholder="Question text..."
                />
              </div>
              
              <div className={styles.qMeta}>
                <div className="input-group">
                  <label>Points</label>
                  <input 
                    type="number" 
                    defaultValue={q.points} 
                    onBlur={(e) => handleUpdate(q._id, { points: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Type</label>
                  <span>{q.type.replace('-', ' ')}</span>
                </div>
              </div>
              
              {/* Question-specific options */}
              {q.type === 'multiple-choice' && (
                <div className={styles.optionsList}>
                  {q.options.map((opt, i) => (
                    <div key={i} className={styles.optionRow}>
                      <input 
                        type="radio" 
                        name={`q-${q._id}`} 
                        checked={q.correctAnswer === opt}
                        onChange={() => handleUpdate(q._id, { correctAnswer: opt })}
                      />
                      <input 
                        type="text"
                        defaultValue={opt} 
                        onBlur={(e) => {
                          const newOpts = [...q.options];
                          newOpts[i] = e.target.value;
                          handleUpdate(q._id, { options: newOpts });
                        }}
                      />
                    </div>
                  ))}
                  <button 
                    className={styles.addOpt}
                    onClick={() => handleUpdate(q._id, { options: [...q.options, `Option ${q.options.length + 1}`] })}
                  >
                    + Add Option
                  </button>
                </div>
              )}
              
              {q.type === 'true-false' && (
                <div className={styles.optionsList}>
                  <label>
                    <input 
                      type="radio" 
                      name={`q-${q._id}`} 
                      checked={q.correctAnswer === 'true'}
                      onChange={() => handleUpdate(q._id, { correctAnswer: 'true' })}
                    /> True
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name={`q-${q._id}`} 
                      checked={q.correctAnswer === 'false'}
                      onChange={() => handleUpdate(q._id, { correctAnswer: 'false' })}
                    /> False
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {initialQuestions.length === 0 && (
          <div className={styles.emptyQuestions}>
            <HelpCircle size={48} />
            <p>No questions yet. Use the bar below to add your first question.</p>
          </div>
        )}
      </div>

      {/* Floating Add Bar */}
      <div className={styles.addBarContainer}>
        <div className={`${styles.addBar} glass`}>
          <div className={styles.categoryLabel}>Graduated:</div>
          {questionTypes.map((type) => (
            <button key={type.value} onClick={() => handleAdd(type.value)} className={styles.addBtn}>
              {type.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
