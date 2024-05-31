import InputRange from 'react-input-range'
import { useEffect, useState } from 'react'
import Input from '@/core/commonInsideComponent/Input'

const EPFSliderChart = () => {
  const rateOfInterest = 8.15
  const [monthlySallery, setMonthlySellery] = useState(50000)
  const [age, setAge] = useState(30)
  const [contribution, setContribution] = useState(12)
  const [salary, setSalary] = useState(5)
  const [epfAmount, setEpfAmount] = useState(0)

  const handeChange = (e) => {
    if (e?.target?.name === 'basicDa') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        setMonthlySellery('')
      } else {
        setMonthlySellery(e.target.value?.replace(/\D/g, ''))
      }
    }
    if (e?.target?.name === 'age') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        setAge('')
      } else {
        setAge(e.target.value?.replace(/\D/g, ''))
      }
    }
    if (e?.target?.name === 'contributation') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        setContribution('')
      } else {
        if (e.target.value <= 100) {
          setContribution(e.target.value?.replace(/[^0-9.]/g, ''))
        }
      }
    }
    if (e?.target?.name === 'increse') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        setSalary('')
      } else {
        if (e.target.value <= 100) {
          setSalary(e.target.value?.replace(/[^0-9.]/g, ''))
        }
      }
    }
  }

  const initialMonthlySalary = monthlySallery
  const monthlyContribution = contribution
  const annualSalaryIncrease = salary
  const yearsUntilRetirement = 65 - age

  useEffect(() => {
    let currentMonthlySalary = initialMonthlySalary
    let currentEpfBalance = 0
    for (let i = 0; i < yearsUntilRetirement; i++) {
      currentEpfBalance += 12 * currentMonthlySalary * (monthlyContribution / 100)
      currentEpfBalance *= 1 + rateOfInterest / 100
      currentMonthlySalary *= 1 + annualSalaryIncrease / 100
    }
    setEpfAmount(currentEpfBalance)
  }, [yearsUntilRetirement, initialMonthlySalary, monthlyContribution, annualSalaryIncrease, rateOfInterest])

  return (
    <>
      <div className='grid grid-cols-12 bg-white p-[50px] max-sm:p-[20px] rounded-lg h-[580px] max-xl:h-auto'>
        <div className='col-span-7 max-xl:col-span-12'>
          <div className='loan-calculator-bg'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] max-sm:text-[14px] font-semibold'>Monthly Salary (Basic + DA)</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] flex justify-center gap-[36px] px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <Input
                  className='m-0 w-full bg-[#F4F8FB] text-right outline-none symbole-rupee'
                  name='basicDa'
                  onChange={(e) => handeChange(e)}
                  value={`₹ ${monthlySallery.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}`}
                />
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={500000}
                minValue={0}
                step={100}
                value={monthlySallery}
                onChange={(value) => {
                  handeChange()
                  setMonthlySellery(Math.round(value / 100) * 100)
                }}
              />
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] max-sm:text-[14px] font-semibold'>Your Age</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] flex justify-center  px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <Input
                  className='m-0 w-full bg-[#F4F8FB] text-right outline-none'
                  name='age'
                  onChange={(e) => handeChange(e)}
                  value={`${age}`}
                />
                Yr
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={58}
                minValue={0}
                value={age}
                onChange={(value) => {
                  handeChange()
                  setAge(value)
                }}
              />
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] max-sm:text-[14px] font-semibold'>Your contribution to EPF</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] flex justify-center  px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <Input
                  name='contributation'
                  className='m-0 w-full bg-[#F4F8FB] text-right outline-none'
                  onChange={(e) => handeChange(e)}
                  value={`${contribution}`}
                />
                %
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={20}
                minValue={0}
                value={contribution}
                onChange={(value) => {
                  handeChange()
                  setContribution(value)
                }}
              />
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] max-sm:text-[14px] font-semibold'>Annual increase in salary</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] flex justify-center  px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <Input
                  name='increse'
                  className='m-0 w-full bg-[#F4F8FB] text-right outline-none'
                  onChange={(e) => handeChange(e)}
                  value={`${salary}`}
                />
                %
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={15}
                minValue={0}
                value={salary}
                onChange={(value) => {
                  handeChange()
                  setSalary(value)
                }}
              />
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] font-semibold'>Rate of interest</h3>
              </div>
              <div className='w-[150px] flex justify-center gap-[30px] text-[#212529] items-center h-[40px] rounded font-semibold'>
                <p className='m-0'>{rateOfInterest}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-4 max-lg:col-span-12 max-lg:mt-5 lg:pl-6'>
          <div className='sm:w-[281px] h-auto flex flex-col gap-4 bg-[#F4F8FB] rounded-xl justify-center items-center py-6 px-6 my-6'>
            <p className='text-neutral-800 text-[15px] font-medium font-[Poppins] leading-[21px]'>Your total savings</p>
            <p className='text-neutral-800 text-[15px] font-medium font-[Poppins] leading-[21px]'>
              <span className='text-[#212529] text-[15px] font-semibold symbole-rupee'>
                ₹{' '}
                {epfAmount?.toLocaleString('en-IN', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </span>
              <br /> by the time you retire
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EPFSliderChart
