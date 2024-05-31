import Image from 'next/image'
import NotFoundImg from '../../../public/assets/new-not-found.svg'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/core/component/common/Footer'), {
  ssr: false
})

export default function NotFound({errorLog}) {
  return (
    <>
      <div className='flex justify-center items-center h-[100vh] bg-[#fff]'>
        <div className='text-center px-6'>
          <Image
            src={NotFoundImg}
            alt='img_text'
            className='mx-auto max-[771px]:w-3/6 max-[576px]:w-3/4 max-[375px]:w-full'
          />
          <p className='font-bold text-[35px] max-[576px]:text-[30px] max-[425px]:text-[26px] text-center mt-3 text-[#005249]'>
            We’ll be back soon!
          </p>
          <p className=' xl:w-[60%] lg:w-[70%] md:w-[80%]  mx-auto text-[18px] max-[576px]:text-[16px] max-[425px]:text-[14px] text-center mt-2  my-3  text-[#212529]'>
            Sorry for the inconvenience. We’re performing some maintenance at the moment. If you need you can always
            follow us on Twitter for updates, otherwise we’ll back up shortly!{' '}
          </p>
          <Link href='/' className='mt-3 ' prefetch={false}>
            <button className='bg-[#49D49D] cursor-pointer flex mx-auto xl:px-4 lg:text-[10px] py-3 px-6 text-white xl:text-[14px] max-[320px]:text-[12px] sm:text-[12px] text-[14px] rounded-lg'>
              Go back
            </button>
          </Link>
        </div>
        <div className='mt-[100px]'></div>
      </div>
      <Footer />
    </>
  )
}
