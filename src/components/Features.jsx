import styles from './Features.module.css';

const features = [
  { icon: "🔍", title: "AI-Powered Analysis", desc: "Deep learning model trained on handwriting samples" },
  { icon: "⚡", title: "Instant Results", desc: "Get detection results in seconds" },
  { icon: "📊", title: "Confidence Score", desc: "Detailed probability metrics for accurate diagnosis" },
  { icon: "🔒", title: "Privacy First", desc: "Images are never stored or shared" },
];

const Features = () => {
  return (
    <div className={styles.featuresGrid}>
      {features.map((f, i) => (
        <div key={i} className={styles.featureCard}>
          <div className={styles.featureIcon}>{f.icon}</div>
          <p className={styles.featureTitle}>{f.title}</p>
          <p className={styles.featureDesc}>{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
