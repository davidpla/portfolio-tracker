import React from 'react' // ✅ Required for unit testing
import { useDataStore } from "../../store/dataStore"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { formatAssetType, formatCurrency } from "../../ui/formatters"
import styles from './PortfolioChart.module.css'

ChartJS.register(ArcElement, Tooltip, Legend)

export const PortfolioChart = () => {
  const { portfolioChartData } = useDataStore((state) => state)
  let groupedData = {}
  if (portfolioChartData && portfolioChartData.chart) {
    groupedData = Object.fromEntries(
      Object.entries(portfolioChartData.chart).map(([key, value]) => [formatAssetType(key), value])
    )
  }

  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Portfolio Distribution",
        data: Object.values(groupedData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <figure className={styles.figure}>
      <h2 className={styles.title}>Portfolio Chart</h2>
      { chartData && <Pie data={chartData} /> }
      {portfolioChartData && portfolioChartData.total_value && (
        <div className={styles.totalValue}>
          <h2>{formatCurrency(portfolioChartData.total_value)}</h2>
        </div>
      )}
    </figure>
  )
}