import dbConnect from '@/lib/db';
import Test from '@/models/Test';
import { updateTestSettings } from '../../settings-actions';
import styles from './settings.module.css';

export default async function SettingsPage({ params }) {
  const { testId } = await params;
  
  await dbConnect();
  const test = await Test.findById(testId).lean();

  if (!test) return <div>Test not found</div>;

  const updateWithId = updateTestSettings.bind(null, testId);

  const themeClasses = {
    default: styles.themePreviewDefault,
    corporate: styles.themePreviewCorporate,
    crimson: styles.themePreviewCrimson,
    genghis: styles.themePreviewGenghis
  };

  return (
    <div className={styles.settingsView}>
      <h1>Settings</h1>
      
      <form action={updateWithId}>
        {/* Basic Settings */}
        <section className={`${styles.settingsSection} card`}>
          <h2>Basic Settings</h2>
          <div className="input-group">
            <label>Test Name</label>
            <input type="text" name="title" defaultValue={test.title} required />
          </div>
          <div className="input-group">
            <label>Introduction</label>
            <textarea name="introduction" defaultValue={test.introduction} placeholder="Instructions for students..." rows={5} />
          </div>
          <div className="input-group">
            <label>Color Scheme</label>
            <div className={styles.themeSelector}>
              {['default', 'corporate', 'crimson', 'genghis'].map(t => (
                <label key={t} className={styles.themeOption}>
                  <input type="radio" name="theme" value={t} defaultChecked={test.theme === t} />
                  <span className={`${styles.themePreview} ${themeClasses[t]}`}></span>
                  <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Question Settings */}
        <section className={`${styles.settingsSection} card`}>
          <h2>Question Settings</h2>
          <div className={styles.checkboxGroup}>
            <label>Pagination</label>
            <div className={styles.radioOptions}>
              <label>
                <input type="radio" name="pagination" value="all" defaultChecked={test.settings?.pagination === 'all'} />
                Show All Questions on one page
              </label>
              <label>
                <input type="radio" name="pagination" value="one-per-page" defaultChecked={test.settings?.pagination === 'one-per-page'} />
                Show One Question per page
              </label>
            </div>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" name="randomizeQuestions" defaultChecked={test.settings?.randomizeQuestions} />
              Randomize the order of the questions during the test
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" name="allowBlank" defaultChecked={test.settings?.allowBlank} />
              Allow students to submit blank/empty answers
            </label>
          </div>
          <div className="input-group">
            <label>Penalize incorrect answers (negative marking)</label>
            <input type="number" name="negativeMarking" step="0.1" defaultValue={test.settings?.negativeMarking || 0} />
          </div>
        </section>

        {/* Review Settings */}
        <section className={`${styles.settingsSection} card`}>
          <h2>Review Settings</h2>
          <p className={styles.description}>These control what happens after the test is completed.</p>
          <div className="input-group">
            <label>Conclusion Text</label>
            <textarea name="conclusionText" defaultValue={test.settings?.review?.conclusionText} placeholder="Message shown after completion..." rows={4} />
          </div>
          <div className={styles.checkboxList}>
            <label><input type="checkbox" name="showScore" defaultChecked={test.settings?.review?.showScore} /> Display Score</label>
            <label><input type="checkbox" name="showOutline" defaultChecked={test.settings?.review?.showOutline} /> Display Test Outline</label>
            <label className={styles.subCheckbox}><input type="checkbox" name="showCorrectness" defaultChecked={test.settings?.review?.showCorrectness} /> Indicate if response was correct or incorrect</label>
            <label className={styles.subCheckbox}><input type="checkbox" name="showCorrectAnswers" defaultChecked={test.settings?.review?.showCorrectAnswers} /> Display the correct answer</label>
            <label className={styles.subCheckbox}><input type="checkbox" name="showExplanations" defaultChecked={test.settings?.review?.showExplanations} /> Display the explanation</label>
          </div>
        </section>

        {/* Access Control */}
        <section className={`${styles.settingsSection} card`}>
          <h2>Access Control</h2>
          <div className="input-group">
            <label>Who can take your test?</label>
            <select name="accessMode" defaultValue={test.settings?.access?.mode}>
              <option value="anyone">Anyone</option>
              <option value="passcode">Anyone who enters a passcode</option>
              <option value="identifier">Anyone who enters a unique identifier</option>
            </select>
          </div>
          <div className="input-group">
            <label>Passcode (if applicable)</label>
            <input type="text" name="passcode" defaultValue={test.settings?.access?.passcode} />
          </div>
          <div className={styles.grid2}>
            <div className="input-group">
              <label>Time Limit (minutes, 0 = unlimited)</label>
              <input type="number" name="timeLimit" defaultValue={test.settings?.access?.timeLimit} />
            </div>
            <div className="input-group">
              <label>How many times can someone take your test? (0 = unlimited)</label>
              <input type="number" name="attempts" defaultValue={test.settings?.access?.attempts} />
            </div>
          </div>
        </section>

        {/* Browser functionality */}
        <section className={`${styles.settingsSection} card`}>
          <h2>Browser Functionality</h2>
          <div className={styles.checkboxList}>
            <label><input type="checkbox" name="disableRightClick" defaultChecked={test.settings?.browser?.disableRightClick} /> Disable right-click context menu</label>
            <label><input type="checkbox" name="disableCopyPaste" defaultChecked={test.settings?.browser?.disableCopyPaste} /> Disable copy/paste</label>
          </div>
        </section>

        <div className={styles.formActions}>
          <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem' }}>Save Settings</button>
        </div>
      </form>
    </div>
  );
}
