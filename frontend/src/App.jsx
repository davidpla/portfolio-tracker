import './App.css'
import { toast, Toaster } from 'sonner'
import { useDataStore } from './store/dataStore'
import { Loading } from './components/Loading'
import { NoData } from './components/NoData'
import { useEffect, useState } from 'react'
import { PortfolioHoldings } from './components/PortfolioHoldings'
import { PortfolioChart } from './components/PortfolioChart'

export default function PortfolioTracker() {
  const {loading, error, fetchPortfolio, fetchPortfolioChart, portfolioData, portfolioChartData} = useDataStore((state) => state)
  const [userId, setUserId] = useState('')
  const [debouncedUserId, setDebouncedUserId] = useState('') 

  useEffect(() => {
    if (!debouncedUserId) return
    fetchPortfolio(debouncedUserId)
  }, [fetchPortfolio, debouncedUserId])

  useEffect(() => {
    if (!debouncedUserId) return
      fetchPortfolioChart(debouncedUserId)
  }, [fetchPortfolioChart, debouncedUserId])

   // Debounce userId
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUserId(userId) // Update debounced userId after 0.5 seconds
    }, 500)

    return () => {
      clearTimeout(handler) // Clear timeout if userId changes before 0.5 seconds
    }
  }, [userId])
  
  const handleUserIdChange = (event) => {
    setUserId(event.target.value)
  }

  // Handle error: clear input and focus on it
  useEffect(() => {
    if (error) {      
      setUserId('')
      console.error('TOAST: Error fetching data:', error)
      toast.error(error, { className: 'toastError' })
    }
  }, [error])
  
  return (
    <>
      <div className="appContainer">
        <section className="headerSection">
          <div>
            <h1 className="headerTitle">AssetDash Portfolio Tracker</h1>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search by User ID"
              value={userId}
              onChange={handleUserIdChange}
              onClick={(e) => e.target.select()}
              maxLength={15}
              className="searchInput"
            />
          </div>
        </section>

        <section className="mainSection">
          <div className="articlesContainer">
            {portfolioChartData && !error && (
              <>
                <article className="chartArticle">
                  <PortfolioChart />
                </article>
            
                <article className="holdingsArticle">
                  <PortfolioHoldings userId={debouncedUserId}/>
                </article>
              </>
            )}
          </div>

          {loading && <Loading />}
          {!loading && !portfolioData && !portfolioChartData && <NoData />}
        </section>              
      </div>

      <Toaster />
    </>
  )
}


