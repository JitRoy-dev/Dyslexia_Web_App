import CheckIcon from './icons/CheckIcon';
import AlertIcon from './icons/AlertIcon';
import styles from './AnalysisResult.module.css';

const AnalysisResult = ({ result, preview, onReset }) => {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultLayout}>
        <img src={preview} alt="analyzed" className={styles.analyzedImage} />
        <div className={styles.resultDetails}>
          <div className={`${styles.statusBadge} ${result.hasDyslexia ? styles.warning : styles.success}`}>
            <span className={styles.statusIcon}>
              {result.hasDyslexia ? <AlertIcon /> : <CheckIcon />}
            </span>
            <span className={styles.statusText}>
              {result.hasDyslexia ? "Dyslexia Indicators Found" : "No Dyslexia Detected"}
            </span>
          </div>

          <p className={styles.sectionLabel}>Confidence Score</p>
          <div className={styles.confidenceBar}>
            <div className={styles.progressTrack}>
              <div 
                className={`${styles.progressFill} ${result.hasDyslexia ? styles.warningFill : styles.successFill}`}
                style={{ width: `${(result.confidence * 100).toFixed(0)}%` }}
              />
            </div>
            <span className={styles.confidenceValue}>{(result.confidence * 100).toFixed(1)}%</span>
          </div>

          <p className={styles.sectionLabel}>Analysis Markers</p>
          <div className={styles.markers}>
            {result.markers.map((m, i) => (
              <span 
                key={i} 
                className={`${styles.marker} ${result.hasDyslexia ? styles.warningMarker : styles.successMarker}`}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {result.hasDyslexia && (
        <div className={styles.disclaimer}>
          ⚠️ <strong>Note:</strong> This is a screening tool and not a clinical diagnosis. Please consult a licensed specialist for a comprehensive evaluation.
        </div>
      )}

      <button onClick={onReset} className={styles.resetButton}>
        ↩ Analyze Another Sample
      </button>
    </div>
  );
};

export default AnalysisResult;
