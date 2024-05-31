import React from 'react'
import Image from 'next/image'

const CommonArrowButton = ({ activeArrow, handleArrowClick ,pos}) => {
  return (
    <div className={ `${pos===true ? 'arr-pos' :'navigation'}  cursor-pointer`}>
      <button
        className={`arrowButton ${activeArrow === 'left' ? 'arrowactive' : ''}`}
        onClick={() => handleArrowClick('left')}>
        {activeArrow === 'left' ? (
          <Image src={'/assets/slider-prev-arrow-active.svg'} width={'40'} height={'40'} alt='image' />
        ) : (
          <Image src={'/assets/slider-prev-arrow.svg'} width={'40'} height={'40'} alt='image' />
        )}
      </button>
      <button
        className={`arrowButton ${activeArrow === 'right' ? 'active' : ''}`}
        onClick={() => handleArrowClick('right')}>
        {activeArrow === 'right' ? (
          <Image src={'/assets/slider-arrow-next-active.svg'} width={'40'} height={'40'} alt='image' />
        ) : (
          <Image src={'/assets/slider-arrow-next.svg'} width={'40'} height={'40'} alt='image' />
        )}
      </button>
    </div>
  )
}

export default CommonArrowButton
