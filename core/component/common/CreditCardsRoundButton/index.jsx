import React, { useId } from 'react'
export default function CreditCardsRoundButton({ name, onClick, className }) {
  const id = useId()
  return (
    <>
      {name && (
        <button
          id={'round-btn-id'}
          className={
            !className
              ? 'border border-[#D6D6D6] cursor-pointer bg-white xl:py-4 xl:px-8 md:py-2 md:px-4 sm:py-2 sm:px-4 px-4 py-3 text-sm rounded-full hover:bg-[#49D49D] hover:border-[#49D49D] hover:text-[#212529] '
              : className
          }
          onClick={onClick}>
          {name}
        </button>
      )}
    </>
  )
}
