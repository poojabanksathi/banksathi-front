import React, { useRef, useCallback, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { BASE_URL, IFSCBANKCODES } from "@/utils/alljsonfile/service";
import axios from "axios";
// import { capitalizeFirstLetter, formatName, formatNameLowecase } from '@/utils/util';

const IfscCodeDescription = dynamic(() => import('../IfscCodeDescription'), {
  ssr: false
})
const IfscCodeForm = dynamic(() => import('../IfscCodeForm'), {
  ssr: false
})

const FAQ = dynamic(() => import('@/core/component/common/FAQ/FAQ'), {
  ssr: false
})
const CreditBeginnerCard = dynamic(() => import('../../creditCardList/CreditBeginnerCard'), {
  ssr: false
})

const ServiceTabs = dynamic(() => import('../../savingAccountList/ServiceTabs'), {
  ssr: false
})

const IfscCodeCatagoty = React.memo(({

  faqdata,
  longTerm,
  serviceTabs,

}) => {
  const bottomCompRef = useRef(null)
  const [bankList, setBankList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [branchDetails , setBranchDetails] = useState({});
  const [formData, setFormData] = useState({ });
  const router = useRouter();

  
 const  bankId = bankList?.find((item) => item?.bank_title == decodeURIComponent(formData?.bank))?.id
 const  stateId = stateList?.find((item) => item?.state_name == decodeURIComponent(formData?.state))?.id
 const  districtId = districtList?.find((item) => item?.name == decodeURIComponent(formData?.district))?.id
 const  branchId = branchesList?.find((item) => item?.name == decodeURIComponent(formData?.branch))?.id




  const fetchBankList = async () => {
    try {
      const response = await axios.post(BASE_URL + IFSCBANKCODES.bankList)
      setBankList(response.data?.data);
    } catch (error) {
      console.error('Error fetching bank list:', error);
    }
  };

  const fetchStateList = async () => {
    const reqState = {
      bank_id: bankId,
    }
    try {
      const response = await axios.post(BASE_URL + IFSCBANKCODES.stateList , reqState)
      setStateList(response.data?.data);
    } catch (error) {
      console.error('Error fetching bank list:', error);
    }
  };

  const fetchDistrictList = async () => {
const req = {
  bank_id: bankId,
  state_id: stateId
}
    try {
      const response = await axios.post(BASE_URL + IFSCBANKCODES.districtList , req)
      setDistrictList(response.data?.data);
    } catch (error) {
      console.error('Error fetching bank list:', error);
    }
  };

  const fetchBranchList = async () => {
    const req1 = {
      bank_id: bankId,
      district_id: districtId,
      state_id: stateId,
    }
        try {
          const response = await axios.post(BASE_URL + IFSCBANKCODES.branchList , req1)
          setBranchesList(response.data?.data);
        } catch (error) {
          console.error('Error fetching bank list:', error);
        }
      };



      const fetchBranchDetails = async () => {
        const req2 = {
          branch_id: branchId,
        }
            try {
              const response = await axios.post(BASE_URL + IFSCBANKCODES.branchDetails , req2)
              setBranchDetails(response.data?.data);
            } catch (error) {
              console.error('Error fetching bank list:', error);
            }
          };
    

  React.useEffect(() => {
    fetchBankList();
    if(bankId){
      fetchStateList();
    }
    if(stateId){
      fetchDistrictList();
    }
    if(bankId && districtId){

      fetchBranchList();
    }
    if(branchId){
      fetchBranchDetails()
    }
  }, [bankId , stateId , districtId , branchId]);


  const memoizedFAQProps = useCallback(() => ({
    faqdata
  }), [faqdata])

  const memoizedServiceTabsProps = useCallback(() => ({
    serviceTabs,
    position: '3'
  }), [serviceTabs])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  useEffect(() => {
    const { bank, state, district, branch } = formData;
 
    let newUrl = '/ifsc-code';
    if (bank) {
      // const bankSlug = bank.toLowerCase().replace(/\s+/g, '-');
      const bankSlug = encodeURI(bank)
      newUrl += `/${bankSlug}`;
    }
    if (state) {
      // const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
      const stateSlug = encodeURI(state);
      newUrl += `/${stateSlug}`;
    }
    if (district) {
      // const districtSlug = district.toLowerCase().replace(/\s+/g, '-');
      const districtSlug = encodeURI(district);

      newUrl += `/${districtSlug}`;
    }
    if (branch) {
      // const branchSlug = branch.toLowerCase().replace(/\s+/g, '-');
      const branchSlug = encodeURI(branch);

      newUrl += `/${branchSlug}`;
    }

      window.history.replaceState(null, '', newUrl);
      // router.replace(newUrl);

  }, [formData]);




  return (
    <div className='bg-[hsl(206,47%,97%)]'>
    <div className='container max-[1024px]:px-8 mx-auto max-[991px]:max-w-full py-[30px] max-[576px]:px-6 max-[479px]:px-4 max-[479px]:py-[20px] max-[375px]:px-4 max-[320px]:px-4 flex flex-col gap-10 '>
      <IfscCodeForm formData={formData} handleChange={handleChange} router={router} setFormData={setFormData} bankList={bankList} stateList={stateList} districtList={districtList} branchesList={branchesList}/>
      {(formData.bank && formData.state && formData.district && formData.branch)  &&
      
      <IfscCodeDescription formData={formData} branchDetails={branchDetails}/>
      }
      </div>
      <div ref={bottomCompRef}>
        <CreditBeginnerCard longTerm={longTerm} />
        {serviceTabs && (
          <div className='max-sm:mx-0 container mx-auto'>
            <ServiceTabs {...memoizedServiceTabsProps()} />
          </div>
        )}
        <FAQ {...memoizedFAQProps()} />
      </div>
    </div>
  )
})

export default IfscCodeCatagoty
