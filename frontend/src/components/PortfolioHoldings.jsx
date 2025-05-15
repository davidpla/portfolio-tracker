import { useMemo, useState } from 'react'
import { useDataStore } from '../store/dataStore'
import { formatAssetType, formatCurrency } from '../ui/formatters'
import styles from './PortfolioHoldings.module.css'
import { ASSET_TYPES } from '../constants/assetTypes'

export const PortfolioHoldings = ({ userId }) => {
  const {fetchPortfolio ,portfolioData, selectedType, setSelectedType } = useDataStore((state) => state)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const handleAssetTypeChange = (event) => {
    const selectedType = event.target.value
    setSelectedType(selectedType)
    fetchPortfolio(userId, selectedType)
  }

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!portfolioData) return []
    if (!sortConfig.key) return portfolioData

    const sorted = [...portfolioData].sort((a, b) => {
      let aValue = a[sortConfig.key]
      let bValue = b[sortConfig.key]

      // For formatted columns, handle undefined/null and string comparison
      if (aValue === undefined || aValue === null) aValue = ''
      if (bValue === undefined || bValue === null) bValue = ''

      if (typeof aValue === 'string') aValue = aValue.toLowerCase()
      if (typeof bValue === 'string') bValue = bValue.toLowerCase()

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [portfolioData, sortConfig])

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle direction
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
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
          <tr className={`${styles.tableHeader} ${styles.cursorPointer}`}>
            <th className={`${styles.tableCell} ${styles.leftAlign}`} onClick={() => handleSort('name')}>Asset</th>
            <th className={styles.tableCell} onClick={() => handleSort('ticker')}>Ticker</th>
            <th className={styles.tableCell} onClick={() => handleSort('type')}>Type</th>
            <th className={styles.tableCell} onClick={() => handleSort('percentage')}>Percentage (%)</th>
            <th className={`${styles.tableCell} ${styles.rightAlign}`} onClick={() => handleSort('value')}>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((item, index) => (
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