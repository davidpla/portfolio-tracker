/**
 * Mock API service for portfolio data
 */

// Mock portfolio data
export const MOCK_PORTFOLIO_DATA = {
  totalValue: 45203,
  holdings: [
    { id: 1, type: "stock", name: "Apple", ticker: "AAPL", percentage: 20, amount: 9040.6 },
    { id: 2, type: "stock", name: "Microsoft", ticker: "MSFT", percentage: 15, amount: 6780.45 },
    { id: 3, type: "stock", name: "Amazon", ticker: "AMZN", percentage: 25, amount: 11300.75 },
    { id: 4, type: "stock", name: "Google", ticker: "GOOGL", percentage: 20, amount: 9040.6 },
    { id: 5, type: "crypto", name: "Bitcoin", ticker: "BTC", percentage: 10, amount: 4520.3 },
    { id: 6, type: "crypto", name: "Ethereum", ticker: "ETH", percentage: 3, amount: 1356.09 },
    { id: 7, type: "bond", name: "US bond", ticker: "B-US1", percentage: 7, amount: 3164.21 },
  ]
}

export const MOCK_PORTFOLIO_DATA2 = {
  totalValue: 3000,
  holdings: [
    { id: 21, type: "nft", name: "Bored APE", ticker: "#1111", percentage: 30, amount: 900 },
    { id: 22, type: "defi", name: "Uniswap-ETH/USDC", ticker: "#2222", percentage: 60, amount: 1800 },
    { id: 23, type: "nft", name: "Cryptopunk", ticker: "#3333", percentage: 10, amount: 300 },
  ],
}

export const MOCK_PORTFOLIO_DATA3 = {
  totalValue: 45203,
  holdings: [
    { id: 1, type: "stock", name: "Apple", ticker: "AAPL", percentage: 15, amount: 6780.45 },
    { id: 2, type: "stock", name: "Microsoft", ticker: "MSFT", percentage: 10, amount: 4520.3 },
    { id: 3, type: "stock", name: "Amazon", ticker: "AMZN", percentage: 20, amount: 9040.6 },
    { id: 4, type: "stock", name: "Google", ticker: "GOOGL", percentage: 15, amount: 6780.45 },
    { id: 5, type: "crypto", name: "Bitcoin", ticker: "BTC", percentage: 10, amount: 4520.3 },
    { id: 6, type: "crypto", name: "Ethereum", ticker: "ETH", percentage: 5, amount: 2260.15 },
    { id: 7, type: "bond", name: "US bond", ticker: "B-US1", percentage: 5, amount: 2260.15 },
    { id: 8, type: "stock", name: "Tesla", ticker: "TSLA", percentage: 5, amount: 2260.15 },
    { id: 9, type: "crypto", name: "Dogecoin", ticker: "DOGE", percentage: 3, amount: 1356.09 },
    { id: 10, type: "stock", name: "Netflix", ticker: "NFLX", percentage: 3, amount: 1356.09 },
    { id: 11, type: "stock", name: "Meta", ticker: "META", percentage: 2, amount: 904.06 },
    { id: 12, type: "bond", name: "Corporate Bond", ticker: "B-CORP", percentage: 2, amount: 904.06 },
    { id: 13, type: "crypto", name: "Litecoin", ticker: "LTC", percentage: 2, amount: 904.06 },
    { id: 14, type: "stock", name: "NVIDIA", ticker: "NVDA", percentage: 3, amount: 1356.09 },
  ],
}

export const MOCK_USER_DATA = {
  "1": MOCK_PORTFOLIO_DATA,
  "2": MOCK_PORTFOLIO_DATA2,
  "3": MOCK_PORTFOLIO_DATA3
}