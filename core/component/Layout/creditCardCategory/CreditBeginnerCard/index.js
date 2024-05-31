import React from 'react'

function CreditBeginnerCard({ longTermSub, hidePadding = false }) {
  return (
    <>
      {longTermSub?.product_list?.long_form_content && (
        <div className='container  max-[1024px]:px-8 mx-auto max-[991px]:max-w-full pb-[50px]  max-[576px]:px-6 max-[479px]:pt-[30px] max-[479px]:pb-0 max-[375px]:px-4 max-[320px]:px-4 credit-begincard'>
          <div
            className={
              hidePadding ? 'px-4' : 'px-20  max-[1440px]:px-12 max-[1200px]:px-0 max-[1024px]:px-8 max-[991px]:px-0  blog-Post-detail-table '
            }>
            <div className=' max-[771px]:text-justify'>
              <p
                className='text-[#212529] text-[15px] font-normal longform-list reward-formcon'
                dangerouslySetInnerHTML={{
                  __html: `<div>${longTermSub?.product_list?.long_form_content}</div>`
                }}></p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreditBeginnerCard
