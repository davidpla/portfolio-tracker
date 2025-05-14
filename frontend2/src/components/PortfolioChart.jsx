import { useDataStore } from "../store/dataStore"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { formatCurrency } from "../ui/formatters"

ChartJS.register(ArcElement, Tooltip, Legend)

export const PortfolioChart = () => {
  const { portfolioChartData } = useDataStore((state) => state)
  let groupedData = {}
  if (portfolioChartData && portfolioChartData.chart) {
    groupedData = portfolioChartData.chart
  }
  //let groupedData = portfolioChartData?.chart //TODO remove this line

  // Prepare data for the Pie chart
  const chartData = {
    labels: Object.keys(groupedData), // Asset types (e.g., "stock", "crypto", "bond")
    datasets: [
      {
        label: "Portfolio Distribution",
        data: Object.values(groupedData), // Total amounts for each type
        backgroundColor: [
          "#FF6384", // Color for each type
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
    <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignContent: 'flex-start',
        width: "90%",
        maxWidth: "330px",
        minWidth: '250px',
        minHeight: '250px'
      }}>
      <h2 style={{ paddingBottom: '2rem' }}>Portfolio Chart</h2>
      { chartData && <Pie data={chartData} /> }
      {portfolioChartData && portfolioChartData.total_value && (
        <div style={{ paddingTop: "2rem", textAlign: "center" }}>
          <h2>{formatCurrency(portfolioChartData.total_value)}</h2>
        </div>
      )}
    </figure>
  )
}