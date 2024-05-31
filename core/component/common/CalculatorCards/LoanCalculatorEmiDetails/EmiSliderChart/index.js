import InputRange from 'react-input-range'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import Input from '@/core/commonInsideComponent/Input'

const EmiSliderChart = ({ loanname }) => {
  const [Principle, SetPrinciple] = useState(10000)
  const [Interst, SetIntrest] = useState(10)
  const [LoanTenture, SetLoanTenture] = useState(10)
  const [EMI, setEMI] = useState(10)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  useEffect(() => {
    if (loanname === 'loan-emi') {
      SetIntrest(10)
    }
    if (loanname === 'car-loan') {
      SetIntrest(8.5)
    }
    if (loanname === 'personal-loan') {
      SetIntrest(11)
    }
    if (loanname === 'home-loan') {
      SetIntrest(9)
    }
  }, [])
  var options = {
    series: [parseInt(Principle), parseInt(totalInterest)],
    colors: ['#A882DD', '#844FCF'],
    labels: ['Principal Amount', 'Interest Amount'],
    chart: {
      width: 380,
      type: 'donut'
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            show: false
          }
        }
      }
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230
    }
  }

  const handleChange = (e) => {
    if (e?.target?.name === 'Principle') {
      if(e.target.value?.length === 1 && e.target.value?.startsWith('0')){
        SetPrinciple('')
      }else{
        SetPrinciple(Math.round(e.target.value?.replace(/\D/g, '')))
      }
    }
    if (e?.target?.name === 'intrest') {
      if(e.target.value <= 100){
        SetIntrest(Math.round(e.target.value?.replace(/[^0-9.]/g, '')))
      }
    }
    if (e?.target?.name === 'tenture') {
      SetLoanTenture(e.target.value?.replace(/\D/g, ''))
    }
  }

  useEffect(() => {
    const principal = parseFloat(Principle)
    const rate = parseFloat(Interst) / 12 / 100
    const time = parseFloat(LoanTenture)
    if (principal && rate && time) {
      const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
      setEMI(Math.round(emiValue))

      const totalInterestValue = emiValue * time - principal
      setTotalInterest(Math.round(totalInterestValue))

      const totalPaymentValue = emiValue * time
      setTotalPayment(Math.round(totalPaymentValue))
    }
  }, [Interst, LoanTenture, Principle])

  return (
    <>
      <div className='grid grid-cols-12 bg-white p-[50px] max-sm:p-[20px] rounded-lg h-[580px] max-xl:h-auto'>
        <div className='col-span-7 max-xl:col-span-12'>
          <div className='loan-calculator-bg'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] font-semibold'>Loan Amount </h3>
              </div>
              <div className='bg-[#F4F8FB] w-[200px] flex justify-center gap-[26px] px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <Input
                   className='m-0 w-full bg-[#F4F8FB] text-right outline-none symbole-rupee'
                  name='Principle'
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  
                  value={`₹ ${Principle.toLocaleString('en-US',{
                    minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                  })} `}
                />
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={10000000}
                minValue={0}
                name='Principle'
                value={Principle}
                onChange={(value) => {
                  handleChange()
                  SetPrinciple(value)
                }}
              />
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] font-semibold'>Rate of Interest (p.a)</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] flex justify-center  px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                <Input
                  className='m-0 w-full bg-[#F4F8FB] text-right outline-none'
                  name='intrest'
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  value={`${Interst}`}
                />
                %
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={100}
                minValue={0}
                name='intrest'
                value={Interst}
                onChange={(value) => {
                  handleChange()
                  SetIntrest(value)
                }}
              />
            </div>
          </div>
          <div className='loan-calculator-bg mt-[28px]'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-[15px] font-semibold'>Tenure (Months)</h3>
              </div>
              <div className='bg-[#F4F8FB] w-[150px] gap-1 flex justify-center px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
 
                <Input
                  className='m-0 bg-[#F4F8FB] w-[45px] text-right outline-none'
                  name='tenture'
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  value={`${LoanTenture}`}
                />
                Months
              </div>
            </div>
            <div className='mt-[20px]'>
              <InputRange
                maxValue={300}
                minValue={0}
                name='tenture'
                value={LoanTenture}
                onChange={(value) => {
                  handleChange()
                  SetLoanTenture(value)
                }}
              />
            </div>
          </div>
          <div className='pt-[65px]'>
            <div className='flex justify-between my-2'>
              <p className='text-[15px] font-normal'>Monthly EMI</p>
              <p className='text-[15px] font-semibold mt-0 symbole-rupee'>₹ {EMI.toLocaleString('en-US', {
               
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}</p>
            </div>
            <div className='flex justify-between my-2'>
              <p className='text-[15px] font-normal'>Loan Amount</p>
              <p className='text-[15px] font-semibold mt-0 symbole-rupee'>
              ₹ {Principle.toLocaleString('en-US', {
                   
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className='flex justify-between my-2'>
              <p className='text-[15px] font-normal'>Total Interest Payable</p>
              <p className='text-[15px] font-semibold mt-0 symbole-rupee'>
              ₹ {totalInterest.toLocaleString('en-US', {
                  
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className='flex justify-between my-2'>
              <p className='text-[15px] font-normal'>Total Amount Payable</p>
              <p className='text-[15px] font-semibold mt-0 symbole-rupee'>
              ₹ {totalPayment.toLocaleString('en-US', {
                  
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
        <div className='col-span-5 max-xl:col-span-12 max-lg:mt-5'>
          <ReactApexChart options={options} series={options.series} type={'donut'} height={250} />
        </div>
      </div>
    </>
  )
}

export default EmiSliderChart