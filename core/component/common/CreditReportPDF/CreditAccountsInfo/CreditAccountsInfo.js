import { useWindowSize } from '@/hooks/useWindowSize'
import React from 'react'

const CreditAccountsInfo = ({ totalAccountData }) => {
  const size = useWindowSize()
  const mobileTableAccountInfo = (data) => {
    return (
      <>
        {data?.map((item, index) => {
          return (
            <div key={index} className='flex flex-col '>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'> Serial No.</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {index + 1 || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                  Financial Institution
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.bank_name || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Account type</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.account_type || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'> Account No.</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.account_no || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                  Account Holder Type
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.account_holder_type || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>Date Reported</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.date_reported || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                  Account Status
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.status || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'> Date Opened</p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.opened_date || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                  Sanction Amt/Credit Limit
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.credit_limit}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                  Current Balance
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'>
                  {item?.amount_remaining || '-'}
                </p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center text-center border-collapse border border-slate-400 '>
                <p className='text-violet-600 text-[13px] font-semibold font-[Poppins] leading-[14px]'>
                  Amount Overdue
                </p>
                <p className='text-[13px] text-[#212529] font-normal font-[Poppins] leading-[14px]'> 0</p>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div>
      {totalAccountData && totalAccountData?.total_accounts_data?.length > 0 && size?.width >= 768 && (
        <table className='border-collapse border border-slate-400 ...'>
          <thead>
            <tr>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Serial No.
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Financial Institution
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Account type
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Account No.
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Account Holder Type
              </th>
              <th className=" py-[12px] w-[8vw] text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Date Reported
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Account Status
              </th>
              <th className=" py-[12px] w-[8vw] text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Date Opened
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Sanction Amt/Credit Limit
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Current Balance
              </th>
              <th className=" py-[12px]  text-left  text-violet-600 text-[13px] font-semibold font-['Poppins'] leading-[14px] border border-slate-300">
                Amount Overdue
              </th>
            </tr>
          </thead>
          <tbody>
            {totalAccountData?.total_accounts_data?.map((item, index) => {
              return (
                <tr key=''>
                  <td className='border border-slate-300 p-[10px]'>{index + 1 || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.bank_name || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.account_type || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.account_no || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.account_holder_type || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.date_reported || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.status || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.opened_date || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.credit_limit}</td>
                  <td className='border border-slate-300 p-[10px]'>{item?.amount_remaining || '-'}</td>
                  <td className='border border-slate-300 p-[10px]'>0</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      {size?.width < 768 && mobileTableAccountInfo(totalAccountData?.total_accounts_data)}
    </div>
  )
}

export default CreditAccountsInfo
