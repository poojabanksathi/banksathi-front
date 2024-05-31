const ProgressBars = ({ rating, maxRating }) => {
  const percentage = maxRating !== 0 ? (rating / maxRating) * 100 : 0
  return (
    <div className='rating-progress-bar'>
      <div className='rating-progress-bar-inner' style={{ width: `${percentage}%` }}></div>
    </div>
  )
}

export default ProgressBars
