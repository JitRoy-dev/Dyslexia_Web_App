import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.badge}>
        Powered by Deep Learning
      </div>
      <h2 className={styles.title}>
        Detect Dyslexia from<br />Handwritten Samples
      </h2>
      <p className={styles.description}>
        Upload a handwriting image and let our AI analyze it for dyslexia indicators in seconds.
      </p>
    </div>
  );
};

export default Hero;
