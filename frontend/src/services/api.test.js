// src/services/api.test.js
import { API_URL } from '../config'
import { fetchPortfolioData, fetchPortfolioChartData } from './api'

jest.mock('../config', () => ({
    API_URL: 'http://mocked-api.com'
}))

describe('API Service', () => {
  const userId = 'user123'
  const assetType = 'stock'

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('fetchPortfolioData', () => {
    it('should call the correct endpoint and return data', async () => {
      const mockData = [{ name: 'AAPL', value: 10000 }]
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      })

      const data = await fetchPortfolioData(userId, assetType)

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/portfolio?user_id=${userId}&asset_type=${assetType}`
      )
      expect(data).toEqual(mockData)
    })

    it('should throw 404 error if user not found', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })

      await expect(fetchPortfolioData(userId, assetType)).rejects.toThrow(
        `User [${userId}] not found`
      )
    })

    it('should throw generic error for other failures', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })

      await expect(fetchPortfolioData(userId, assetType)).rejects.toThrow(
        'Network response was not ok'
      )
    })
  })

  describe('fetchPortfolioChartData', () => {
    it('should call the correct chart endpoint and return data', async () => {
      const mockChartData = [{ date: '2024-01-01', value: 1000 }]
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockChartData),
      })

      const data = await fetchPortfolioChartData(userId)

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/portfolio/chart?user_id=${userId}`
      )
      expect(data).toEqual(mockChartData)
    })

    it('should handle chart API 404 error', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })

      await expect(fetchPortfolioChartData(userId)).rejects.toThrow(
        `User [${userId}] not found`
      )
    })
  })
})
