import styles from './NoData.module.css'

export const NoData = () => {
  return (
    <div className={styles.noDataContainer}>
      <p className={styles.noDataText}>
        Indicate a valid User ID in the top-right input text
      </p>
    </div>
  )
}