import { create } from 'zustand'
import { fetchPortfolioData, fetchPortfolioChartData } from '../services/api'

export const useDataStore = create((set) => ({
  loading: false, // boolean
  error: null, // string message
  portfolioData: null, // {ticker: string, name: string, type: string, value: number, percetage: number }:[]
  portfolioChartData: null, // {totalValue: number, chart: {} }
  selectedType: '', // string asset type
  setLoading: () => set({ loading: true, error: null }),
  setError: (error) => set({ error, loading: false, portfolioData: null }),
  setSelectedType: (type) => set({ selectedType: type }),
  fetchPortfolio: async (userId, assetType) => {
    set({ loading: true, error: null, portfolioData: null })
    try {
      const data = await fetchPortfolioData(userId, assetType)
      set({ portfolioData: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  fetchPortfolioChart: async (userId) => {
    set({ loading: true, error: null, portfolioChartData: null })
    try {      
      const data = await fetchPortfolioChartData(userId)
      set({ portfolioChartData: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

}))