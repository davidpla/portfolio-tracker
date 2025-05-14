export const NoData = ({userId}) => {

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
    {userId && <p style={{ fontSize: '2rem' }}>No data to display for User ID {userId}</p>}
    <p style={{ fontSize: '2rem' }}>Indicate a valid User ID in the top-right input text</p>
  </div>
}
