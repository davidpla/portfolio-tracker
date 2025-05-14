// src/services/api.js
import { API_URL } from "../config"
import { MOCK_USER_DATA } from "./mock/data.mock"

/**
 * Fetches portfolio data
 * @returns {Promise} A promise that resolves to portfolio data
 */
export const fetchPortfolioData = (userId, assetType) => {
  const useMockData = !API_URL
  
  console.log('fetching data from backend. URL: ', API_URL)

  return new Promise((resolve, reject) => {    
    // uncomment to simulate network failures
    //reject(new Error("Failed to fetch portfolio data. Please try again."))

    // Simulate network request
    if (useMockData) {
      console.log('using mock data')
      if (!assetType) {
        console.log('no asset type provided, using all data') //TODO remove this log
        resolve(MOCK_USER_DATA[userId])
      }
      
      // Filter asset type
      if (!MOCK_USER_DATA[userId]) {
        resolve(MOCK_USER_DATA[userId])
      }

      console.log('asset type provided, filtering data')
      const filteredHoldingsData = MOCK_USER_DATA[userId].holdings.filter((item) => item.type === assetType)         
      const portfolioFilteredHoldings = {
        ...MOCK_USER_DATA[userId],
        filteredHoldings: filteredHoldingsData,
      }
      resolve(portfolioFilteredHoldings)
    
    }else {
      console.log('using real data')
      fetch(`${API_URL}/portfolio/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}
