import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CommonDatePicker = ({ selectDateHandler, handleChange, onChange, startDate, value, name, id, className }) => {
  const today = new Date()
  
  return (
    <DatePicker
      showYearDropdown
      dropdownMode='select'
      dateFormat='dd-mm-yyyy'
      name={name ? name : 'dob'}
      id={id ? id : 'dob'}
      className={
        className
          ? className
          : 'shadow border rounded-lg w-full py-4 px-4 text-[#212529] leading-tight focus:outline-none focus:shadow-outline mt-1 border-[#C2CACF]'
      }
      onChange={
        onChange
          ? onChange
          : (e) => {
              selectDateHandler(e)
              handleChange(e)
            }
      }
      selected={startDate}
      maxDate={today}
      value={value}
      required
      todayButton={'Today'}
      autoComplete='off'
    />
  )
}

export default CommonDatePicker
