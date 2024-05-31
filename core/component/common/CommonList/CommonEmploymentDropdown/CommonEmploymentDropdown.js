/* eslint-disable react-hooks/exhaustive-deps */
import { incomeOptions } from '@/utils/alljsonfile/personal-loan'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CommonEmploymentDropdown = ({ userInformation, setUserInformation, handleInputChange }) => {
  const isSalaried = userInformation?.occupation === 'Salaried'
  const isSelfEmployed = userInformation?.occupation === 'Self-employed'
  const incomeValue = isSalaried ? userInformation?.monthly_salary : userInformation?.itr_amount

  const [selectedItr, setSelectedItr] = useState('Select')
  const [selectedIncome, setSelectedIncome] = useState('Select')
  const [openIncomeOptions, setOpenIncomeOptions] = useState(false)
  const [openItrOptions, setOpenItrOptions] = useState(false)
  const [isAbove100K, setIsAbove100K] = useState(false)

  const handleIncomeClick = (income, type) => {
    const split = income?.split(' ')
    const length = split?.length
    let value = split?.[length - 1]?.replace('K', '000')
    if (value === '100000+') {
      setIsAbove100K(true)
      value = value?.split('+')?.[0] + 1
    } else setIsAbove100K(false)

    if (type === 'itr') {
      setSelectedItr(income)
      setUserInformation({ ...userInformation, itr_amount: value })
      setOpenItrOptions(false)
    } else {
      setSelectedIncome(income)
      setUserInformation({ ...userInformation, monthly_salary: value })
      setOpenIncomeOptions(false)
    }
  }

  const getEmojiComp = () => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <Image src='/assets/triangle.svg' height={10} width={20} alt='triangle' className='relative top-[1px]' />
        <div className='w-full h-[30px] bg-[#E9DFF6] text-center flex justify-center items-center'>
          <span className="text-neutral-800 text-[13px] font-normal font-['Poppins']">
            OMG! seems like you don’t need us{' '}
          </span>
          <span className="text-neutral-800 text-[15px] font-normal font-['Poppins']">😜</span>
        </div>
      </div>
    )
  }

  const companyName = () => {
    return (
      <div>
        <label className='text-[13px] font-normal text-[#212529] ' htmlFor='employerName'>
          Company Name
        </label>
        <input
          className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
          id='employerName'
          name='company_name'
          onChange={(e) => handleInputChange(e)}
          value={userInformation?.company_name}
          type='text'
          placeholder='Enter employer name'
        />
      </div>
    )
  }
  useEffect(() => {
    if (incomeValue && incomeValue !== '0') {
      incomeOptions?.forEach((item) => {
        if (isSalaried) {
          if (item?.valueToMatch === userInformation?.monthly_salary) setSelectedIncome(item?.name)
        } else {
          if (userInformation?.itr_amount && userInformation?.itr_amount !== '0') {
            if (item?.valueToMatch === userInformation?.itr_amount) setSelectedItr(item?.name)
            else setSelectedItr('Select')
          }
        }
      })
    }
  }, [])

  return (
    <div>
      <div className='mt-[21px]'>
        <p className='text-[13px] font-normal text-[#212529]'>Empoyment Type</p>
        <div className='flex pt-[10px] gap-4 max-[576px]:gap-2'>
          <div>
            <label
              htmlFor='gender'
              className={`form-redio flex gap-2 items-center ${isSalaried ? 'text-[#212529]' : 'text-[#808080]'}`}>
              <input
                type='radio'
                id='occupation'
                checked={isSalaried}
                name='occupation'
                value='Salaried'
                onChange={(e) => {
                  handleInputChange(e)
                }}
              />
              Salaried
            </label>
          </div>
          <div>
            <label
              htmlFor='occupation'
              className={`form-redio flex gap-2 items-center  ${isSelfEmployed ? 'text-[#212529]' : 'text-[#808080]'}`}>
              <input
                type='radio'
                name='occupation'
                value='Self-employed'
                checked={isSelfEmployed}
                onChange={(e) => {
                  handleInputChange(e)
                }}
              />
              Self-Employed
            </label>
          </div>
        </div>
      </div>
      <div className='mt-[20px]'>
        <div className='grid grid-cols-1 gap-4 max-[1200px]:!grid-cols-1 max-[1024px]:grid-cols-1 '>
          {isSalaried && (
            <>
              {companyName()}
              <div className=''>
                <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                  Total Monthly Income
                </label>
                <div className='flex flex-col items-center justify-center md:gap-0 relative'>
                  <div className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'>
                    <div
                      className='flex items-center justify-between'
                      onClick={() => setOpenIncomeOptions(!openIncomeOptions)}>
                      <div>{selectedIncome}</div>
                      <Image
                        src='/assets/accordion-down.svg'
                        alt='arrow'
                        width={17}
                        height={17}
                        className={openIncomeOptions ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
                      />
                    </div>
                  </div>
                  {openIncomeOptions && (
                    <div className='w-full auto shadow-md rounded-md absolute top-[3.5rem] bg-white z-[999]'>
                      <div className='flex flex-col items-start justify-center gap-y-[10px] px-4 my-4'>
                        {incomeOptions?.map((item) => {
                          return (
                            <p
                              className='cursor-pointer text-[#212529] hover:text-[#844FCF]'
                              key={item?.id}
                              onClick={() => handleIncomeClick(item?.name, 'income')}>
                              {item?.name}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {isAbove100K && selectedIncome !== 'Select' && <>{getEmojiComp()}</>}
              </div>
            </>
          )}
          {isSelfEmployed && (
            <>
              {companyName()}
              <div className=''>
                <label className='text-[13px] font-normal text-[#212529] ' htmlFor='income'>
                  ITR (amount)
                </label>
                <div className='flex flex-col items-center justify-center md:gap-0 relative'>
                  <div className='shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'>
                    <div
                      className='flex items-center justify-between'
                      onClick={() => setOpenItrOptions(!openItrOptions)}>
                      <div>{selectedItr}</div>
                      <Image
                        src='/assets/accordion-down.svg'
                        alt='arrow'
                        width={17}
                        height={17}
                        className={openItrOptions ? 'rotate-180 relative top-[2px]' : 'relative top-[2px]'}
                      />
                    </div>
                  </div>
                  {openItrOptions && (
                    <div className='w-full auto shadow-md rounded-md absolute top-[3.5rem] bg-white z-[999]'>
                      <div className='flex flex-col items-start justify-center gap-y-[10px] px-4 my-4'>
                        {incomeOptions?.map((item) => {
                          return (
                            <p
                              className='cursor-pointer text-[#212529] hover:text-[#844FCF]'
                              key={item?.id}
                              onClick={() => handleIncomeClick(item?.name, 'itr')}>
                              {item?.name}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {isAbove100K && selectedItr !== 'Select' && <>{getEmojiComp()}</>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommonEmploymentDropdown
