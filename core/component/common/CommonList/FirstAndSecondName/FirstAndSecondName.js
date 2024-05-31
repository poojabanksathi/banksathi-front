import { removeNonAlphaNumeric } from '@/utils/util'
import React from 'react'

const FirstAndSecondName = ({ userInfo, setUserInfo, first, lastOrMiddle }) => {
  return (
    <div>
      <div className='grid grid-cols-2 gap-[20px] max-[1200px]:!grid-cols-2 max-sm:!grid-cols-1'>
        <div className=''>
          <label className='text-[13px] font-normal text-[#212529]' htmlFor='email'>
            First Name
          </label>
          <input
            className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
            id='full_name'
            name='full_name'
            type='text'
            pattern='[A-Za-z]+'
            onChange={(e) => {
              setUserInfo({ ...userInfo, firstName: e?.target?.value })
            }}
            defaultValue={userInfo?.firstName || first}
            onInput={(e) => {
              e.target.value = removeNonAlphaNumeric(e)
            }}
            placeholder='First Name'
          />
        </div>
        <div className=''>
          <label className='text-[13px] font-normal text-[#212529]' htmlFor='email'>
            Last Name
          </label>
          <input
            className='shadow border rounded-lg w-full py-4 px-4 text-[#000] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
            id='lastName'
            name='lastName'
            type='text'
            pattern='[A-Za-z]+'
            onChange={(e) => {
              setUserInfo({ ...userInfo, lastName: e?.target?.value })
            }}
            defaultValue={userInfo?.lastName || lastOrMiddle}
            onInput={(e) => {
              e.target.value = removeNonAlphaNumeric(e)
            }}
            placeholder='Last Name'
          />
        </div>
      </div>
    </div>
  )
}

export default FirstAndSecondName
