import React from 'react'


function HowToApplyDetail({ productLongformcon, moreAboutRef}) {
  return (
    <>
      {productLongformcon?.long_form_content &&
        <div className='pt-[70px] pb-[50px] max-[1200px]:px-0 max-[576px]:py-[50px] details-heading blog-Post-detail-table' id='more-about-product'>
          <div>
            <div className=' pb-0 ' ref= {moreAboutRef}>
              <p
                className='text-[#212529] text-[15px] font-normal longform-list'
                dangerouslySetInnerHTML={{
                  __html: `<div>${productLongformcon?.long_form_content?.long_form_content}</div>`
                }}></p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default HowToApplyDetail
