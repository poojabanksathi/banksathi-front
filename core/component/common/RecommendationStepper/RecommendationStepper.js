import Image from 'next/image'
import React from 'react'
import recommendationPurple from '../../../../public/assets/recommendationStepperPurple.svg'
import recommendationGray from '../../../../public/assets/recommendationStepperGray.svg'

const RecommendationStepper = ({ stepper, setStepper, activeStep }) => {
  return (
    <div className='flex gap-[10px] items-center justify-center'>
      <Image
        src={stepper >= 1 ? recommendationPurple : recommendationGray}
        width={70}
        height={5}
        alt='dashline'
        className='max-sm:w-[35px] max-sm:h-[5px]'
      />
      <Image
        src={stepper >=2 ? recommendationPurple : recommendationGray}
        width={70}
        height={5}
        alt='dashline'
        className='max-sm:w-[35px] max-sm:h-[5px]'
      />
      <Image
        src={stepper >= 3 ? recommendationPurple : recommendationGray}
        width={70}
        height={5}
        alt='dashline'
        className='max-sm:w-[35px] max-sm:h-[5px]'
      />
      <Image
        src={stepper >= 4 ? recommendationPurple : recommendationGray}
        width={70}
        height={5}
        alt='dashline'
        className='max-sm:w-[35px] max-sm:h-[5px]'
      />
      <Image
        src={stepper >= 5 ? recommendationPurple : recommendationGray}
        width={70}
        height={5}
        alt='dashline'
        className='max-sm:w-[35px] max-sm:h-[5px]'
      />
    </div>
  )
}

export default RecommendationStepper
