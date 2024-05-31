import React from 'react'

const LoanEligibility = ({ productDetailsData, monthlySalary, itrAmount }) => {
  const minAge = productDetailsData?.min_age
  const maxAge = productDetailsData?.max_age

  return (
    <div className='flex flex-col items-start justify-start lg:p-[30px] px-[25px] max-md:py-[16px]  w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:place-items-center'>
        <div className='lg:flex lg:flex-row flex flex-col '>
          {monthlySalary && (
            <div className='flex flex-col items-start justify-start'>
              <div className="text-neutral-800 text-[15px] lg:text-lg font-semibold font-['Poppins'] leading-[25.20px] mb-[12px]">
                Salaried
              </div>
              <ul className='list-disc pl-[15px]'>
                {minAge && <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>Minimum age - {minAge} years</li>}
                {maxAge && <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>Max age - {maxAge} Years</li>}
                {monthlySalary && (
                  <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>
                    Minimum monthly salary - {monthlySalary} monthly
                  </li>
                )}
              </ul>
            </div>
          )}
          {itrAmount && <div className='border lg:ml-[100px] lg:mr-[10px] my-[16px]' />}
        </div>
        {itrAmount && (
          <div className='flex flex-col items-start justify-start lg:ml-4 lg:mx-[10px]'>
            <div className="text-neutral-800 text-[15px] lg:text-lg font-semibold font-['Poppins'] leading-[25.20px] mb-[12px]">
              Self-Employed
            </div>
            <ul className='list-disc pl-[15px]'>
              <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>Minimum age - {minAge} years</li>
              <li className='mb-[8px] pl-[8px] max-md:text-[12px]'>Max age {maxAge} Years</li>
              <li className='mb-[8px] pl-[8px] max-md:text-[12px]'> ITR Amount - {itrAmount}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoanEligibility
