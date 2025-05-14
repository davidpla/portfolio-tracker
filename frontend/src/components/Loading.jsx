import styles from './Loading.module.css'

export const Loading = () => (
  <div className={styles.loadingContainer}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className={styles.spinner}
      aria-label="Loading"
    >
      <circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke="#00ff99"
        strokeWidth="4"
        strokeDasharray="100"
        strokeDashoffset="60"
      />
    </svg>
    <p className={styles.loadingText}>Loading data...</p>
  </div>
)