import { useState } from 'react'
import { TaxData } from '@/utils/alljsonfile/filterdata'
import accordionArrowall from '../../../../../../public/assets/accordion-down.svg'

import Image from 'next/image'
import { useEffect } from 'react'
import Input from '@/core/commonInsideComponent/Input'

const IncomeTaxChart = () => {
  const [SelectIndex, setSelectIndex] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [ageCategory, setAgeCategory] = useState()
  const [belowAge, setbelowAge] = useState()
  const [data, setData] = useState([])
  const [IncomeTax, setIncomeTax] = useState()
  const handleClick = (index) => {
    setIsActive(!isActive)
    if (SelectIndex?.includes(index)) {
      const updateValue = SelectIndex.indexOf(index)
      SelectIndex.splice(updateValue, 1)
      setSelectIndex(SelectIndex)
    } else {
      setSelectIndex([...SelectIndex, index])
    }
  }
  const incomeData = [
    { id: 1, heading: 'Gross salary income', tax: 0, name: 'grossSalary' },
    { id: 2, heading: 'Annual income from other sources', tax: 0, name: 'anualIncome' },
    { id: 3, heading: 'Annual income from interest', tax: 0, name: 'anualIncomeintrest' },
    {
      id: 4,
      heading: 'Annual income from let-out house property (rental income)',
      tax: 0,
      name: 'anualIncomeHouseintrest'
    },
    { id: 5, heading: 'Annual interest paid on home loan (self-occupied)', tax: 0, name: 'anualIncomeloan' },
    { id: 6, heading: 'Annual interest paid on home loan (let-out)', tax: 0, name: 'anualIncomePaidloan' }
  ]
  const deductionData = [
    { id: 1, heading: 'Basic deductions u/s 80C', tax: 0, name: 'deductions' },
    { id: 2, heading: 'Contribution to NPS u/s 80CCD(1B)', tax: 0, name: 'contribution' },
    { id: 3, heading: 'Medical Insurance Premium u/s 80D', tax: 0, name: 'insurance' },
    { id: 4, heading: 'Donation to charity u/s 80G', tax: 0, name: 'donation' },
    { id: 5, heading: 'Interest on Educational Loan u/s 80E', tax: 0, name: 'educational' },
    { id: 6, heading: 'Interest on deposits in saving account u/s 80TTA/TTB', tax: 0, name: 'deposits' }
  ]
  const hraData = [
    { id: 1, heading: 'Basic salary received per annum', tax: 0, name: 'basicAnnum' },
    { id: 2, heading: 'Dearness allowance (DA) received per annum', tax: 0, name: 'allowanceAnnum' },
    { id: 3, heading: 'HRA received per annum', tax: 0, name: 'HRAceAnnum' },
    { id: 4, heading: 'Total rent paid per annum', tax: 0, name: 'TotalceAnnum' }
  ]
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: parseInt(e.target.value) })
  }

  const calculateIncomeTax = () => {
    const Income =
      (parseInt(data?.grossSalary) || '') +
      (parseInt(data?.anualIncome) || '') +
      (parseInt(data?.anualIncomeintrest) || '') +
      (parseInt(data?.anualIncomeHouseintrest) || '') +
      (parseInt(data?.anualIncomeloan) || '') +
      (parseInt(data?.anualIncomePaidloan) || '')
    const deduction =
      (parseInt(data?.deductions) || '') +
      (parseInt(data?.contribution) || '') +
      (parseInt(data?.insurance) || '') +
      (parseInt(data?.donation) || '') +
      (parseInt(data?.educational) || '') +
      (parseInt(data?.deposits) || '')
    const Hrm =
      (parseInt(data?.basicAnnum) || '') +
      (parseInt(data?.allowanceAnnum) || '') +
      (parseInt(data?.HRAceAnnum) || '') +
      (parseInt(data?.TotalceAnnum) || '')
    
    const taxableIncome = Income - deduction - Hrm
    const taxRate = 0.15
    const calculatedTax = taxableIncome * taxRate
    setIncomeTax(Math.round(calculatedTax))
  }
  return (
    <>
      <div className=' bg-white p-[50px] max-sm:p-[30px] rounded-[24px] h-auto max-sm:h-auto'>
        <div>
          <h3 className='text-[18px] font-medium text-[#212529]'>Assessment Year</h3>
          <div>
            <div className='flex max-sm:flex-wrap pt-[8px] gap-4'>
              <div>
                <label htmlFor='year' className=' form-redio flex gap-2 items-center text-[#212529]'>
                  
                  <Input
                    type='radio'
                    className='shadow-none'
                    name='year'
                    value='2023'
                    onChange={(e) => {
                      setAgeCategory(e.target.value)
                    }}
                  />
                  2023-2022
                </label>
              </div>
              <div>
                <label htmlFor='year' className=' form-redio flex gap-2 items-center text-[#212529]'>
                  
                  <Input
                    type='radio'
                    className='shadow-none'
                    name='year'
                    value='2022'
                    onChange={(e) => {
                      setAgeCategory(e.target.value)
                    }}
                  />
                  2022-2021
                </label>
              </div>
              <div>
                <label htmlFor='year' className=' form-redio flex gap-2 items-center text-[#212529]'>
                  
                  <Input
                    type='radio'
                    className='shadow-none'
                    name='year'
                    value='2021'
                    onChange={(e) => {
                      setAgeCategory(e.target.value)
                    }}
                  />
                  2021-2020
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-[28px]'>
          <h3 className='text-[18px] font-medium text-[#212529]'>Age Category</h3>
          <div>
            <div className='flex max-sm:flex-wrap pt-[8px] gap-4'>
              <div>
                <label htmlFor='age' className=' form-redio flex gap-2 items-center text-[#212529]'>
                  <Input type='radio' name='age' className="shadow-none" value='60' onChange={(e) => setbelowAge(e.target.value)}/>
                  Below 60
                </label>
              </div>
              <div>
                <label htmlFor='age' className=' form-redio flex gap-2 items-center text-[#212529]'>
                  <Input type='radio' name='age' className="shadow-none" value='60' onChange={(e) => setbelowAge(e.target.value)}/>
                  60 or Above 60
                </label>
              </div>
              <div>
                <label htmlFor='age' className=' form-redio flex gap-2 items-center text-[#212529]'>
                  <Input type='radio' name='age' className="shadow-none" value='60' onChange={(e) => setbelowAge(e.target.value)}/>
                  80 or Above 80
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          {TaxData.map((data, index) => {
            return (
              <div key={index}>
                <div id='accordionExample' data-active-classes='bg-none' data-inactive-classes='text-[#212529]'>
                  <button
                    className='flex cursor-pointer filter-allof items-center justify-between w-full pt-[30px] font-medium text-left text-gray-500rounded-t-xl'
                    type='button'
                    id='headingOne'
                    data-te-collapse-init
                    data-te-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                    onClick={() => {
                      handleClick(index)
                    }}>
                    <p className='text-[15px] text-[#212529] font-medium filter-text-resolution'>{data.Titlef}</p>
                    {SelectIndex?.includes(index) ? (
                      <Image
                        src={accordionArrowall}
                        alt='up'
                        width={24}
                        height={24}
                        priority={true}
                        className='rotate-180 w-6 h-6 shrink-0'
                      />
                    ) : (
                      <Image src={accordionArrowall} alt='down' width={24} height={24} priority={true} className='w-6 h-6 shrink-0' />
                    )}
                  </button>

                  {SelectIndex?.includes(index) && (
                    <div
                      id='collapseOne'
                      className='!visible'
                      data-te-collapse-item
                      data-te-collapse-show
                      aria-labelledby='headingOne'
                      data-te-parent='#accordionExample'>
                      <div className=' font-light pt-[35px] '>
                        <div className='list-none gap-y-[15px] flex flex-col'>
                          {data.slug === 'income' && (
                            <>
                              {incomeData.map((taxincome, index) => {
                                return (
                                  <>
                                    <div className='loan-calculator-bg'>
                                      <div className='flex items-center justify-between'>
                                        <div>
                                          <h3 className='text-[15px] font-nornal'>{taxincome.heading}</h3>
                                        </div>
                                        <div className='bg-[#F4F8FB] w-[150px] max-sm:w-[100px]  flex justify-end p-[14px] gap-[36px] text-[#212529] items-center h-[40px] rounded font-semibold'>
                                          <input
                                            className='m-0 w-full outline-none bg-[#F4F8FB] text-right'
                                            name={taxincome.name}
                                            onChange={(e) => handleChange(e)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              })}
                            </>
                          )}
                          {data.slug === 'deduction' && (
                            <>
                              {deductionData.map((taxincome, index) => {
                                return (
                                  <>
                                    <div className='loan-calculator-bg'>
                                      <div className='flex items-center justify-between'>
                                        <div>
                                          <h3 className='text-[15px] font-nornal'>{taxincome.heading}</h3>
                                        </div>
                                        <div className='bg-[#F4F8FB] w-[150px] max-sm:w-[100px]  flex justify-end p-[14px] gap-[36px] text-[#212529] items-center h-[40px] rounded font-semibold'>
                                          <input
                                            className='m-0 w-full outline-none bg-[#F4F8FB] text-right'
                                            name={taxincome.name}
                                            onChange={(e) => handleChange(e)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              })}
                            </>
                          )}
                          {data.slug === 'hraexemption' && (
                            <>
                              {hraData.map((taxincome, index) => {
                                return (
                                  <>
                                    <div className='loan-calculator-bg'>
                                      <div className='flex items-center justify-between'>
                                        <div>
                                          <h3 className='text-[15px] font-nornal'>{taxincome.heading}</h3>
                                        </div>
                                        <div className='bg-[#F4F8FB] w-[150px] max-sm:w-[100px]  flex justify-end p-[14px] gap-[36px] text-[#212529] items-center h-[40px] rounded font-semibold'>
                                          <input
                                            className='m-0 w-full outline-none bg-[#F4F8FB] text-right'
                                            name={taxincome.name}
                                            onChange={(e) => handleChange(e)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              })}
                              <div>
                                <h3 className='text-[15px] font-nornal'>Do you live in a metro city?</h3>
                                <div>
                                  <div>
                                    <div className='flex pt-[8px] gap-4'>
                                      <div>
                                        <label
                                          htmlFor='city'
                                          className=' form-redio flex gap-2 items-center text-[#212529]'>
                                          <input type='radio' name='city' value='city' />
                                          Yes
                                        </label>
                                      </div>
                                      <div>
                                        <label
                                          htmlFor='city'
                                          className=' form-redio flex gap-2 items-center text-[#212529]'>
                                          <input type='radio' name='city' value='city' />
                                          No
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className='py-[20px]'>
          <button
            onClick={calculateIncomeTax}
            className='head-text cursor-pointer font-[faktum] md:block h-[50px] max-[820px]:text-[14px] text-[#212529] font-semibold max-[771px]:text-[12px] items-center  bg-[#49D49D] border-0 py-2 px-3 focus:outline-none  rounded-lg text-base max-[991px]:text-sm md:mt-0  head-login-btn w-[180px] mx-auto'>
            Calculate
          </button>
        </div>
        <div className='bg-[#F4F8FB] rounded-lg p-[27px]'>
          <div className='flex items-center justify-center gap-[153px] max-sm:gap-[41px]'>
            <p className='text-[15px] font-normal text-[#212529]'>Total tax (New regime)</p>
            <p className='mt-0 text-[#212529] text-[15px] font-semibold symbole-rupee'>₹ {IncomeTax ? IncomeTax : 0}</p>
          </div>
          <div className='flex items-center justify-center gap-[153px] pt-[20px] max-sm:gap-[41px]'>
            <p className='text-[15px] font-normal text-[#212529]'>Total tax (Old regime)</p>
            <p className='mt-0 text-[#212529] text-[15px] font-semibold symbole-rupee'>₹ {IncomeTax ? IncomeTax : 0}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default IncomeTaxChart
