import { useRef, useCallback, useState } from 'react';
import UploadIcon from './icons/UploadIcon';
import styles from './UploadZone.module.css';

const UploadZone = ({ onFileSelect, preview, onReset }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onFileSelect(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  return (
    <>
      <div
        onClick={() => !preview && fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''} ${preview ? styles.hasPreview : ''}`}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" className={styles.previewImage} />
            <button 
              onClick={(e) => { e.stopPropagation(); onReset(); }} 
              className={styles.removeButton}
            >
              ✕ Remove
            </button>
          </>
        ) : (
          <div className={styles.uploadPrompt}>
            <div className={styles.uploadIcon}>
              <UploadIcon />
            </div>
            <p className={styles.uploadTitle}>Drop your handwriting image here</p>
            <p className={styles.uploadSubtitle}>or click to browse — PNG, JPG, JPEG supported</p>
            <span className={styles.chooseFileButton}>Choose File</span>
          </div>
        )}
      </div>
      <input 
        ref={fileRef} 
        type="file" 
        accept="image/*" 
        style={{ display: "none" }} 
        onChange={e => handleFile(e.target.files[0])} 
      />
    </>
  );
};

export default UploadZone;
