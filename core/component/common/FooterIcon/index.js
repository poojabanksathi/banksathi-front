import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import facebookIcon from '../../../../public/assets/facebook-footer-icon.svg'
import instagramIcon from '../../../../public/assets/instagram-footer-icon.svg'
import linkedinIcon from '../../../../public/assets/linkedin-footer-icon.svg'
import mailIcon from '../../../../public/assets/mail-footer-icon.svg'
import whatsappIcon from '../../../../public/assets/whatsapp-footer-icon.svg'
import twitterIcon from '../../../../public/assets/twitter-footer-icon.svg'
import youtubeIcon from '../../../../public/assets/youtube-footer-icon.svg'

const socialIcons = [
    { href: 'https://www.facebook.com/banksathi/', src: facebookIcon, alt: 'Facebook' },
    { href: 'https://www.instagram.com/banksathi/', src: instagramIcon, alt: 'Instagram' },
    { href: 'https://in.linkedin.com/company/banksathi', src: linkedinIcon, alt: 'LinkedIn' },
    { href: 'mailto:customer@banksathi.com', src: mailIcon, alt: 'Mail' },
    { href: 'https://wa.me/7412933933', src: whatsappIcon, alt: 'WhatsApp' },
    { href: 'https://twitter.com/banksathi1', src: twitterIcon, alt: 'Twitter' },
    { href: 'https://www.youtube.com/@banksathiplus', src: youtubeIcon, alt: 'YouTube' },
]

export default function FooterIcon() {
    return (
        <>
            {socialIcons.map((icon, index) => (
                <Link
                    key={index}
                    href={icon.href}
                    rel='nofollow'
                    target='_blank'
                    prefetch={false}
                >
                    <Image
                        src={icon.src}
                        className='w-[33px] h-[33px]'
                        width={33}
                        height={33}
                        priority={true}
                        alt={icon.alt}
                    />
                </Link>
            ))}
        </>
    )
}
