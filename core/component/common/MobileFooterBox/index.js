import Image from 'next/image'

const MobileFooterBox = ({
  name,
  Card,
  width,
  height,
  padding,
  margin,
  backgrounColor,
  fontWeight,
  fontSize,
  textAlign,
  handleHeader,
  handlecloseFooter,
  count,
  setcount,
  setFooterTab,
  footerTab,
  index
}) => {
  const styling = {
    width,
    height,
    padding,
    margin,
    backgrounColor
  }
  const fontStyling = {
    fontWeight,
    fontSize,
    textAlign,
    padding,
    margin
  }

  return (
    <>
      <div style={styling} className='flex items-center justify-center'>
        <div
          onClick={() => {
            if (count >= 4) {
              handlecloseFooter()
              setcount(0)
              setFooterTab(index)
            } else {
              handleHeader(name)
            }
          }}>
          <Image src={Card} width='30' height='30' className='w-[24px] h-[24px] mx-auto ' alt='image' />
          <p
            style={fontStyling}
            className={`moblie-footer-name pt-2 text-[11px]  text-center  ${footerTab === index ? " text-[#000] " : "!text-[#8D9CA5]"
              } max-lg:text-[11px] max-[375px]:text-[11px] font-normal`}   >
            {name}
          </p>
        </div>
      </div>
    </>
  )
}
export default MobileFooterBox
