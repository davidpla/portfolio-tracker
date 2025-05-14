// src/hooks/usePortfolioData.js
import { useState, useEffect } from 'react'
import { fetchPortfolioData } from '../services/api'

/**
 * Custom hook for fetching and managing portfolio data
 * @returns {Object} Portfolio data state and operations
 */
export function usePortfolioData({filter}) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const portfolioData = await fetchPortfolioData()
        console.log('portfolioData', portfolioData)
        setData(portfolioData)
        
      } catch (err) {
        console.log('error fetching data!')
        setError(err)
        
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [filter])

  return { data, isLoading, error }
}