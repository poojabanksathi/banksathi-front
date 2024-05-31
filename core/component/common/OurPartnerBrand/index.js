import React from 'react'
import { partnerBrandAll } from '@/utils/alljsonfile/partnerBrand'
import Image from 'next/image'

function OurPartnerBrand() {
  return (
    <>
      {partnerBrandAll.map((brand, index) => {
        return (
          <>
            <div key={index}>
              <Image
                src={brand.brandlogo}
                width={130}
                height={95}
                className='mx-auto w-[130px] max-[480px]:!h-[65px] h-[95px] max-[393px]:!h-[50px] h-[95px]  max-[576px]:w-[115px] max-[280px]:h-[40px] '
                alt='img'
              />
            </div>
          </>
        )
      })}
    </>
  )
}

export default OurPartnerBrand
