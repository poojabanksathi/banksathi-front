import SubmitFormBtn from '@/core/component/common/SubmitFormBtn'
import React, { useEffect, useState } from 'react'
import { BASE_URL, CONTACTAUTH, ENQUIRYAUTH, USERSET } from '@/utils/alljsonfile/service'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'
import axios from 'axios'
import { ApiMessage } from '@/utils/alljsonfile/apimessage'
import { useRouter } from 'next/router'
import { removeNonAlphaNumeric } from '@/utils/util'
import Loader from '@/core/component/Leads/common/Loader'
import LoaderLogo from '../../../../../public/assets/logo-loader.gif'
import { useWindowSize } from '@/hooks/useWindowSize'

function EnquiryContent() {
    const [scrollY, setScrollY] = useState(0)
    const [modalIsOpen, setIsOpen] = React.useState(false)
    const [thankModal, setThankModal] = useState(false)
    const [errMsg, setErrorMsg] = useState(false)
    const [mobile, SetMobile] = useState()
    const [responseData, setResponseData] = useState([])
    const [formData, setFormdata] = useState({})
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isLoadingOtp, setLoadingOtp] = useState(false)

    const [time, setTime] = useState(60)
    const [IstimeActive, setIsTimeActive] = useState(true)
    const [zeroNumberValidation, setZeroNumberValidation] = useState(false)
    const [errorHref, setErrorHref] = useState(false)
    const [errorHrefName, setErrorHrefName] = useState(false)
    const [errorHrefEmail, setErrorHrefEmail] = useState(false)
    const [selectedOption, setSelectedOption] = useState('YOUTUBE');
    const size = useWindowSize()
    const mobileSize = size?.width <= 479
    const [maxChars] = useState(1000);
    const [remainingChars, setRemainingChars] = useState(maxChars);


    const handleInputChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const isYouTube = selectedOption === 'YOUTUBE';
    const isInstagram = selectedOption === 'INSTAGRAM';
    const isBoth = selectedOption === 'BOTH';

    const token = localStorage?.getItem('token')

    const router = useRouter()

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => {
                setTime(time - 1)
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [time])

    const formatTime = (time) => {
        return time.toString().padStart(2, '0')
    }

    useEffect(() => {
        if (time === 0) {
            setIsTimeActive(false)
        }
    }, [time])

    const handleValidation = (e) => {
        const FirstNameCheck = formData?.full_name?.replace(/^[a-zA-Z a-zA-Z]+$/, '')
        if (!FirstNameCheck) {
            setErrorMessage(false)
        } else {
            setErrorMessage(true)
        }
    }
    const handleValidationEmail = (e) => {
        const { value } = e.target;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            setErrorHrefEmail(true);
        } else {
            setErrorHrefEmail(false);
        }
    };

    useEffect(() => {
        if (modalIsOpen || thankModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [modalIsOpen, thankModal])


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleChange = (event) => {
        setErrorHref(false)
        setErrorHrefName(false)
        setErrorHrefEmail(false)
        const { name, value } = event?.target;
        if (name === 'enquiry' || name === 'name' || name === 'email') {
            const hrefRegex = /(https?:\/\/\S+|www\.\S+)/gi
            if (hrefRegex.test(value)) {
                if (name === 'enquiry') {
                    setErrorHref(true)
                } else if (name === 'name') {
                    setErrorHrefName(true)
                } else {
                    setErrorHrefEmail(true)
                }
            } else {
                setFormdata({ ...formData, [name]: value })
            }
        } else if (name === 'youtube_subscribers_count' || name === 'youtube_monthly_views' || name === 'instagram_followers_count' || name === 'instagram_monthly_views') {
            const positiveValue = value.replace(/[^\d]/g, '');
            setFormdata({ ...formData, [name]: positiveValue });
        } else {
            setFormdata({ ...formData, [name]: value });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let bodyFormData = new FormData()
        bodyFormData.append('name', formData.name)
        bodyFormData.append('email', formData.email)
        bodyFormData.append('mobile_no', formData.mobile_no)
        bodyFormData.append('instagram_followers_count', formData.instagram_followers_count)
        bodyFormData.append('instagram_monthly_views', formData.instagram_monthly_views)
        bodyFormData.append('instagram_link', formData.instagram_link)
        bodyFormData.append('eligible', formData.eligible)
        bodyFormData.append('message', formData.message)
        bodyFormData.append('youtube_link', formData.youtube_link)
        bodyFormData.append('youtube_subscribers_count', formData.youtube_subscribers_count)
        bodyFormData.append('youtube_monthly_views', formData.youtube_monthly_views)
    }

    const handleChangeNumber = (e) => {
        const inputValue = e.target.value;
        const extractedNumber = inputValue.replace(/\D/g, '');

        if (extractedNumber.length <= 10) {
            setFormdata({ ...formData, mobile_no: extractedNumber });

            if (extractedNumber.length === 10 && extractedNumber !== '0000000000') {
                SetMobile(extractedNumber);
                setErrorMsg(false);
                setZeroNumberValidation(false);
            } else if (extractedNumber.length < 10 || extractedNumber === '0000000000') {
                setErrorMsg(true);
                if (extractedNumber === '0000000000') {
                    setZeroNumberValidation(true);
                } else {
                    setZeroNumberValidation(false);
                }
                SetMobile(extractedNumber);
            }
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    const influencerRegister = (e) => {

        axios
            .post(
                BASE_URL + ENQUIRYAUTH?.influencerregister,
                {
                    name: formData.name || "",
                    email: formData.email || "",
                    mobile_no: formData?.mobile_no || "",
                    message: formData?.message || "",
                    eligible: false,
                    influencer_type: selectedOption,
                    instagram_followers_count: parseInt(formData.instagram_followers_count) || 0,
                    instagram_monthly_views: parseInt(formData?.instagram_monthly_views) || 0,
                    instagram_link: formData?.instagram_link || null,
                    youtube_link: formData?.youtube_link || null,
                    youtube_subscribers_count: parseInt(formData?.youtube_subscribers_count) || 0,
                    youtube_monthly_views: parseInt(formData?.youtube_monthly_views) || 0
                },
                { headers: headers }
            )
            .then((response) => {
                if (response?.data?.message == 'success') {
                    setResponseData(response?.data)
                    setFormdata({
                        ...formData,
                        name: '',
                        email: '',
                        mobile_no: '',
                        instagram_followers_count: '',
                        instagram_monthly_views: '',
                        eligible: '',
                        instagram_link: '',
                        message: '',
                        youtube_link: '',
                        youtube_subscribers_count: '',
                        youtube_monthly_views: ''
                    })
                    setIsTimeActive(false)
                    toast.success(response?.data?.message)
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.reason || error?.response?.data?.detail || error?.message)

            })
    }

    useEffect(() => {
        const allFieldsFilled =
            formData.name &&
            formData.email &&
            formData.mobile_no &&
            formData.message &&
            (isInstagram || isBoth ? formData.instagram_link && formData.instagram_followers_count && formData.instagram_monthly_views : true) &&
            (isYouTube || isBoth ? formData.youtube_link && formData.youtube_subscribers_count && formData.youtube_monthly_views : true);

        setDisabled(!allFieldsFilled);
    }, [formData, isInstagram, isYouTube, isBoth])

    const handleNumberEdit = () => {
        setIsOpen(false)
        setOtpdataContact([])
        setLoading(false)
        setLoadingOtp(false)
    }

    const handleTextareaChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length > maxChars) {
            e.target.value = inputText.substring(0, maxChars);
            setErrorMessage(true);
        } else {
            const remaining = maxChars - inputText.length;
            setRemainingChars(remaining);
            setErrorMessage(false);
            setFormdata({ ...formData, message: inputText });
        }
    };

    return (
        <>
            <Toaster />
            {isLoading || isLoadingOtp ? (
                <div className='relative z-50' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                    <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>

                    <div className='fixed inset-0 z-50 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center  sm:p-0'>
                            <div className='relative transform overflow-hidden'>
                                <Image src={LoaderLogo} className='w-[150px] h-[150px] bg-white rounded-full' alt='imageloader' />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div className='bg-[#F4F8FB] text-[#212529] h-full'>
                <div className='pt-0 container mx-auto max-[991px]:max-w-full 2xl:px-40 2xl:pb-16 xl:py-30 xl:px-24 lg:px-20 md:px-16 sm:px-8 py-8 '>
                    <div
                        className={` bg-[#fff] max-[479px]:gap-4 text-[#212529] relative h-auto items-center rounded-xl  max-[771px]:px-8 px-20 py-8 max-[1024px]:px-8 max-[576px]:h-full max-[576px]:flex-col max-[576px]:gap-8  max-[576px]:py-8 max-[479px]:px-4 max-[479px]:py-6 max-[375px]:px-4 max-[479px]:mx-4 max-[320px]:px-4 z-[1] `}>
                        <p className='head-text story-text text-[#212529] pb-2 text-[24px] max-[320px]:text-[20px] mb-4 relative text-center'>
                            BankSathi Influencer Program Join Today & Double Your Income
                        </p>
                        <form method='post' id='enquiryForm' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-3 max-[685px]:grid-cols-1 gap-5 max-[685px]:gap-0 max-[576px]:gap-0'>
                                <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : 'mb-4'}>
                                    <label className='text-[13px] font-normal text-[#212529]'>Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter your name'
                                        name='name'
                                        id='name'
                                        pattern='[A-Za-z]+'
                                        className='conformname !mb-0'
                                        alt='img'
                                        disabled={formData?.name?.length > 26 && token ? true : false}
                                        required
                                        value={formData.name}
                                        onChange={(e) => {
                                            handleChange(e)
                                            handleValidation(e)
                                        }}
                                        onInput={(e) => {
                                            e.target.value = removeNonAlphaNumeric(e)
                                        }}
                                    />
                                </div>
                                <div >
                                    <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : 'mb-4'}>
                                        <label className='text-[13px] font-normal text-[#212529]'>Mobile No.</label>
                                        <input
                                            type='number'
                                            placeholder='Enter mobile Number'
                                            name='mobile_no'
                                            id='mobile_no'
                                            className='conformname !mb-0'
                                            required
                                            value={formData.mobile_no}
                                            onChange={(e) => {
                                                handleChangeNumber(e);
                                                handleValidation(e)
                                            }}
                                        />
                                    </div>
                                    {errMsg && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberError}</p>}
                                    {zeroNumberValidation && (
                                        <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.mobileNumberZeroErr}</p>
                                    )}
                                </div>
                                <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : 'mb-4'}>
                                    <label className='text-[13px] font-normal text-[#212529]'>Email</label>
                                    <input
                                        type='email'
                                        placeholder='Enter your email'
                                        name='email'
                                        id='email'
                                        className='conformname !mb-0'
                                        alt='img'
                                        required
                                        value={formData.email}
                                        onChange={(e) => {
                                            handleChange(e)
                                            handleValidationEmail(e)
                                        }}
                                    />
                                    {errorHrefEmail && <p className='text-[12px] text-[#FF000F] font-no'>{ApiMessage?.EmailValidError}</p>}
                                </div>
                            </div>
                            <div className='mb-4'>
                                <label className='text-[13px] font-normal text-[#212529]'>Message</label>
                                <textarea
                                    className='conformtext'
                                    name='message'
                                    id='message'
                                    required
                                    placeholder='Your message here'
                                    value={formData?.message}
                                    onChange={(e) => handleTextareaChange(e)}
                                ></textarea>
                                {errorMessage && (
                                    <p className='text-[12px] text-[#FF000F] font-no'>
                                        {ApiMessage?.MaxCountError}
                                    </p>
                                )}
                                <p className='text-[12px] text-[#6B7280] mt-2 flex justify-end'>
                                    Remaining Characters: {remainingChars}
                                </p>
                            </div>
                            <div className='mb-[4%]'>
                                <div className='md:flex gap-4 items-center'>
                                    <p className='text-[13px] font-normal text-[#212529]'>Influencer type :</p>
                                    <div className='flex gap-4 max-[576px]:gap-2 md:pt-0 pt-2.5'>
                                        <div>
                                            <label
                                                htmlFor='youtube'
                                                className={`form-redio flex gap-2 max-[390px]:text-[13px] max-[320px]:gap-[6px] items-center ${isYouTube ? 'text-[#212529]' : 'text-[#808080]'}`}>
                                                <input
                                                    type='radio'
                                                    id='influencer_type'
                                                    checked={isYouTube}
                                                    name='influencer_type'
                                                    value='YOUTUBE'
                                                    onChange={handleInputChange}
                                                />
                                                YouTube
                                            </label>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor='instagram'
                                                className={`form-redio flex gap-2 max-[390px]:text-[13px] max-[320px]:gap-[6px] items-center ${isInstagram ? 'text-[#212529]' : 'text-[#808080]'}`}>
                                                <input
                                                    type='radio'
                                                    id='influencer_type'
                                                    checked={isInstagram}
                                                    name='influencer_type'
                                                    value='INSTAGRAM'
                                                    onChange={handleInputChange}
                                                />
                                                Instagram
                                            </label>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor='both'
                                                className={`form-redio flex gap-2 max-[390px]:text-[13px] max-[320px]:gap-[6px] items-center ${isBoth ? 'text-[#212529]' : 'text-[#808080]'}`}>
                                                <input
                                                    type='radio'
                                                    id='influencer_type'
                                                    checked={isBoth}
                                                    name='influencer_type'
                                                    value='BOTH'
                                                    onChange={handleInputChange}
                                                />
                                                Both
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {isYouTube || isBoth ? (
                                    <div className='grid grid-cols-3 max-[685px]:grid-cols-1 gap-5 max-[685px]:gap-0 mt-6 '>
                                        <div className=' mb-4'>
                                            <label className='text-[13px] font-normal text-[#212529]'>Youtube Link</label>
                                            <input
                                                className='conformname !mb-0'
                                                type="url"
                                                name='youtube_link'
                                                id='youtube_link'
                                                required
                                                placeholder='paste Your link here'
                                                value={formData?.youtube_link}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : ' mb-4'}>
                                            <label className='text-[13px] font-normal text-[#212529]'>Youtube Subscriber</label>
                                            <input
                                                type='number'
                                                placeholder='Enter your count'
                                                name='youtube_subscribers_count'
                                                id='youtube_subscribers_count'
                                                pattern='[A-Za-z]+'
                                                className='conformname !mb-0'
                                                alt='img'
                                                min="0"
                                                required
                                                value={formData.youtube_subscribers_count}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    handleValidation(e)
                                                }}
                                            />
                                        </div>
                                        <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : ' mb-4'}>
                                            <label className='text-[13px] font-normal text-[#212529]'>youtube Monthly Views</label>
                                            <input
                                                type='number'
                                                placeholder='Enter your views'
                                                name='youtube_monthly_views'
                                                id='youtube_monthly_views'
                                                pattern='[A-Za-z]+'
                                                className='conformname !mb-0'
                                                alt='img'
                                                min="0"
                                                required
                                                value={formData.youtube_monthly_views}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    handleValidation(e)
                                                }}
                                            />
                                        </div>

                                    </div>
                                ) : null}
                                {isInstagram || isBoth ? (
                                    <div className={`grid grid-cols-3 max-[685px]:grid-cols-1 gap-5 max-[685px]:gap-0 mt-6 max-[576px]:${isBoth && 'mt-0'}`}>
                                        <div className=' mb-4'>
                                            <label className='text-[13px] font-normal text-[#212529]'>Instagram Link</label>
                                            <input
                                                className='conformname !mb-0'
                                                type="url"
                                                name='instagram_link'
                                                id='instagram_link'
                                                required
                                                placeholder='paste Your link here'
                                                value={formData?.instagram_link}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : ' mb-4'}>
                                            <label className='text-[13px] font-normal text-[#212529]'>Instagram Followers count</label>
                                            <input
                                                type='number'
                                                placeholder='Enter your count'
                                                name='instagram_followers_count'
                                                id='instagram_followers_count'
                                                pattern='[A-Za-z]+'
                                                className='conformname !mb-0'
                                                alt='img'
                                                min="0"
                                                disabled={formData?.instagram_followers_count?.length > 26 && token ? true : false}
                                                required
                                                value={formData.instagram_followers_count}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    handleValidation(e)
                                                }}
                                            />
                                        </div>
                                        <div className={errorMessage ? ' border-[#FF000F] mb-4  ' : ' mb-4'}>
                                            <label className='text-[13px] font-normal text-[#212529]'>Instagram Monthly Views</label>
                                            <input
                                                type='number'
                                                placeholder='Enter your views'
                                                name='instagram_monthly_views'
                                                id='instagram_monthly_views'
                                                pattern='[A-Za-z]+'
                                                className='conformname !mb-0'
                                                alt='img'
                                                min="0"
                                                required
                                                value={formData.instagram_monthly_views}
                                                onChange={(e) => {
                                                    handleChange(e)
                                                    handleValidation(e)
                                                }}
                                            />
                                        </div>

                                    </div>
                                ) : null}
                            </div>

                            <div>
                                {mobileSize ? (
                                <div className='fixed bottom-0 left-0 z-[999] h-[53px] w-full justify-between items-center'>
                                    <div className='text-center'>
                                        <SubmitFormBtn
                                            name={!isLoading ? 'Submit' : <Loader />}
                                            disabled={disabled || isLoading}
                                            onClick={influencerRegister}
                                        />
                                    </div>
                                </div>
                            ) :
                                <div className='text-center'>

                                    <SubmitFormBtn
                                        name={!isLoading ? 'Submit' : <Loader />}
                                        disabled={disabled || isLoading}
                                        onClick={influencerRegister}
                                    />
                                </div>
                            }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnquiryContent
