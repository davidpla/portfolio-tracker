// src/services/api.js
import { API_URL } from "../config"

export const fetchPortfolioData = (userId, assetType) => {
  console.log('fetching fetchPortfolioData from backend. URL: ', API_URL)

  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ user_id: `user_${userId}` })
    if (assetType) {
      params.append("asset_type", assetType)
    }
    fetch(`${API_URL}/portfolio?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`User [${userId}] not found`)
          }
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
  })
}


export const fetchPortfolioChartData = (userId) => {
  console.log('fetching fetchPortfolioChartData from backend. URL: ', API_URL)

  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ user_id: `user_${userId}` })

    fetch(`${API_URL}/portfolio/chart?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`User [${userId}] not found`)
          }

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
  })
}