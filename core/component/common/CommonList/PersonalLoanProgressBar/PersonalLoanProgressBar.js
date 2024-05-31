import Image from 'next/image'
import React from 'react'

const PersonalLoanProgressBar = ({ stepper }) => {
  let width = 'w-[20%]'
  let subWidth = 'w-[79%]'

  if (stepper === 2) {
    width = 'w-[30%]'
    subWidth = 'w-[69%]'
  }
  if (stepper === 3) {
    width = 'w-[60%]'
    subWidth = 'w-[59%]'
  }
  if (stepper === 4) {
    width = 'w-[80%]'
    subWidth = 'w-[49%]'
  }
  if (stepper === 5) {
    width = 'w-[95%]'
    subWidth = 'w-[39%]'
  }
  if (stepper === 6) {
    width = 'w-[100%]'
    subWidth = 'w-[19%]'
  }
  if (stepper === 7) {
    width = 'w-[98%] recommendationSubLoan'
    subWidth = 'w-[1%]'
  }

  return (
    <>
      <div className='flex'>
        <div className={`h-[5px] ${width}  bg-[#844FCF] recommendationLoan relative left-[0.8rem]`} />
        <div className={`h-[5px] ${subWidth}  bg-[#E9DFF6] recommendationSubLoan`} />
      </div>
    </>
  )
}

export default PersonalLoanProgressBar
