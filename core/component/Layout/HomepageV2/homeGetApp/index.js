import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HomeGetApp() {
  return (
    <div className="news w-full">
    <div className="bg-black">
        <div className="grid sm:grid-cols-2 grid-cols-1">
            <div className="sm:p-24 p-8">
                <div className="flex justify-center items-center h-[100%]">
                    <div>
                        <h2 className="text-white sm:text-left text-center  text-[32px] sm:w-[60%] w-[100%] md:leading-[50px] sm:leading-[40px] max-[479px]:leading-[34px]">
                            Get the BankSathi mobile app
                        </h2>
                        <p className="text-white pop sm:w-[70%] w-[100%] sm:text-left text-center mt-6 text-[14px]">
                            Take
                            charge of
                            your financial
                            requirements
                            from
                            anywhere and
                            at
                            any time.</p>

                        <Link href={'https://click.trackier.io/c/QWpuAnRezz?click_id=click&sub_site_id=BS_Web&pid=qWqjLsqSRK&lbw=7d'}  target="_blank" className='flex justify-center'>
                        <Image width={80} height={80} className="mt-10 w-[30%]"
                                 src="/assets/white-play.svg"
                                 alt="image" />
                        </Link>
                        {/* <a className="flex justify-center"
                           href="https://play.google.com/store/apps/details?id=com.app.banksathi"
                           target="_blank"> <Image width={80} height={80} className="mt-10 w-[30%]"
                                 src="/assets/white-play.svg"
                                 alt="image" /></a> */}

                    </div>
                </div>
            </div>
            <div>
                <Image src="/assets/newsletter.png" className='w-full h-full' width={80} height={80}
                     alt="image" unoptimized/>
            </div>
        </div>
    </div>
</div>

  )
}

export default HomeGetApp