import styles from './AnalyzeButton.module.css';

const AnalyzeButton = ({ onClick, loading, coldStart = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${styles.analyzeButton} ${loading ? styles.loading : ''}`}
    >
      {loading ? (
        <span className={styles.loadingContent}>
          <span className={styles.spinner} />
          {coldStart ? 'Starting server...' : 'Analyzing handwriting...'}
        </span>
      ) : (
        "🔬 Analyze Handwriting"
      )}
    </button>
  );
};

export default AnalyzeButton;
