import React from 'react' // ✅ Required for JSX in this context
import { render, screen } from '@testing-library/react'
import { PortfolioChart } from './PortfolioChart'
import { useDataStore } from '../../store/dataStore'
import * as formatters from '../../ui/formatters'

// Mock Pie chart
jest.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="mock-pie-chart" />
}))

// Mock the store
jest.mock('../../store/dataStore', () => ({
  useDataStore: jest.fn()
}))

describe('PortfolioChart', () => {
  beforeEach(() => {
    useDataStore.mockReturnValue({
      portfolioChartData: {
        chart: {
          crypto: 100,
          stocks: 200,
        },
        total_value: 300,
      },
    })

    jest.spyOn(formatters, 'formatAssetType').mockImplementation((key) => key.toUpperCase())
    jest.spyOn(formatters, 'formatCurrency').mockImplementation((val) => `$${val}`)
  })

  it('renders chart title, pie chart and total value', () => {
    render(<PortfolioChart />)

    expect(screen.getByText(/portfolio chart/i)).toBeInTheDocument()
    expect(screen.getByTestId('mock-pie-chart')).toBeInTheDocument()
    expect(screen.getByText('$300')).toBeInTheDocument()
  })
})
