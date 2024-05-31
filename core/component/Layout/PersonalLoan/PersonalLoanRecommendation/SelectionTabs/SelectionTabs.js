import React from 'react'

const SelectionTabs = ({
  userInfo,
  optionsToMap,
  handleTabClick,
  width,
  gridCols,
  selectedOption,
  isMoneyUsageScreen
}) => {
  return (
    <div className={`grid ${gridCols || 'grid-cols-3'} gap-[20px] mt-1`}>
      {optionsToMap?.map((item) => {
        const condition = isMoneyUsageScreen ? selectedOption?.includes(item?.name) : selectedOption === item?.name
        return (
          <div
            className={`${
              width || 'w-auto'
            } px-[30px] h-[46px] rounded-lg border flex justify-center items-center gap-2.5 cursor-pointer max-sm:text-[12px] text-center ${
              condition ? 'border border-violet-400 bg-[#E9DFF6]' : 'border border-neutral-300 bg-[#F4F8FB]'
            }`}
            key={item?.id}
            onClick={() => handleTabClick(item)}>
            {item?.name}
          </div>
        )
      })}
    </div>
  )
}

export default SelectionTabs
