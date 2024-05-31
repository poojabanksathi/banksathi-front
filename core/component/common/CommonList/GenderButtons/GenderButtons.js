import React from 'react'

const GenderButtons = ({ userInfo, handleChange }) => {
  return (
    <div className='mb-4'>
      <p className='   text-[#212529]  max-[1200px]:!pt-0'>Gender</p>
      <div className='flex pt-[10px] gap-4 '>
        <div>
          <label
            htmlFor='gender'
            className={`form-redio flex gap-2 items-center ${
              userInfo?.gender === 'Male' ? 'text-[#212529] font-normal' : 'text-[#808080]'
            }`}>
            <input
              type='radio'
              name='gender'
              value={userInfo?.gender === 'Male' ? userInfo?.gender === 'Male' : 'Male'}
              checked={userInfo?.gender === 'Male'}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            Male
          </label>
        </div>
        <div>
          <label
            htmlFor='gender'
            className={`form-redio flex gap-2 items-center  ${
              userInfo?.gender === 'Female' ? 'text-[#212529] font-normal' : 'text-[#808080]'
            }`}>
            <input
              type='radio'
              name='gender'
              // disabled={userInfo?.gender ? true : false}
              value={userInfo?.gender === 'Female' ? userInfo?.gender === 'Female' : 'Female'}
              checked={userInfo?.gender === 'Female'}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            Female
          </label>
        </div>
        <div>
          <label
            htmlFor='gender'
            className={`form-redio flex gap-2 items-center ${
              userInfo?.gender === 'Other' ? 'text-[#212529] font-normal' : 'text-[#808080]'
            } `}>
            <input
              type='radio'
              name='gender'
              value={userInfo?.gender === 'Other' ? userInfo?.gender === 'Other' : 'Other'}
              checked={userInfo?.gender === 'Other'}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            Other
          </label>
        </div>
      </div>
    </div>
  )
}
export default GenderButtons
