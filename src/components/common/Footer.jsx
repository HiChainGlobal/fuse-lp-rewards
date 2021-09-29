import React, { useState } from 'react'

import telegramIcon from '@/assets/images/tele.svg'
import telegramIconHover from '@/assets/images/tele_hover.svg'
import twitterIcon from '@/assets/images/twitter_white.svg'
import twitterIconHover from '@/assets/images/twitter_white_hover.svg'
import instagram from '@/assets/images/hi-instagram.svg'
import instagramHover from '@/assets/images/hi-instagram_hover.svg'
import reddit from '@/assets/images/hi-reddit.svg'
import redditHover from '@/assets/images/hi-reddit_hover.svg'
import subtract from '@/assets/images/hi-subtract.svg'
import subtractHover from '@/assets/images/hi-subtract_hover.svg'
import white from '@/assets/images/hi-white.svg' 
import whiteHover from '@/assets/images/hi-white_hover.svg' 
import line from '@/assets/images/hi-line.svg'
import lineHover from '@/assets/images/hi-line_hover.svg'  
import kaKao from '@/assets/images/hi-kakao.svg' 
import kaKaoHover from '@/assets/images/hi-kakao_hover.svg' 

import facebook from '@/assets/images/hi-facebook.svg'
import facebookHover from '@/assets/images/hi-facebook_hover.svg'


const HoverIcon = ({ Icon, Hover, link }) => {
  const [isHover, setHover] = useState(false)
  return (
    <a
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      rel='noreferrer noopener'
      className='footer__icon cell shrink'
      target='_blank'
      href={link}
    >
      {isHover ? <Hover /> : <Icon />}
    </a>
  )
}

const Footer = () => {
  return (
    <footer className='footer__wrapper grid-y align-center align-top'>
      <div className='footer cell medium-12 grid-x align-middle'>
        <div className='grid-x align-middle align-center' style={{color:'#fff'}}>
          ©2021 hi Foundation Ltd. 
        </div>
        <div className='footer__text grid-x align-start'>
             Crypto services provided by: hi Technologies Limited OÜ - Tallinn, Estonia (Reg: 14914790) License: PVT000505
        </div>
        <div className='footer__icons grid-x align-center'>
        <HoverIcon
            link='https://t.me/hi_official'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${telegramIcon})` }} />
            )}
            Hover={() => (
              <div className='image' style={{  backgroundImage: `url(${telegramIconHover})`,white:'30px',height:'30px' }}/>
            )}
          />


          <HoverIcon
            link='https://twitter.com/hi_com_official'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${twitterIcon})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${twitterIconHover})`}} />
            )}
          />

          <HoverIcon
            link='https://www.instagram.com/hi.com.official/'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${instagram})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${instagramHover})`}}  />
            )}
          />

          <HoverIcon
            link='https://www.facebook.com/hi.com.official'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${facebook})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${facebookHover})`}}  />
            )}
          />
           <HoverIcon
            link='https://www.reddit.com/r/hi_official/'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${reddit})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${redditHover})`}}  />
            )}
          />


          <HoverIcon
            link='https://www.youtube.com/hiofficialYT'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${subtract})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${subtractHover})`}}  />
            )}
          />

          <HoverIcon
            link='https://discord.com/channels/878838015965937704/878843797751074866'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${white})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${whiteHover})`}}  />
            )}
          />

          <HoverIcon
            link='https://line.me/ti/g2/vzY6dK1JXhTv1s33UTvGPw'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${line})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${lineHover})`}}  />
            )}
          />
          <HoverIcon
            link='http://pf.kakao.com/_Xxmhes'
            Icon={() => (
              <div className='image' style={{ backgroundImage: `url(${kaKao})` }} />
            )}
            Hover={() => (
              <div className='image' style={{ backgroundImage: `url(${kaKaoHover})`}}  />
            )}
          />
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
