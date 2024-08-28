

import { BankOption, BranchOption, DistrictOption, StateOption } from "@/utils/alljsonfile/code_data";
import { capitalizeFirstLetter, formatName, formatNameLowecase } from "@/utils/util";

import * as React from "react";

const IfscCodeForm = ({ formData, handleChange, router, setFormData , bankList, stateList , districtList, branchesList }) => {





  const path = router.asPath;
    const values = path.split('/').filter(Boolean);

  const defaultBankValue = values[1] || '';
  const defaultStateValue = values[2] || '';
  const defaultDistrictValue = values[3] || '';
  const defaultBranchValue = values[4] || '';






  React.useEffect(() => {

    if (defaultBranchValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bank: decodeURIComponent(defaultBankValue),
        state: decodeURIComponent(defaultStateValue),
        district: decodeURIComponent(defaultDistrictValue),
        branch: decodeURIComponent(defaultBranchValue)

      }));
    } else if (defaultDistrictValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bank: decodeURIComponent(defaultBankValue),
        state: decodeURIComponent(defaultStateValue),
        district: decodeURIComponent(defaultDistrictValue)

      }));
    } else if (defaultStateValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bank: decodeURIComponent(defaultBankValue),
        state: decodeURIComponent(defaultStateValue)

      }));
    } else if (defaultBankValue) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bank: decodeURIComponent(defaultBankValue)

      }));
    }

  }, [defaultBankValue, defaultStateValue, defaultDistrictValue, defaultBranchValue])

  return (
    <div className="container  max-[1200px]:px-0 px-12 pb-0">
      <div className="flex flex-col rounded-none">
        <div className="px-9 py-10 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col gap-2">
                <div className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">Bank Name</div>
                <div className="flex flex-col justify-center items-end py-2 px-4 rounded-lg border border-solid border-[#C2CACF] max-md:px-5">
                  <select
                    className="bg-white border-none text-[15px] font-poppins font-normal text-black leading-[22.5px] w-full focus:outline-none"
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                  >
                    <option selected disabled hidden value="">
                      Select Bank
                    </option>
                    {bankList?.map((option) => (
                      <option
                        key={option?.bank_title}
                        value={option?.bank_title}
                      >
                        {option?.bank_title}
                      </option>
                    ))}
                  </select>
                 
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col gap-2">
                <div className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">State</div>
                <div className="flex flex-col justify-center items-end py-2 px-4 rounded-lg border border-solid border-[#C2CACF] max-md:px-5">
                  <select
                    className="bg-white border-none text-[15px] font-poppins font-normal text-black leading-[22.5px] w-full focus:outline-none"
                    name="state"
                    value={formData?.state}
                    onChange={handleChange}
                    disabled={!formData.bank}
                  >
                    <option selected disabled hidden value="">Select State</option>

                      {stateList?.map((option, index) => {
                      return (
                        <option
                          key={option?.state_name}
                          value={option?.state_name}
                        >
                          {option?.state_name}
                        </option>

                      )
                    })}

                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col gap-2">
                <div className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">District</div>
                <div className="flex flex-col justify-center items-end py-2 px-4 rounded-lg border border-solid border-[#C2CACF] max-md:px-5">
                  <select
                    className="bg-white border-none  text-[15px] font-poppins font-normal text-black leading-[22.5px] w-full focus:outline-none"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.state}
                  >
                    <option selected disabled hidden value="">Select District</option>

                    {districtList?.map((option, index) => {
                      return (
                        <option
                          key={option?.name}
                          value={option?.name}

                        >{option?.name}</option>

                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col gap-2">
                <div className="text-[15px] font-poppins font-normal text-black leading-[22.5px]">Branch</div>
                <div className="flex flex-col justify-center items-end py-2 px-4 rounded-lg border border-solid border-[#C2CACF] max-md:px-5">
                  {/* <select
                    className="bg-white border-none text-[15px] font-poppins font-normal text-black leading-[22.5px] w-full focus:outline-none"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    disabled={!formData.district}

                  >
                    <option selected disabled hidden value="">Select Branch</option>
                    {BranchOption?.map((option, index) => {
                      return (
                        <option
                          key={option?.title}
                          value={option?.title}
                        >{option?.title}</option>
                      )
                    })}

                  </select> */}
                  <select
                    className="bg-white border-none text-[15px] font-poppins font-normal text-black leading-[22.5px] w-full focus:outline-none"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    disabled={!formData.district}

                  >
                    <option selected disabled hidden value="">Select Branch</option>
                    {branchesList?.map((option, index) => {
                      return (
                        <option
                          key={option?.name}
                          value={option?.name}
                        >{option?.name}</option>
                      )
                    })}

                  </select>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default IfscCodeForm;