import InputRange from 'react-input-range'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import Input from '@/core/commonInsideComponent/Input'
import SIPCalculatorTab from '../../../SIPCalculatorTab'

const ShipSliderChart = ({ loanname }) => {
  const [Principle, SetPrinciple] = useState(10000)
  const [Interst, SetIntrest] = useState(10)
  const [LoanTenture, SetLoanTenture] = useState(10)
  const [EMI, setEMI] = useState(10)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [activeTab, setActiveTab] = useState(0);
  const [invetmentAmmount, setInvetmentAmmount] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(100000)
  const [estimatedReturns, setEstimatedReturns] = useState(10)
  const [investmentPeriod, setInvestmentPeriod] = useState(10)
  const [totalInterestLumpsum, setTotalInterestLumpsum] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  
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
    series: [parseInt(invetmentAmmount), parseInt(totalInterest)],
    colors: ['#D3C0EE', '#844FCF'],
    labels: ['Investment amount', 'Est. return'],
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
      position: 'bottom',
      offsetY: 0,
      height: 40
    }
  }

  const handleChange = (e) => {
    if (e?.target?.name === 'Principle') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        SetPrinciple('')
      } else {
        SetPrinciple(Math.round(e.target.value?.replace(/\D/g, '')))
      }
    }
    if (e?.target?.name === 'intrest') {
      if (e.target.value <= 100) {
        SetIntrest(Math.round(e.target.value?.replace(/[^0-9.]/g, '')))
      }
    }
    if (e?.target?.name === 'tenture') {
      SetLoanTenture(e.target.value?.replace(/\D/g, ''))
    }
  }

  useEffect(() => {
    const principal = parseFloat(Principle); 
    const rate = parseFloat(Interst) / 100 / 12; 
    const time = parseFloat(LoanTenture);
    const investmentMonths = time * 12;
    const investmentAmountVal = principal * investmentMonths;
    setInvetmentAmmount(investmentAmountVal); 

    if (principal && rate && time) {
      let currentSavings = 0;
      let totalInterestEarned = 0;

      for (let i = 0; i < investmentMonths; i++) {
        const monthlyInterest = currentSavings * rate;
        currentSavings += monthlyInterest + principal;
        totalInterestEarned += monthlyInterest;
      }

      setTotalInterest(Math.round(totalInterestEarned));
      setTotalPayment(Math.round(currentSavings));
    }
  }, [Interst, LoanTenture, Principle]);

  useEffect(() => {
    const principalAmount = investmentAmount;
    const annualInterestRate = estimatedReturns / 100 ; 
    const numberOfYears = investmentPeriod;
    const totalMonths = numberOfYears * 12;

    const lumpsumProfit = principalAmount * Math.pow(1 + annualInterestRate, numberOfYears) - principalAmount;
    setTotalInterestLumpsum(lumpsumProfit);
    setTotalValue(principalAmount + lumpsumProfit);

  }, [investmentAmount, estimatedReturns, investmentPeriod]);

  const handleChangeLumpsum = (e) => {
    if (e?.target?.name === 'investmentAmount') {
      if (e.target.value?.length === 1 && e.target.value?.startsWith('0')) {
        setInvestmentAmount('')
      } else {
        setInvestmentAmount(Math.round(e.target.value?.replace(/\D/g, '')))
      }
    }
    if (e?.target?.name === 'estimatedReturns') {
      if (e.target.value <= 100) {
        setEstimatedReturns(Math.round(e.target.value?.replace(/[^0-9.]/g, '')))
      }
    }
    if (e?.target?.name === 'investmentPeriod') {
      setInvestmentPeriod(e.target.value?.replace(/\D/g, ''))
    }
  }

  return (
    <>
      <div className='bg-white p-[50px] max-sm:p-[20px] rounded-lg'>
        <SIPCalculatorTab setActiveTab={setActiveTab} activeTab={activeTab} />

        {activeTab === 0 &&
          <div className='grid grid-cols-12 bg-white  py-[50px] max-sm:p-[20px] rounded-lg h-[580px] max-xl:h-auto'>
            <div className='col-span-7 max-xl:col-span-12'>
              <div className='loan-calculator-bg'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-[15px] font-semibold'>Monthly investment </h3>
                  </div>
                  <div className='bg-[#F4F8FB] w-[200px] flex justify-center gap-[26px] px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                    <Input
                      className='m-0 w-full bg-[#F4F8FB] text-right outline-none symbole-rupee'
                      name='Principle'
                      onChange={(e) => {
                        handleChange(e)
                      }}

                      value={`₹ ${Principle.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })} `}
                    />
                  </div>
                </div>
                <div className='mt-[20px]'>
                  <InputRange
                    maxValue={100000}
                    minValue={500}
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
                    <h3 className='text-[15px] font-semibold'>Expected  return rate (p.a)</h3>
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
                    maxValue={30}
                    minValue={1}
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
                    <h3 className='text-[15px] font-semibold'>Time  period (Year) </h3>
                  </div>
                  <div className='bg-[#F4F8FB] w-[150px] gap-1 flex justify-end px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>

                    <Input
                      className='m-0 bg-[#F4F8FB] w-[45px] text-right outline-none'
                      name='tenture'
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      value={`${LoanTenture}`}
                    />
                    Years
                  </div>
                </div>
                <div className='mt-[20px]'>
                  <InputRange
                    maxValue={40}
                    minValue={1}
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
                  <p className='text-[15px] font-normal'>Investment amount</p>
                  <p className='text-[15px] font-semibold mt-0 symbole-rupee'>₹ {invetmentAmmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, })}
                  </p>
                </div>
                <div className='flex justify-between my-2'>
                  <p className='text-[15px] font-normal'>Est. returns</p>
                  <p className='text-[15px] font-semibold mt-0 symbole-rupee'>
                    ₹ {totalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, })}
                  </p>
                </div>
                <div className='flex justify-between my-2'>
                  <p className='text-[15px] font-normal'>Total value </p>
                  <p className='text-[15px] font-semibold mt-0 symbole-rupee'>
                    ₹ {totalPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, })}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-5 max-xl:col-span-12 max-lg:mt-5 justify-center flex'>
              <ReactApexChart options={options} series={options.series} type={'donut'} height={250} />
            </div>
          </div>

        }
        {activeTab === 1 &&
          <div className='grid grid-cols-12 bg-white  py-[50px] max-sm:p-[20px] rounded-lg h-[580px] max-xl:h-auto'>
            <div className='col-span-7 max-xl:col-span-12'>
              <div className='loan-calculator-bg'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-[15px] font-semibold'>Total investment </h3>
                  </div>
                  <div className='bg-[#F4F8FB] w-[200px] flex justify-center gap-[26px] px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                    <Input
                      className='m-0 w-full bg-[#F4F8FB] text-right outline-none symbole-rupee'
                      name='investmentAmount'
                      onChange={(e) => {
                        handleChangeLumpsum(e)
                      }}
                      value={`₹ ${investmentAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })} `}
                    />
                  </div>
                </div>
                <div className='mt-[20px]'>
                  <InputRange
                    maxValue={1000000}
                    minValue={500}
                    name='investmentAmount'
                    value={investmentAmount}
                    onChange={(value) => {
                      handleChangeLumpsum()
                      setInvestmentAmount(value)
                    }}
                  />
                </div>
              </div>
              <div className='loan-calculator-bg mt-[28px]'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-[15px] font-semibold'>Expected  return rate (p.a)</h3>
                  </div>
                  <div className='bg-[#F4F8FB] w-[150px] flex justify-center  px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>
                    <Input
                      className='m-0 w-full bg-[#F4F8FB] text-right outline-none'
                      name='estimatedReturns'
                      onChange={(e) => {
                        handleChangeLumpsum(e)
                      }}
                      value={`${estimatedReturns}`}
                    />
                    %
                  </div>
                </div>
                <div className='mt-[20px]'>
                  <InputRange
                    maxValue={30}
                    minValue={1}
                    name='estimatedReturns'
                    value={estimatedReturns}
                    onChange={(value) => {
                      setEstimatedReturns(value)
                    }}
                  />
                </div>
              </div>
              <div className='loan-calculator-bg mt-[28px]'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-[15px] font-semibold'>Time  period (Year) </h3>
                  </div>
                  <div className='bg-[#F4F8FB] w-[150px] gap-1 flex justify-end px-3 text-[#212529] items-center h-[40px] rounded font-semibold'>

                    <Input
                      className='m-0 bg-[#F4F8FB] w-[45px] text-right outline-none'
                      name='investmentPeriod'
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      value={`${investmentPeriod}`}
                    />
                    Years
                  </div>
                </div>
                <div className='mt-[20px]'>
                  <InputRange
                    maxValue={40}
                    minValue={1}
                    name='investmentPeriod'
                    value={investmentPeriod}
                    onChange={(value) => {
                    setInvestmentPeriod(value)
                  }}
                  />
                </div>
              </div>
              <div className='pt-[65px]'>
                <div className='flex justify-between my-2'>
                  <p className='text-[15px] font-normal'>Investment amount</p>
                  <p className='text-[15px] font-semibold mt-0 symbole-rupee'>₹ 
                  {investmentAmount.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
                  </p>
                </div>
                <div className='flex justify-between my-2'>
                  <p className='text-[15px] font-normal'>Est. returns</p>
                  <p className='text-[15px] font-semibold mt-0 symbole-rupee'>
                    ₹ {totalInterestLumpsum.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                  </p>
                </div>
                <div className='flex justify-between my-2'>
                  <p className='text-[15px] font-normal'>Total value </p>
                  <p className='text-[15px] font-semibold mt-0 symbole-rupee'>
                    ₹ {totalValue.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-5 max-xl:col-span-12 max-lg:mt-5'>
              <ReactApexChart options={options} series={[parseInt(investmentAmount), parseInt(totalInterestLumpsum)]} type={'donut'} height={250} />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default ShipSliderChart
