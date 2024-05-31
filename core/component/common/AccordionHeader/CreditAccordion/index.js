import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import accordionArrowall from '../../../../../public/assets/accordion-down.svg';
import { topmenusData } from "@/utils/alljsonfile/topmenusubtitle";


export default function CreditAccordion() {
  const [activeAccordions, setActiveAccordions] = useState([0]);

  const handleAccordion = (index) => {
    if (activeAccordions?.includes(index)) {
      setActiveAccordions(activeAccordions.filter((item) => item !== index));
    } else {
      setActiveAccordions([...activeAccordions, index]);
    }
  };

  return (
    <div>
      {topmenusData.map((topmenu, index) => (
        <div key={index} className="px-4 mb-4">
          <div
            className={`flex justify-between items-center ${activeAccordions?.includes(index) ? "isActive-green" : ""
              }`}
            onClick={() => handleAccordion(index)}
          >
            <p className="text-[13px] capitalize font-bold text-[#212529] pt-[15px]">
              {topmenu.title}
            </p>
            <Image
              src={accordionArrowall}
              alt="down"
              width={24}
              height={24}
              priority={true}
              className={`w-6 h-6 shrink-0 ${activeAccordions?.includes(index) ? 'rotate-180' : 'rotate-[270deg]'
                }`}
            />
          </div>
          {activeAccordions?.includes(index) && (
            <div className="bg-white mt-2">
              <ul className="pl-[42px]">
                {topmenu.data.map((categorydata, subIndex) => (
                  <div key={subIndex}>
                   <Link
                   href={`${categorydata.sublink}`}
                   className="p-2 font-normal text-[#212529] leading-[20px] max-[820px]:px-0"
                   prefetch={false}
                 >
                  <li
                    className="duration-200 text-[14px]  flex items-center justify-between py-[8px]"
                  >
                   
                      {categorydata?.subtitlemenu}
                  </li>
                  </Link>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}