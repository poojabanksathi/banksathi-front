import React, { memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import troubleicon from '../../../../../public/assets/trouble-icon-new.svg';

const TroubleComp = memo(() => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/contact-us');
  };

  const isHomePage = router.pathname === '/';

  return (
    <div className="px-[1px]" style={{ minHeight: 'auto' }}>
      <div className="flex flex-row items-center justify-center gap-x-[30px] max-[768px]:flex-col max-sm:gap-[20px]">
        <div className="flex flex-row items-center justify-center gap-[30px] max-sm:gap-[20px]">
          <div style={{ width: '65px', height: 'auto', flexShrink: 0 }}>
            <Image 
              src={troubleicon} 
              alt="Trouble Icon" 
              priority
              layout="fixed" 
              width={65} 
              height={75} 
            />
          </div>
          <div className="text-neutral-800 text-2xl max-sm:text-lg max-[768px]:leading-[25.20px] font-medium font-['Poppins'] leading-[33.60px]" style={{ minHeight: '35px' }}>
            Having trouble choosing the right product?
          </div>
        </div>
        <div
          onClick={handleClick}
          className={`flex items-center justify-center px-5 py-2 bg-[#49D49D] rounded-lg max-[771px]:px-3`}
          style={{ minWidth: '150px', maxWidth: '220px', minHeight: '50px' }}
        >
          <button 
            className="text-[15px] font-semibold font-['Faktum'] text-[#212529] max-[375px]:text-[14px]"
            style={{ width: '100%', minHeight: '35px' }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
});

export default TroubleComp;
