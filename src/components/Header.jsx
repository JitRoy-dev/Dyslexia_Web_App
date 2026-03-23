import BrainIcon from './icons/BrainIcon';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.iconWrapper}>
          <BrainIcon />
        </div>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>DyslexiaScan AI</h1>
          <p className={styles.subtitle}>Handwriting Analysis Platform</p>
        </div>
      </div>
      <div className={styles.statusBadge}>
        ● Model Active
      </div>
    </header>
  );
};

export default Header;
