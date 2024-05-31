import React from 'react'

function CalculatorBeginnerCard({ longTerm, paddingHide }) {
  return (
    <>
      {longTerm?.long_form_content && (
        <div
          className={` ${
            paddingHide ? '' : 'max-[1024px]:px-8  '
          }   'container  mx-auto max-[991px]:max-w-full pb-[50px] pt-[30px] max-[576px]:px-6 max-[479px]:px-4 max-[479px]:py-[30px] max-[375px]:px-4 max-[320px]:px-4 credit-begincard'`}>
          <div
            className={`${
              paddingHide ? '' : 'px-20  max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[991px]:px-0'
            } `}>
            <div className=' max-[771px]:text-justify'>
              <p
                className='text-[#212529] text-[15px] font-normal  longform-list blog-Post-detail-table'
                dangerouslySetInnerHTML={{
                  __html: `<div>${longTerm?.long_form_content}</div>`
                }}></p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CalculatorBeginnerCard
