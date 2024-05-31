import React from 'react'
import accountArrow from '../../../../../public/assets/accountArrow.svg'
import Image from 'next/image'
import PaymentHistoryMonths from '../../PaymentHistoryMonths'
import moment from 'moment'
import { useWindowSize } from '@/hooks/useWindowSize'
import Head from 'next/head'
import { formatDateInString } from '@/utils/util'

const CreditAccountsDetails = ({ totalAccountData, userInfo, paymentHistory }) => {
  const size = useWindowSize()

  // to format date
  const formatDate = (date) => {
    const formattedDate = formatDateInString(date?.toString())
    if (formattedDate) {
      return formattedDate
    } else return '-'
  }

  // DETAILS TABLE

  const mobileGetDetailsTable = (item) => {
    return (
      <div className='flex flex-col mx-4 p-2'>
        <div className='flex flex-col  border-collapse border border-slate-400'>
          <h2 className='text-violet-600 text-[14px] font-semibold font-[Poppins] leading-[14px] p-2 text-center'>
            Account Details
          </h2>
          <div className='flex flex-col gap-[16px] border  py-[12px]'>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Account Number</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                {item?.account_no || '-'}
              </p>
            </div>
            <div className='flex justify-between px-2  items-center text-center   '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Date Opened</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                {item?.opened_date || '-'}
              </p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Date Closed</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'> -</p>
            </div>
            <div className='flex justify-between px-2  items-center text-center '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                Account Holder Type
              </p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'> {item?.account_holder_type}</p>
            </div>
            <div className='flex justify-between px-2  items-center text-center '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Account Status</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>{item?.status}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col  border-collapse border border-slate-400'>
          <div className='flex flex-col gap-[16px] border  py-[12px]'>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Date Reported</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                {item?.date_reported || '-'}
              </p>
            </div>
            <div className='flex justify-between px-2  items-center text-center   '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Type</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                {item?.account_type || '-'}
              </p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Highest Credit</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>{item?.limit_used}</p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Current Balance</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                {item?.amount_remaining}
              </p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Amount Past Due</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                {item?.amount_remaining}
              </p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                Last Payment Date
              </p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                {formatDate(item?.last_payment_date)}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col  border-collapse border border-slate-400'>
          <div className='flex flex-col gap-[16px] border  py-[12px]'>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Credit Limit Amt</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'> -</p>
            </div>
            <div className='flex justify-between px-2  items-center text-center   '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'> EMI</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'> -</p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                Total Write-off Amt
              </p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                Principal Write-off Amt
              </p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'> -</p>
            </div>
            <div className='flex justify-between px-2  items-center text-center  '>
              <p className='text-black-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Settlement Amt</p>
              <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getDetailsTable = (item) => {
    return (
      <>
        {size?.width >= 768 ? (
          <table className='border-collapse border border-slate-400 mx-auto w-[100%]'>
            <thead>
              <tr>
                <th
                  className="p-[12px] text-center text-violet-600 text-[12px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300"
                  colSpan='3'>
                  Account Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-slate-300 py-[12px] sm:px-3 text-center'>
                  <div className='flex flex-col gap-[16px] '>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px] text-center">
                        Account Number
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.account_no || '-'}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Date Opened
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.opened_date || '-'}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Date Closed
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Account Holder Type
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.account_holder_type}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Account Status
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.status}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='border border-slate-300 py-[12px] sm:px-3 text-center'>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Date Reported
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.date_reported || '-'}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Type
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.account_type || '-'}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Highest Credit
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.limit_used}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Current Balance
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.amount_remaining}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Amount Past Due
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.amount_remaining}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Last Payment Date
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {formatDate(item?.last_payment_date)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='border border-slate-300 py-[12px] sm:px-3 text-center'>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Credit Limit Amt
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.credit_limit}
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        EMI
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Total Write-off Amt
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center'>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Principal Write-off Amt
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                    <div className='flex justify-between max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center '>
                      <span className="text-neutral-800 text-[10px] font-semibold font-['Poppins'] leading-[12px]">
                        Settlement Amt
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          mobileGetDetailsTable(item)
        )}
      </>
    )
  }

  // LOAN TABLE
  const mobileGetLoanTable = (item) => {
    return (
      <>
        <div className='flex flex-col mx-4 p-2'>
          <div className='flex flex-col  border-collapse border border-slate-400'>
            <div className='flex'>
              <h2 className='text-violet-600 text-[12px] font-semibold font-[Poppins] leading-[14px] p-2 '>
                Date of Birth
              </h2>
            </div>
            <div className='flex flex-col gap-[16px] border  py-[12px]'>
              <div className='flex  justify-between px-2  items-center text-center  '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Date of Birth</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {' '}
                  {userInfo?.dob || '-'}
                </p>
              </div>
              <div className='flex  justify-between px-2  items-center text-center  '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Gender</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {' '}
                  {userInfo?.gender || '-'}
                </p>
              </div>
              <div className='flex  justify-between px-2  items-center text-center   '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Occupation</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {userInfo?.occupation || '-'}
                </p>
              </div>
              <div className='flex  justify-between px-2  items-center text-center  '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Email Address</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {' '}
                  {userInfo?.email || '-'}
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col  border-collapse border border-slate-400'>
            <div className='flex items-center justify-between'>
              <h2 className='text-violet-600 text-[12px] font-semibold font-[Poppins] leading-[14px] p-2 '>
                Phone Type
              </h2>
              <h2 className='text-violet-600 text-[12px] font-semibold font-[Poppins] leading-[14px] p-2 '>
                Phone No.
              </h2>
              <h2 className='text-violet-600 text-[12px] font-semibold font-[Poppins] leading-[14px] p-2 '>
                Extension
              </h2>
            </div>
            <div className='flex flex-col gap-[16px] border  py-[12px]'>
              <div className='flex  justify-between px-2  items-center text-center  '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'> Mobile</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {' '}
                  {userInfo?.mobile || '-'}
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'> -</p>
              </div>
              <div className='flex justify-between px-2  items-center text-center   '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Office Phone</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col  border-collapse border border-slate-400'>
            <div className='flex items-center justify-between'>
              <h2 className='text-violet-600 text-[12px] font-semibold font-[Poppins] leading-[14px] p-2 '>ID Type</h2>
              <h2 className='text-violet-600 text-[12px] font-semibold font-[Poppins] leading-[14px] p-2 '>
                ID Number
              </h2>
            </div>
            <div className='flex flex-col gap-[16px] border  py-[12px]'>
              <div className='flex  justify-between px-2  items-center text-center  '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'> PAN</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {' '}
                  {item?.pan_no || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2  items-center text-center   '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Passport</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
              </div>
              <div className='flex justify-between px-2  items-center text-center   '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Voter ID</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
              </div>
              <div className='flex justify-between px-2  items-center text-center   '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Aadhaar/UID</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
              </div>
              <div className='flex justify-between px-2  items-center text-center   '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                  Driving License
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
              </div>
              <div className='flex justify-between px-2  items-center text-center   '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Ration Card</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>-</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const getLoanTable = (userInfo, item) => {
    return (
      <>
        {size?.width >= 768 ? (
          <table className='border-collapse border border-slate-400 ...'>
            <thead>
              <tr>
                <th className="text-left py-[12px] w-[22vw] px-[10px] text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                  Date of Birth
                </th>
                <th className=" py-[12px] w-[25vw] px-[10px] text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                  <div className='flex justify-between'>
                    <div className="text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[11.20px]">
                      Phone Type
                    </div>
                    <div className="text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[11.20px]">
                      Phone No.
                    </div>
                    <div className="text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[11.20px]">
                      Extension
                    </div>
                  </div>
                </th>
                <th className=" py-[12px] w-[30vw] px-[10px] text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                  <div className='flex justify-between'>
                    <div className="text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[11.20px]">
                      ID Type
                    </div>
                    <div className="text-violet-600 text-[11px] font-semibold font-['Poppins'] leading-[11.20px]">
                      ID Number
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-slate-300 p-[18px]'>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='flex  justify-between items-center text-center  '>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Date of Birth
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.dob || userInfo?.dob || '-'}
                      </span>
                    </div>

                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Gender
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {userInfo?.gender || '-'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Occupation
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {userInfo?.occupation || '-'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Email Address
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {userInfo?.email || '-'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className='border border-slate-300 p-[18px]'>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Mobile
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {userInfo?.mobile || '-'}
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Office Phone
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                      <span className="text-right text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                  </div>
                </td>
                <td className='border border-slate-300 p-[18px]'>
                  <div className='flex flex-col gap-[16px]'>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        PAN
                      </span>
                      <span className=" text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {item?.pan_no || '-'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Passport
                      </span>
                      <span className=" text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        -
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Voter ID
                      </span>
                      <span className=" text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {' '}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Aadhaar/UID
                      </span>
                      <span className=" text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {' '}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Driving License
                      </span>
                      <span className=" text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {' '}
                      </span>
                    </div>
                    <div className='flex justify-between mb-[32px]'>
                      <span className="text-violet-600 text-[10px] font-medium font-['Poppins'] leading-[12px]">
                        Ration Card
                      </span>
                      <span className=" text-neutral-800 text-[10px] font-normal font-['Poppins'] leading-[12px]">
                        {' '}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          mobileGetLoanTable()
        )}
      </>
    )
  }

  const getFilteredHistory = (item) => {
    if (item) {
      const filter = paymentHistory?.total_accounts_data?.find((element) => element?.account_no === item?.account_no)
      return filter
    }
  }

  return (
    totalAccountData &&
    totalAccountData?.total_accounts_data?.length > 0 &&
    totalAccountData?.total_accounts_data?.map((item, index) => {
      const filteredData = getFilteredHistory(item)
      return (
        <>
          {' '}
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          </Head>
          <div className='mt-[39px] ' key={index}>
            <div className='flex justify-between px-2'>
              <div className="text-violet-600 text-xs font-semibold font-['Poppins'] leading-none">
                {item?.account_type}
              </div>
              <div className="text-violet-600 text-xs font-semibold font-['Poppins'] leading-none">
                {item?.bank_name}
              </div>
              <div className='flex gap-[5px] items-center'>
                <Image src={accountArrow} alt='account arrow' height={16} width={16} />
                <div className="text-violet-600 text-[10px] font-semibold font-['Poppins'] leading-[14px]">
                  Acct {index + 1}
                </div>
              </div>
            </div>
            <div className='border border-zinc-300 mt-[14px] w-[100%]' />
            <div className='mt-[21px]'>{getDetailsTable(item)}</div>
            <div className='mt-[30px]'>
              <div className="text-neutral-800 text-xs font-semibold font-['Poppins'] px-2 leading-none">
                Payment History
              </div>
              <div key=''>{filteredData && <PaymentHistoryMonths datapayment={filteredData} />}</div>
            </div>
            <div className='mt-[26px]'>
              <div className="text-neutral-800 text-xs font-semibold font-['Poppins'] leading-none">
                {`Consumer Personal details of ${item?.bank_name} ${item?.account_type?.toLowerCase()}`}
              </div>
              <div className='mt-[14px]'>{getLoanTable(userInfo, item)}</div>
            </div>
          </div>
        </>
      )
    })
  )
}

export default CreditAccountsDetails
