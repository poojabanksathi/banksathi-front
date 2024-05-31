import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import menuBackButton from '../../../../../public/assets/left-arrow.svg'
import closeIcon from '../../../../../public/assets/close-icon.svg'
import { menuDataMock } from '@/utils/alljsonfile/menuJson'
import rightArrow from '../../../../../public/assets/right-menu-arrow.svg'
import FindBestCard from '../../FindBestCard/FindBestCard'
import { useRouter } from 'next/router'

const MenuComp = ({ menuStepper, setMenuStepper }) => {
  const router = useRouter()

  const [menuCategoriesArray, setMenuCategoriesArray] = useState(menuDataMock)
  const [menuLevel2Data, setMenuLevel2Data] = useState([])
  const [level2Data, setLevel2Data] = useState([])
  const [menuLevel3Data, setMenuLevel3Data] = useState([])
  const [isLevel4Cat, setIsLevel4Cat] = useState(false)
  const [level3Title, setLevel3Title] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [indexData, setIndexData] = useState([])
  const [activeLevel, setActiveLevel] = useState(1)

  const getSubCategoriesData = (item, index = 0) => {
    // -- is LEVEL 4 CATEGORY :
    if (item?.subCategories?.length > 0 && item?.subCategories?.[0]?.level === 4) {
      setIsLevel4Cat(true)
      setIndexData((prevIndex) => (prevIndex === index ? setIsLevel4Cat(false) : index))
      setSelectedIndex(index)
      setActiveLevel(4)
      setMenuLevel3Data(item?.subCategories)
    } else if (
      Number(item?.subCategories?.[0]?.parentId) === Number(item?.id) &&
      item?.subCategories?.[0]?.level !== 4
    ) {
      // -- is LEVEL 2, 3 CATEGORY :
      setMenuStepper(menuStepper + 1)
      setLevel3Title(item?.name)
      setIsLevel4Cat(false)
      setActiveLevel(2)
      setMenuLevel2Data(item?.subCategories)
      // setIndexData((prevIndex) => (prevIndex === index ? null : index))
    }
  }
  const getTitle = () => {
    if (menuStepper === 1) {
      return 'Menu'
    }
    if (menuStepper === 2) {
      return 'Main Menu'
    }
    if (menuStepper >= 3) {
      return level3Title
    }
  }
  const onCloseBtn = () => {
    setMenuStepper(0)
    setIndexData([])
    setMenuLevel3Data([])
  }
  const onBackBtn = () => {
    if (menuStepper >= 3) {
      setMenuStepper(2)
      setMenuLevel2Data(level2Data)
      setIndexData([])
      setMenuLevel3Data([])
    } else {
      setMenuStepper(menuStepper - 1)
      setIndexData([])
    }
  }

  const title = getTitle()

  const handleMenuClick = (item) => {
    const { url_slug } = item
    if (url_slug !== '') {
      router.push(`${url_slug}`)
      setMenuStepper(0)
    }
  }

  useEffect(() => {
    if (title === 'Menu' || title === 'Main Menu') {
      setActiveLevel(2)
    } else {
      setActiveLevel(3)
    }
  }, [title])

  useEffect(() => {
    if (menuStepper === 2) {
      setLevel2Data(menuLevel2Data)
    }
  }, [menuLevel2Data, menuStepper])

  return (
    menuStepper >= 1 && (
      <div className='bg-white h-[100vh] pt-[22px] w-full fixed overflow-y-auto z-10 max-h-[80vh] block'>
        <div className=' px-[18px]'>
          <div className='flex flex-row justify-between'>
            <div
              className='flex flex-row'
              onClick={() => {
                onBackBtn()
              }}>
              <Image src={menuBackButton} width={25} height={10} alt='img_text' className='flex mr-[20px]' />
              <div className="text-neutral-800 text-[15px] font-semibold font-['Faktum']">{getTitle()}</div>
            </div>
            <div
              className='flex'
              onClick={() => {
                onCloseBtn()
              }}>
              <Image src={closeIcon} width={24} height={24} priority={true} alt='img_text' className='' />
            </div>
          </div>
          <div className='mt-[33px]'>
            <>
              {menuStepper === 1 &&
                menuCategoriesArray?.map((item, index) => {
                  return (
                    <div key={index} className='flex flex-row justify-between'>
                      <div
                        onClick={() => handleMenuClick(item)}
                        className="text-neutral-800 text-[14px] font-semibold font-['Poppins'] mb-[22px]">
                        {item?.name}
                      </div>
                      <div
                        onClick={() => {
                          getSubCategoriesData(item)
                          setMenuStepper(menuStepper + 1)
                        }}>
                        {item?.subCategories?.length > 0 && (
                          <Image
                            src={rightArrow}
                            width={8}
                            height={10}
                            alt='img_text'
                            className='flex mr-[10px] items-center'
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
            </>
            <>
              {menuStepper >= 2 &&
                menuLevel2Data?.length > 0 &&
                menuLevel2Data?.map((item, index) => {
                  return (
                    <>
                      <div key={index} className='flex flex-col'>
                        <div className='flex items-center flex-row justify-between'>
                          <div
                            onClick={() => handleMenuClick(item)}
                            className="flex items-center text-neutral-800 text-[14px] font-semibold font-['Poppins'] mb-[22px]">
                            {item?.name}
                          </div>
                          <div
                            className='flex items-center'
                            onClick={() => {
                              getSubCategoriesData(item, index)
                            }}>
                            {item?.subCategories?.length > 0 && (
                              <Image
                                src={rightArrow}
                                width={8}
                                height={10}
                                alt='img_text'
                                className={`flex items-center mr-[10px] relative bottom-[1rem] ${
                                  indexData === index ? 'rotate-90' : 'rotate-0'
                                }`}
                              />
                            )}
                          </div>
                        </div>
                        <div className=''>
                          {isLevel4Cat &&
                            menuLevel3Data?.length > 0 &&
                            Number(item?.id) === Number(menuLevel3Data?.[0]?.parentId) && (
                              <div className='mb-[14px]'>
                                {menuLevel3Data?.map((sub4Category) => {
                                  return (
                                    <div
                                      key={sub4Category?.id}
                                      onClick={() => handleMenuClick(sub4Category)}
                                      className={
                                        "text-neutral-800 text-[14.5px] font-normal font-['Poppins'] leading-9"
                                      }>
                                      {sub4Category?.name}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                        </div>
                      </div>
                    </>
                  )
                })}
            </>
          </div>
        </div>
        <FindBestCard isLevel4Open={isLevel4Cat} level4Data={menuLevel3Data} activeLevel={activeLevel} />
      </div>
    )
  )
}

export default MenuComp
