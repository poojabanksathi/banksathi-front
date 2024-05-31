import Image from 'next/image'
import React, { useEffect } from 'react'
import { useState } from 'react'
import SideBar from '../../SiderBarList'
import calendarIcon from '../../../../../public/assets/calendar.svg'
import { BASE_URL, USERSET } from '@/utils/alljsonfile/service'
import axios from 'axios'
import LoaderComponent from '@/core/component/Partners/LoaderComponent/LoaderComponent'

const MyApplicationList = ({ headersAuth, token, leadId }) => {
  const [siderbar, setSideBar] = useState(false)
  const [siderDataApp, setSideDataApp] = useState()
  const [appLogData, setAppLogData] = useState([])
  const [leadIdUser, setLeadIdUser] = useState()
  const [statusArray, setStatusArray] = useState([])
  const [applicationData, setApplicationData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const Img_URL = process.env.NEXT_PUBLIC_BASE_IMG_CDN_URL
  const initialStatusAarray = applicationData?.data?.map((item) => item?.status)
  const initialActiveData = applicationData?.data?.filter((item) => item?.status === initialStatusAarray?.[0])

  const [activeTab, setActiveTab] = useState(initialStatusAarray?.[0])
  const [applicationListData, setApplicationListData] = useState(initialActiveData || applicationData)

  const handleSidebarOpen = (index) => {
    setSideDataApp(index)
    setLeadIdUser(index?.leads_id)
    setSideBar(true)
  }

  const GetAppLogApi = (e) => {
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.leadapplog,
        {
          lead_profile_id: leadId,
          leads_id: leadIdUser
        },
        { headers: headersAuth }
      )
      .then((response) => {
        if (response?.data?.message === 'success') {
          setAppLogData(response?.data)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.message == 'failed') {
        } else if (error?.response?.status == 403) {
        }
      })
  }

  function formatDate(dateString) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const date = new Date(dateString)
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    let hours = date.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12

    const minutes = date.getMinutes()

    return `${day} ${month} ${year} . ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  const handleToggleFilter = (selectedTab) => {
    if (selectedTab) {
      setApplicationListData(applicationData?.data?.filter((item) => item?.status === selectedTab))
    }
  }

  // ------- APPLICATION STATUS API ----------- //
  const getMyApplicationStatus = (e) => {
    setIsLoading(true)
    e?.preventDefault()
    axios
      .post(
        BASE_URL + USERSET?.leadmyapplication,
        {
          lead_profile_id: leadId
        },
        { headers: headersAuth }
      )
      .then((response) => {
        setIsLoading(false)
        if (response?.data?.message === 'success') {
          setApplicationData(response?.data)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.log('Error in my application api', error)
      })
  }

  useEffect(() => {
    if (token && leadIdUser) {
      GetAppLogApi()
    }
  }, [leadIdUser])

  useEffect(() => {
    if (siderbar) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [siderbar])

  useEffect(() => {
    if (applicationData) {
      setActiveTab(initialStatusAarray?.[0])
      setApplicationListData(initialActiveData)
    }
  }, [applicationData])

  useEffect(() => {
    const removeDuplicates = (arr) => {
      let unique = []
      arr?.forEach((element) => {
        if (!unique?.includes(element)) {
          unique?.push(element)
        }
      })
      return unique
    }
    const filter = removeDuplicates(initialStatusAarray)
    filter && setStatusArray(filter)
  }, [initialStatusAarray?.length, statusArray?.length])

  useEffect(() => {
    getMyApplicationStatus()
  }, [])

  return (
    <>
      {isLoading && <LoaderComponent />}
      {siderbar ? (
        <div className='transition-all ease-in'>
          <SideBar
            setSideBar={setSideBar}
            formatDate={formatDate}
            appLogData={appLogData}
            siderDataApp={siderDataApp}
            Img_URL={Img_URL}
          />
        </div>
      ) : (
        ''
      )}
      <div>
        <div className='pb-4 flex justify-between gap-4 max-[479px]:px-4 items-center max-[479px]:flex-col-reverse max-[479px]:gap-5'>
          <p className=' whitespace-nowrap text-[#212529] head-text font-[faktum] xl:text-3xl lg:text-3xl md:text-3xl  max-[576px]:text-[28px] max-[479px]:text-[22px] font-semibold max-[479px]:text-left max-[479px]:w-full '>
            My Application
          </p>

          <div
            className={`flex flex-row bg-white max-[1440px]:w-auto h-auto max-sm:h-auto max-[576px]:w-[70vw] py-2 px-2 justify-between rounded-full items-center ${
              statusArray?.length === 2 && 'max-sm:!w-[60vw]'
            } ${statusArray?.length > 2 && '!overflow-x-auto max-sm:!w-[95vw]'}`}>
            {statusArray?.map((item) => {
              return (
                <p
                  className={`w-full whitespace-nowrap flex p-[10px] text-center cursor-pointer head-text font-[faktum] font-semibold text-[13px] h-full justify-center items-center max-[479px]:text-[12px]  max-[375px]:text-[12px] max-[360px]:text-[13px] max-[320px]:text-[12px] max-[320px]:px-2 mt-0 rounded-full  max-[280px]:text-[12px] ${
                    activeTab === item ? 'bg-[#844FCF] text-white' : 'text-[#212529]'
                  }`}
                  onClick={() => {
                    setActiveTab(item)
                    handleToggleFilter(item)
                  }}
                  key='1'>
                  {item}
                </p>
              )
            })}
          </div>
        </div>

        <div className='max-[479px]:px-4 max-[479px]:grid max-[479px]:grid-cols-1 max-[479px]:gap-5'>
          {applicationListData?.length > 0 &&
            applicationListData?.map((appdata, index) => {
              const inputDate = appdata?.updated_time
              const formattedDate = formatDate(inputDate)

              return (
                <div key={index}>
                  <div className='rounded-3xl bg-white h-[155px] max-[576px]:h-auto  mb-6 max-[479px]:mb-0'>
                    <div className='px-[30px]  py-[30px] max-[771px]:px-[25px] max-[479px]:px-[30px] cards-details-filter'>
                      <div className='flex justify-between gap-5 max-[576px]:flex-col '>
                        <div className='flex items-center  gap-6 max-[479px]:flex-col max-[479px]:items-center max-[479px]:gap-5 max-[479px]:gap-0'>
                          <div className='w-auto h-[99px] safari_my_app_div flex max-[479px]:w-full max-[479px]:h-full'>
                            <Image
                              src={`${Img_URL}/${appdata?.product_image}`}
                              loading='lazy'
                              alt='card image'
                              width={150}
                              height={99}
                              className='xl:w-full safari_my_app_img  md:w-full max-[479px]:mx-auto'
                              unoptimized={true}
                            />
                          </div>
                          <div>
                            <p className='text-[#844FCF] flex gap-2 max-[479px]:justify-center'>
                              <Image src='/assets/credit-card-purple.svg' alt='card-icon' width={16} height={16} />
                              {appdata?.category_name}
                            </p>
                            <p className='text-[18px] text-[#212529] font-semibold leading-[25.2px] font-[Poppins] max-[479px]:text-[15px] max-[479px]:text-center '>
                              {appdata?.product_name}
                            </p>
                            <div className='flex items-center gap-3 max-[479px]:justify-center max-sm:flex-col max-sm:gap-1'>
                              <div className='text-[13px] text-[#212529]  font-normal leading-[21px] font-[Poppins] max-[479px]:text-[12px] max-[479px]:justify-center'>{`Lead Code : ${appdata?.leads_code}`}</div>
                              <p className='text-[13px] text-[#212529] gap-3 flex items-center font-normal leading-[21px] font-[Poppins] max-[479px]:text-[12px] max-[479px]:justify-center'>
                                <Image src={calendarIcon} width={20} height={20} alt='calendar' /> {formattedDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-5 max-[576px]:justify-center max-[479px]:flex-col'>
                          <div>
                            <button
                              className={`bg-[#FFF0E1] cursor-pointer text-[#FF8E25] rounded-2xl  py-2 px-3 gap-2 text-xs flex items-center font-[Poppins] font-semibold`}>
                              <Image
                                src={'/assets/clock-inprogress.svg'}
                                alt='payment'
                                className='w-3.5 h-4'
                                width={10}
                                height={10}
                              />
                              {appdata?.status}
                            </button>
                          </div>
                          <div>
                            <button
                              className=' rounded-2xl cursor-pointer text-[#FF8E25] py-2 px-3 gap-2 text-xs flex items-center font-[Poppins] font-semibold'
                              onClick={() => handleSidebarOpen(appdata)}>
                              <Image src={'/assets/RightShortArrow.svg'} alt='payment' width={28} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default MyApplicationList
