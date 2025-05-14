import { create } from 'zustand'
import { fetchPortfolioData } from '../services/api'

export const useDataStore = create((set) => ({
  loading: false,
  error: null,
  portfolioData: null, // {totalValue, holdings: []}
  portfolioFilteredHoldings: null, // filteredHoldings: []
  selectedType: '',
  setLoading: () => set({ loading: true, error: null }),
  setError: (error) => set({ error, loading: false, portfolioData: null }),
  setSelectedType: (type) => set({ selectedType: type }),
  fetchPortfolio: async (userId) => {
    set({ loading: true, error: null, portfolioData: null })
    try {
      const data = await fetchPortfolioData(userId)
      set({ portfolioData: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  fetchPortfolioFilteredHoldings: async (userId, assetType) => {
    set({ loading: true, error: null, portfolioFilteredHoldings: null })
    try {      
      const data = await fetchPortfolioData(userId, assetType)
      const filteredHoldings = data?.filteredHoldings
      set({ portfolioFilteredHoldings: filteredHoldings, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

}))