import InputRange from 'react-input-range'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState, useRef } from 'react'
import Input from '@/core/commonInsideComponent/Input'
import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js'

const StackedBarChart = ({ data, interestEarned, totalContributions, totalSavings }) => {
  useEffect(() => {
    const options = {
      type: 'bar',
      height: 200,
      axisOptions: {
        xAxisMode: 'tick',
        xIsSeries: true
      },

      barOptions: {
        stacked: true,
        spaceRatio: 0
      },
      colors: ['#DDC6FF', '#CEABFF', '#A874F3']
    }

    new Chart('#chart', { data, ...options })
  }, [data, totalContributions, totalSavings, interestEarned])

  return <div id='chart' />
}

const EmiSliderChart = () => {
  const [initialDeposit, setInitialDeposit] = useState('0')
  const [monthlyContributions, setMonthlyContributions] = useState('0')
  const [apr, setApr] = useState('0')

  const [periodValue, setPeriodValue] = useState('')
  const [periodType, setPeriodType] = useState('months')
  const [interestEarned, setInterestEarned] = useState()
  const [totalContributions, setTotalContributions] = useState()
  const [totalSavings, setTotalSavings] = useState()

  const handlePeriodChange = (e) => {
    setPeriodType(e.target.value)
    setPeriodValue('0')
  }

  const handleYearChange = (e) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 12) {
      setPeriodValue(value)
    }
  }

  const handleChange = (e) => {
    if (e?.target?.name === 'Principle') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        setInitialDeposit('')
      } else {
        setInitialDeposit(Math.round(e.target.value?.replace(/\D/g, '')))
      }
    }
    if (e?.target?.name === 'intrest') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        setMonthlyContributions('')
      } else {
        setMonthlyContributions(Math.round(e.target.value?.replace(/\D/g, '')))
      }
    }
  }

  const handleAprChange = (e) => {
    if (e?.target?.name === 'apr') {
      const value = e.target.value

      if (!isNaN(value) && value <= 20) {
        setApr(value)
      } else {
        setApr(20)
      }
    }
  }

  useEffect(() => {
    // interest earned
    const Interest_earned = initialDeposit * apr * periodValue
    setInterestEarned(Math.round(Interest_earned))

    // Total contributions:
    const Total_contributions = initialDeposit + monthlyContributions
    setTotalContributions(Math.round(Total_contributions))
    // Total savings
    const Total_savings = Interest_earned + Total_contributions
    setTotalSavings(Math.round(Total_savings))
  }, [initialDeposit, apr, periodValue])

  const chartData = {
    labels: [''],
    datasets: [
      {
        values: [interestEarned],
      },
      {
        values: [totalContributions],
      },
      {
        values: [totalSavings],
      }
    ]
  }
  return (
    <>
      <div className='grid grid-cols-12  bg-white p-[50px] max-sm:p-[20px] rounded-lg h-auto'>
        <div className='col-span-7 max-xl:col-span-12'>
          <div className='loan-calculator-bg'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] font-semibold'>Initial Deposit </h3>
              </div>

              <div className='bg-[#F4F8FB] w-[150px] flex justify-center gap-[26px] px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <span className='symbole-rupee'>₹</span>
                <Input
                  className='m-0 w-full bg-[#F4F8FB] text-right outline-none symbole-rupee'
                  name='Principle'
                  value={initialDeposit}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={100000}
                minValue={0}
                name='Principle'
                value={initialDeposit}
                onChange={(value) => {
                  handleChange()
                  setInitialDeposit(value)
                }}
              />
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] font-semibold'>Monthly contribution</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] flex justify-center  px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <span className='symbole-rupee'>₹</span>
                <Input
                  className='m-0 w-full bg-[#F4F8FB] text-right outline-none symbole-rupee'
                  name='intrest'
                  value={monthlyContributions}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={100000}
                minValue={0}
                name='intrest'
                value={monthlyContributions}
                onChange={(value) => {
                  handleChange()
                  setMonthlyContributions(value)
                }}
              />
            </div>
          </div>

          <div className='loan-calculator-bg mt-[28px]'>
            <h3 className='text-[15px] font-semibold'>Over a period of</h3>
            <div className='flex justify-between'>
              <div className='flex max-sm:flex-wrap pt-[8px] gap-4'>
                <div>
                  <label htmlFor='months' className='form-redio flex gap-2 items-center text-[#212529]'>
                    <input
                      type='radio'
                      id='months'
                      name='periodType'
                      value='months'
                      checked={periodType === 'months'}
                      onChange={handlePeriodChange}
                    />
                    Months
                  </label>
                </div>
                <div>
                  <label htmlFor='years' className='form-redio flex gap-2 items-center text-[#212529]'>
                    <input
                      type='radio'
                      id='years'
                      name='periodType'
                      value='years'
                      checked={periodType === 'years'}
                      onChange={handlePeriodChange}
                    />
                    Years
                  </label>
                </div>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] gap-1 flex justify-end px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <input
                  type='number'
                  id='periodValue'
                  className='m-0 bg-[#F4F8FB] w-[45px] text-right outline-none'
                  name='periodValue'
                  value={periodValue}

                  onChange={(e) => handleYearChange(e)}
                />
                {periodType === 'months' ? 'Months' : 'Years'}
              </div>
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] font-semibold'>APY (%)</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] gap-1 flex justify-between px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <span className='symbole-rupee text-left'>%</span>
                <Input
                  className='m-0 bg-[#F4F8FB] w-[45px] text-right outline-none'
                  name='apr'
                  min='0'
                  max='20'
                  value={apr}
                  onChange={(e) => handleAprChange(e)}
                />
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={20}
                minValue={0}
                name='apr'
                value={apr}
                onChange={(value) => {
                  handleAprChange()
                  setApr(value)
                }}
              />
            </div>
          </div>
        </div>
        <div className='col-span-5 max-xl:col-span-12 max-lg:mt-5 md:pl-6'>
          <div className='frappeeSavings h-auto p-4 xl:pt-0' id='chart'>
            <StackedBarChart
              data={chartData}
              interestEarned={interestEarned}
              totalContributions={totalContributions}
              totalSavings={totalSavings}
            />
          </div>

          <div className='flex flex-col justify-baseline items-right gap-4 px-4 mb-4'>
            <div className='flex justify-between items-center gap-4'>
              <div className='flex justify-between items-center gap-2'>
                <div className='w-[12px] h-[12px] rounded-full bg-[#DDC6FF]'></div>
                <p className='text-neutral-800 text-[15px] font-normal font-[Poppins] leading-[21px]'>
                  Interest earned
                </p>
              </div>
              <div className='justify-end'>
                <p className='text-neutral-800 text-[15px] font-semibold font-[Poppins] leading-normal'>
                  <span className='symbole-rupee'>₹</span>

                  {interestEarned}
                </p>
              </div>
            </div>
            <div className='flex justify-between items-center gap-4'>
              <div className='flex justify-between items-center gap-2'>
                <div className='w-[12px] h-[12px] rounded-full bg-[#CEABFF]'></div>

                <p className='text-neutral-800 text-[15px] font-normal font-[Poppins] leading-[21px]'>
                  Total contributions
                </p>
              </div>
              <div>
                <p className='text-neutral-800 text-[15px] font-semibold font-[Poppins] leading-normal'>
                  <span className='symbole-rupee'>₹</span>

                  {totalContributions}
                </p>
              </div>
            </div>
            <div className='flex justify-between items-center gap-4'>
              <div className='flex justify-between items-center gap-2'>
                <div className='w-[12px] h-[12px] rounded-full bg-[#A874F3]'></div>

                <p className='text-neutral-800 text-[15px] font-normal font-[Poppins] leading-[21px]'>
                  Initial deposit
                </p>
              </div>
              <div>
                <p className='text-neutral-800 text-[15px] font-semibold font-[Poppins] leading-normal'>
                  <span className='symbole-rupee'>₹</span>

                  {totalSavings}
                </p>
              </div>
            </div>
          </div>
          <div className='sm:w-[281px] h-[126px] flex flex-col gap-5 bg-[#F4F8FB] rounded-xl justify-center items-center p-4 my-6'>
            <p className='text-neutral-800 text-[15px] font-medium font-[Poppins] leading-[21px]'>Your total savings</p>
            <p className='text-neutral-800 text-3xl font-medium font-[Poppins] leading-[21px]'>
              <span className='symbole-rupee'>₹</span>

              {totalSavings}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmiSliderChart
