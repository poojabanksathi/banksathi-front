import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import logoSticky from '../../../../public/assets/logo-sticky.svg'
import experianImage from '../../../../public/assets/experian-logo.svg'
import downLoadIcon from '../../../../public/assets/download-icon.svg'
import Chart from '../Chart/Chart'
import dynamic from 'next/dynamic'
import { listContents } from './staticData'
import borderDot from '../../../../public/assets/border-dot.svg'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useReactToPrint } from 'react-to-print'
import ExplorePDfBanner from '../CommonList/ExplorePDfBanner'

const CreditAccountsInfo = dynamic(
  () => import('@/core/component/common/CreditReportPDF/CreditAccountsInfo/CreditAccountsInfo'),
  {
    ssr: false
  }
)
const CreditAccountsDetails = dynamic(
  () => import('@/core/component/common/CreditReportPDF/CreditAccountsDetails/CreditAccountsDetails'),
  {
    ssr: false
  }
)
const CreditEnquiries = dynamic(
  () => import('@/core/component/common/CreditReportPDF/CreditEnquiries/CreditEnquiries'),
  {
    ssr: false
  }
)

const CreditReportPDF = () => {
  const size = useWindowSize()
  const isDeskTop = size?.width >= 768
  const leadId = typeof window !== 'undefined' && localStorage.getItem('leadprofileid')
  const token = typeof window !== 'undefined' && localStorage.getItem('token')
  const userData = typeof window !== 'undefined' && localStorage.getItem('userData')

  const targetRef = useRef()

  const [creditScore, setCreditScore] = useState(null)
  const [totalAccountData, setTotalAccountData] = useState()
  const [userInfo, setUserInfo] = useState({})
  const [enquiryData, setEnquiryData] = useState()
  const [paymentHistory, setPaymentHistory] = useState()
  const [callDownload, setCallDownload] = useState(false)

  const headersAuth = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  }

  const getCreditScoreComp = () => {
    return (
      <div className='grid grid-cols-2 justify-between gap-5 pb-6 px-[60px] max-[479px]:px-4 max-[771px]:px-[30px] items-center border-b max-[576px]:grid-cols-1 max-[479px]:flex-col cards-details-filter'>
        <div className='text-center'>
          <Chart ScoreCurrent={creditScore?.current_score} />
        </div>
        <div className='flex flex-col mt-4 items-start w-auto h-auto border border-zinc-300 pt-[14px]  pl-[12px] pr-[12px]'>
          <div className="text-neutral-800 text-[15px] font-semibold font-['Poppins'] leading-none">Score Factors</div>
          <div className='mt-[13px] flex flex-col gap-[14px] mb-[13px]'>
            <div className='flex flex-row gap-[2px] j'>
              <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-4">
                Payment History :
              </div>
              <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-4">
                How you repay your EMIs & credit card bills
              </div>
            </div>
            <div className='flex flex-row gap-[2px]'>
              <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-4">
                Credit Enquiries :
              </div>
              <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-4">
                New loan and credit card applications
              </div>
            </div>
            <div className='flex flex-row gap-[2px]'>
              <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-4">
                Credit Utilization :{' '}
              </div>
              <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-4">
                Percentage of your Credit Limit you use
              </div>
            </div>
            <div className='flex flex-row gap-[2px]'>
              <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-4">
                Credit History :{' '}
              </div>
              <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-4">
                Age of your oldest credit account
              </div>
            </div>
            <div className='flex flex-row gap-[2px]'>
              <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-4">
                Total Accounts :{' '}
              </div>
              <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-4">
                Total number of active Credit Cards and Loans
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getTitleComp = (title) => {
    return (
      <div className='mt-[24px]  py-3 sm:px-3 bg-violet-100 flex justify-start items-center gap-2.5 w-full'>
        <div className="py-[10px]   text-neutral-800 max-md:text-[15px] md:text-[18px] font-medium font-['Poppins'] leading-none">
          {title}
        </div>
      </div>
    )
  }

  const getSubTitleComp = (subTitle) => {
    return <div className="text-orange-600 text-[14px] font-normal font-['Poppins'] leading-5 p-4">{subTitle}</div>
  }

  const getAddressTable = () => {
    return (
      <table className='border-collapse border border-slate-400 ...'>
        <thead>
          <tr>
            <th className="py-[12px]  text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
              Address
            </th>
            <th className=" py-[12px]  text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-slate-300 p-[10px]'>{userInfo?.address || '-'}</td>
            <td className='border border-slate-300 p-[10px]'>Residence Address</td>
          </tr>
        </tbody>
      </table>
    )
  }
  const getMobileDetails = () => {
    return (
      <table className='border-collapse border border-slate-400 ...'>
        <thead>
          <tr>
            <th className=" py-[12px]  text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
              Type
            </th>
            <th className="py-[12px]  text-left pl-[10px] text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
              Number
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-slate-300 p-[10px]'>Mobile Phone</td>
            <td className='border border-slate-300 p-[10px]'>{userInfo?.mobile}</td>
          </tr>
        </tbody>
      </table>
    )
  }
  // credit
  const getCreditScoreData = () => {
    axios
      .post(
        BASE_URL + USERSET?.creditscorehistory,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setCreditScore(response?.data)
        }
      })
      .catch((error) => {
        console.log('Error', error)
      })
  }
  // total accounts data
  const getTotalAccountData = () => {
    axios
      .post(
        BASE_URL + USERSET?.totalaccount,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setTotalAccountData(response?.data?.total_accounts_details)
        }
      })
      .catch((error) => {
        console.log('Error', error)
      })
  }
  const getTotalBalanceAmt = () => {
    if (totalAccountData && totalAccountData?.total_accounts_data) {
      const total = totalAccountData?.total_accounts_data
      const arrayOfRemaining = total?.map((element) => {
        return element?.amount_remaining
      })
      const ammountBalance = arrayOfRemaining.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      return ammountBalance || '-'
    } else return '-'
  }

  //credit enquiries
  const getCreditEnquiries = () => {
    axios
      .post(
        BASE_URL + USERSET?.enquirycibil,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setEnquiryData(response?.data)
        }
      })
      .catch((error) => {
        console.log('error while fetching enquiry data', error)
      })
  }
  //payment history
  const getPaymentHistory = () => {
    axios
      .post(
        BASE_URL + USERSET?.paymenthistory,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message == 'success') {
          setPaymentHistory(response?.data?.payment_history_details)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
          toast.error(error?.response?.data?.message)
        }
      })
  }

  const getTotalEnquiryCount = () => {
    let total = 0
    if (enquiryData?.data?.no_of_enquiry) {
      if (enquiryData?.data?.no_of_enquiry?.loan_enquiry) {
        total = enquiryData?.data?.no_of_enquiry?.loan_enquiry
      }
      if (enquiryData?.data?.no_of_enquiry?.credit_card_enquiry) {
        total = total + enquiryData?.data?.no_of_enquiry?.credit_card_enquiry
      }
    }
    return total
  }

  // MAIN WRAPPER
  const getMainContainer = () => {
    return (
      <div ref={pdfWrapper} className='container h-auto py-[30px] pt-[10px] bgImagePDF'>
        <div className='flex items-center justify-between px-2 max-sm:flex-col'>
          <div className='mt-[20px] lg:mt-[50px]'>
            <Link href='/' prefetch={false}>
              <Image src={logoSticky} alt='img_text' className='pb-[22px]' width={185} height={30} />
            </Link>
          </div>
          {creditScore?.credit_history?.[0]?.time && (
            <div className='flex flex-col items-end'>
              <div className='text-right'>
                <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[14px]">
                  Report Date :
                </span>
                <span className="text-black text-[10px] font-normal font-['Poppins'] leading-[14px]">
                  {creditScore?.credit_history?.[0]?.time}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className='border-b-2 border-[#D8D8D8] mt-[13px]' />
        {/* NAME */}
        <div className='flex items-center justify-between gap-2 px-2 max-sm:flex-col mt-[19px]'>
          <div className="text-right text-neutral-800 text-base font-medium font-['Poppins'] leading-snug">
            {userInfo?.full_name}’s Credit Report
          </div>
          <div className='flex flex-row items-center justify-center gap-[7px]'>
            <div className='text-right text-neutral-800 text-[10px] font-normal leading-[14px]'>Powered by </div>
            <Image src={experianImage} width={71} height={29} alt='credit' />
          </div>
        </div>
        {getTitleComp('CREDIT SCORE')}
        {getSubTitleComp('Your Credit Report is summarized in the form of Credit Score which ranges from 300 - 900')}
        {getCreditScoreComp()}
        <div className='mt-[32px]'>{getTitleComp('Report Summary')}</div>
        {/* REPORT SUMMARY */}
        <div className='flex justify-evenly md:flex-wrap max-md:flex-col px-4'>
          <div className='flex flex-col mt-[30px]'>
            <div className='flex gap-[130px]'>
              <div>
                <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-[11.20px] mb-[19px]">
                  Credit Account Summary
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    Total Accounts
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    {totalAccountData?.total_accounts_data?.length || '-'}
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    Active Accounts
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    {totalAccountData?.total_active_accounts || '-'}
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    Closed Accounts
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    {totalAccountData?.total_inactive_accounts || '-'}
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    SF/WD/WO/Settled
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    -
                  </div>
                </div>
              </div>
              {size?.width > 1024 && <div className='border-r-2 border-zinc-300' />}
            </div>
          </div>
          <div className='flex flex-col mt-[30px]'>
            <div className='flex gap-[130px]'>
              <div>
                <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-[11.20px] mb-[19px]">
                  Credit Balance Amount Summary
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    Total current Bal. Amt.
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    {getTotalBalanceAmt()}
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    SF/WD/WO/Settled amt
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    -
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    Secured Accounts amt
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    -
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    Unsecured Accounts amt
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    -
                  </div>
                </div>
              </div>
              {size?.width > 1024 && <div className='border-r-2 border-zinc-300' />}
            </div>
          </div>
          <div className='flex flex-col mt-[30px]'>
            <div className='flex gap-[130px]'>
              <div>
                <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-[11.20px] mb-[19px]">
                  Credit Enquiry Summary
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    {getTotalEnquiryCount() > 1 ? 'Total Enquiries' : 'Total Enquiry'}
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    {getTotalEnquiryCount()}
                  </div>
                </div>
                {/* <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    Active Accounts
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    -
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    Closed Accounts
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    -
                  </div>
                </div>
                <div className='flex flex-row justify-between mb-[19px]'>
                  <div className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px] ">
                    SF/WD/WO/Settled
                  </div>
                  <div className="text-right text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-[11.20px]">
                    -
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* navigate to credit cards bottom banner */}
        <div className='lg:mt-[100px] mt-[50px] container mx-auto max-[991px]:max-w-full max-[1440px]:px-12 max-[1200px]:px-0 max-[576px]:pt-[50px]'>
          {/* {getBottomBanner()} */}
          <ExplorePDfBanner url={`/credit-cards`} />
        </div>
        <div className='mt-[32px]'>{getTitleComp('Contact Information')}</div>
        {getSubTitleComp(
          'This section shows address and phone numbers reported to Credit Bureau by Financial Institutions.'
        )}
        <>
          <div className='flex max-sm:flex-col max-sm:gap-6'>
            {/* ADDRESS DETAILS */}
            {userInfo?.address && (
              <>
                <div className='mt-4'>
                  <div className="text-neutral-800 px-6 text-xs font-semibold font-['Poppins'] leading-none ">
                    Address Details
                  </div>
                  <div className='mt-[14px] px-6'>{getAddressTable()}</div>
                </div>
              </>
            )}
            <div className='mt-4'>
              <div className="text-neutral-800 px-6 text-xs font-semibold font-['Poppins'] leading-none ">
                Phone Number
              </div>
              <div className='mt-[14px] px-6'>{getMobileDetails()}</div>
            </div>
          </div>
        </>
        {getTitleComp('SUMMARY : Credit Account Information')}
        {getSubTitleComp(
          'This section displays summary of all your reported credit accounts found in the Credit Bureau database'
        )}
        <div className='mt-[16px]'>
          <CreditAccountsInfo totalAccountData={totalAccountData} />
        </div>
        <div className='mt-[100px]'>{getTitleComp('Credit Account Information Details')}</div>
        {getSubTitleComp(
          'This section has information provided to our Bureau Partner by banks , credit/nancial institutions and other credit grantors with whom you have a credit/loan account'
        )}
        <div className='mt-[16px]'>
          <CreditAccountsDetails
            paymentHistory={paymentHistory}
            totalAccountData={totalAccountData}
            userInfo={userInfo}
          />
        </div>
        {getTitleComp('Credit Enquiries')}
        {getSubTitleComp(
          'This section shows the names of the credit institutions that have processed a credit/loan application for you.'
        )}
        <div className='mt-[24px]'>
          <CreditEnquiries enquiryData={enquiryData} />
        </div>
        <div className='mt-[100px]'>{getTitleComp('Support')}</div>
        <div className='mt-[17px] px-2'>
          <div className=''>
            <span className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-5">
              If you nd any discrepancy in your report , please raise a dispute with our partners at{' '}
            </span>
            <span className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-5 cursor-pointer">
              <Link href='https://www.experian.com/disputes/main.html' target='_blank'>
                https://www.experian.com/disputes/main.html
              </Link>
            </span>
            <span className="text-neutral-800 text-[14px] font-normal font-['Poppins'] leading-5">
              . For any other queries , feel free to contact us at{' '}
            </span>
            <span className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-5">
              customer@banksathi.com
            </span>
          </div>
        </div>
        {getTitleComp('Legend')}
        <div className='mt-[17px] px-2'>
          <ul className='list-disc list-inside'>
            {listContents?.map((item) => {
              return (
                <li key='' className='text-[14px] font-[Poppins] leading-5 mb-[12px]'>
                  {item?.li}
                </li>
              )
            })}
          </ul>
        </div>
        <div className='mt-[38px]'>
          <div className='flex items-center justify-center gap-[10px]'>
            <Image src={borderDot} alt='border' height={7} width={47} className='' />
            <div className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] leading-3">END OF REPORT</div>
            <Image src={borderDot} alt='border' height={7} width={47} className='rotate-180' />
          </div>
        </div>
        {/* <div className='mt-[30px] flex items-end justify-end'>
          <Image src={experianImage} width={100} height={43} alt='credit' />
        </div> */}
      </div>
    )
  }

  useEffect(() => {
    if (userData) {
      setUserInfo(JSON?.parse(userData) || {})
    } else {
      // callUserProfile()
    }
    getCreditScoreData()
    getCreditEnquiries()
    getTotalAccountData()
    getPaymentHistory()
    if (userInfo && creditScore && totalAccountData && paymentHistory) {
      setCallDownload(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pdfWrapper = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: 'credit-Report'
  })

  return (
    <>
      <div className='flex items-center gap-2 cursor-pointer pt-[40px] justify-center' onClick={handlePrint}>
        <Image src={downLoadIcon} className='' alt='download' />
        <div className='text-[22px] max-[479px]:text-[15px] text-[#212529] font-medium leading-[21px] font-[Poppins] max-[320px]:text-[11px]'>
          <button>Print Report</button>
        </div>
      </div>
      <div className='max-w-full flex items-center justify-center'>
        <div ref={targetRef}>{getMainContainer()}</div>
      </div>
    </>
  )
}
export default CreditReportPDF
