// PortfolioHoldings.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PortfolioHoldings } from './PortfolioHoldings'
import { useDataStore } from '../../store/dataStore'
import { ASSET_TYPES } from '../../constants/assetTypes'

// Mock formatters
jest.mock('../../ui/formatters', () => ({
  formatAssetType: (type) => type?.toUpperCase() || 'N/A',
  formatCurrency: (value) => `$${Number(value).toFixed(2)}`,
}))

// Mock CSS module
jest.mock('./PortfolioHoldings.module.css', () => new Proxy({}, {
  get: (target, prop) => prop,
}))

// Mock data store
jest.mock('../../store/dataStore', () => ({
  useDataStore: jest.fn(),
}))

describe('PortfolioHoldings', () => {
  const mockFetchPortfolio = jest.fn()
  const mockSetSelectedType = jest.fn()

  const mockStore = {
    fetchPortfolio: mockFetchPortfolio,
    setSelectedType: mockSetSelectedType,
    selectedType: '',
    portfolioData: [
      {
        name: 'Apple Inc',
        ticker: 'AAPL',
        type: 'stock',
        percentage: 50,
        value: 10000,
      },
      {
        name: 'Tesla',
        ticker: 'TSLA',
        type: 'stock',
        percentage: 50,
        value: 10000,
      },
    ],
  }

  beforeEach(() => {
    useDataStore.mockImplementation(() => mockStore)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders portfolio table with data', () => {
    render(<PortfolioHoldings userId="123" />)

    expect(screen.getByText('Portfolio Holdings')).toBeInTheDocument()
    expect(screen.getByText('Apple Inc')).toBeInTheDocument()
    expect(screen.getByText('TSLA')).toBeInTheDocument()
    expect(screen.getAllByText('STOCK')).toHaveLength(2)
    expect(screen.getAllByText('$10000.00')).toHaveLength(2)
  })

  test('calls setSelectedType and fetchPortfolio on dropdown change', () => {
    render(<PortfolioHoldings userId="123" />)

    const select = screen.getByTitle('Asset Type')
    fireEvent.change(select, { target: { value: ASSET_TYPES[0] } })

    expect(mockSetSelectedType).toHaveBeenCalledWith(ASSET_TYPES[0])
    expect(mockFetchPortfolio).toHaveBeenCalledWith('123', ASSET_TYPES[0])
  })

  test('sorts data when column header is clicked', () => {
    render(<PortfolioHoldings userId="123" />)

    const assetHeader = screen.getByText('Asset')
    fireEvent.click(assetHeader)

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Apple Inc')
    expect(rows[2]).toHaveTextContent('Tesla')
  })
})