//import { useState } from 'react'
import { useDataStore } from '../store/dataStore'
import { formatAssetType, formatCurrency } from '../ui/formatters'
import styles from './PortfolioHoldings.module.css'
import { ASSET_TYPES } from '../constants/assetTypes'

export const PortfolioHoldings = ({ userId }) => {
  const {fetchPortfolio ,portfolioData, selectedType, setSelectedType } = useDataStore((state) => state)

  const handleAssetTypeChange = (event) => {
    const selectedType = event.target.value
    setSelectedType(selectedType)
    fetchPortfolio(userId, selectedType)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Portfolio Holdings</h2>
        <select
          onChange={handleAssetTypeChange}
          className={styles.select}
          title='Asset Type'
          value={selectedType}
        >
          <option value=''>All</option>
          {ASSET_TYPES.map((type, index) => (
            <option key={index} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={`${styles.tableCell} ${styles.leftAlign}`}>Asset</th>
            <th className={`${styles.tableCell}`}>Ticker</th>
            <th className={`${styles.tableCell}`}>Type</th>
            <th className={`${styles.tableCell}`}>Percentage (%)</th>
            <th className={`${styles.tableCell} ${styles.rightAlign}`}>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {portfolioData?.map((item, index) => (
            <tr key={index}>
              <td className={`${styles.tableCell} ${styles.leftAlign}`}>{item.name || 'Unknown'}</td>
              <td className={`${styles.tableCell}`}>{item.ticker || 'Unknown'}</td>
              <td className={`${styles.tableCell}`}>{formatAssetType(item.type) || 'N/A'}</td>
              <td className={`${styles.tableCell}`}>{item.percentage || 0}%</td>
              <td className={`${styles.tableCell} ${styles.rightAlign}`}>{formatCurrency(item.value) || formatCurrency(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}