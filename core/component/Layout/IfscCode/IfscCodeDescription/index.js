import { capitalizeFirstLetter } from "@/utils/util";
import * as React from "react";

const IfscCodeDescription = ({formData , branchDetails}) => {
  return (
<div className="container  max-[1200px]:px-0 px-12 pb-0">

    <div className="flex flex-col rounded-3xl">
      <div className="px-9 py-8 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-[576px]:gap-4">
          <div className="flex flex-col w-[85%] max-[992px]:w-[80%] max-md:ml-0 max-md:w-full">
            <div className="flex gap-8 items-start text-base text-black  max-md:max-w-full">
              <div className="flex flex-col gap-6 max-[576px]:gap-2 w-full">
                <div className="flex gap-x-[4.5rem] gap-y-6 max-[576px]:flex-col max-[576px]:gap-2 flex-wrap code-description">

            <div className="flex gap-3">
                  <span className="text-[15px] font-poppins text-black leading-[22.5px] font-semibold">IFSC Code:</span>
                  <span className="text-[15px] font-poppins font-normal text-black leading-[22.5px] ">{branchDetails?.ifsc || '-'}</span>
            </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-poppins text-black leading-[22.5px] font-semibold">Bank:</span> 
                <span className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">{capitalizeFirstLetter(formData?.bank)}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-poppins text-black leading-[22.5px] font-semibold">District: </span>
                <span className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">{capitalizeFirstLetter(formData?.district)}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-poppins  text-black leading-[22.5px] font-semibold">Branch:</span> 
                <span className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">{capitalizeFirstLetter(formData?.branch)}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-poppins text-black leading-[22.5px] font-semibold">MICR:</span>
                <span className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">{branchDetails?.micr || '-'}</span>
              </div>
              
              <div className="flex gap-3">
                  <span className="text-[15px] font-poppins text-black leading-[22.5px] font-semibold">State:</span> 
                  <span className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">{capitalizeFirstLetter(formData?.state)}</span>
                </div>
                </div>
               
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[15%] max-[992px]:w-[20%] max-md:w-full">
            <div className="flex grow gap-10 items-start text-base text-black  max-md:max-w-full">
         
              <div className="text-[15px] font-poppins font-normal text-black leading-[22.5px] break-all">
                <span className="font-semibold">Address:</span>{' '} {branchDetails?.address || '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default IfscCodeDescription;