export const FetchError = ({ message }) => {  
  return <div 
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      gap: '2rem'
    }}
  >
    <p style={{ fontSize: '2rem' }}>Error fetching data!</p>
    <p style={{ fontSize: '2rem' }}>{message}</p>
  </div>
}


