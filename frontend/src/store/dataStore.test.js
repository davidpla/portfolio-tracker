// src/store/dataStore.test.js
import { act } from 'react'
import { useDataStore } from './dataStore'
import * as api from '../services/api'

jest.mock('../config', () => ({
    API_URL: 'http://mocked-api.com'
}))

jest.mock('../services/api')

describe('useDataStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useDataStore.setState(useDataStore.getInitialState())
    jest.clearAllMocks()
  })

  it('sets selected asset type', () => {
    useDataStore.getState().setSelectedType('crypto')
    expect(useDataStore.getState().selectedType).toBe('crypto')
  })

  it('fetchPortfolio - success', async () => {
    const mockData = [{ ticker: 'AAPL', name: 'Apple', value: 100 }]
    api.fetchPortfolioData.mockResolvedValue(mockData)

    await act(async () => {
      await useDataStore.getState().fetchPortfolio('123', 'stock')
    })

    const state = useDataStore.getState()
    expect(state.loading).toBe(false)
    expect(state.portfolioData).toEqual(mockData)
    expect(state.error).toBeNull()
    expect(api.fetchPortfolioData).toHaveBeenCalledWith('123', 'stock')
  })

  it('fetchPortfolio - failure', async () => {
    api.fetchPortfolioData.mockRejectedValue(new Error('Network error'))

    await act(async () => {
      await useDataStore.getState().fetchPortfolio('123', 'stock')
    })

    const state = useDataStore.getState()
    expect(state.loading).toBe(false)
    expect(state.portfolioData).toBeNull()
    expect(state.error).toBe('Network error')
  })

  it('fetchPortfolioChart - success', async () => {
    const mockChartData = { totalValue: 1000, chart: { AAPL: 60, MSFT: 40 } }
    api.fetchPortfolioChartData.mockResolvedValue(mockChartData)

    await act(async () => {
      await useDataStore.getState().fetchPortfolioChart('123')
    })

    const state = useDataStore.getState()
    expect(state.loading).toBe(false)
    expect(state.portfolioChartData).toEqual(mockChartData)
    expect(state.error).toBeNull()
    expect(api.fetchPortfolioChartData).toHaveBeenCalledWith('123')
  })

  it('fetchPortfolioChart - failure', async () => {
    api.fetchPortfolioChartData.mockRejectedValue(new Error('Chart error'))

    await act(async () => {
      await useDataStore.getState().fetchPortfolioChart('123')
    })

    const state = useDataStore.getState()
    expect(state.loading).toBe(false)
    expect(state.portfolioChartData).toBeNull()
    expect(state.error).toBe('Chart error')
  })
})
