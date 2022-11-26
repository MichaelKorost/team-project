import React from 'react';
import './LoadingPage.css';
//sorce: https://codepen.io/imjasonmiller/pen/WvKLor   changes were needed to work
function LoadingPage() {
  return (
    <div className='loading-page'>
      <svg
        className='loading'
        id='preloader'
        width='240px'
        height='120px'
        viewBox='0 0 240 120'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'>
        <path
          id='loop-normal'
          className='st1'
          d='M120.5,60.5L146.48,87.02c14.64,14.64,38.39,14.65,53.03,0s14.64-38.39,0-53.03s-38.39-14.65-53.03,0L120.5,60.5
    L94.52,87.02c-14.64,14.64-38.39,14.64-53.03,0c-14.64-14.64-14.64-38.39,0-53.03c14.65-14.64,38.39-14.65,53.03,0z'>
          <animate
            attributeName='stroke-dasharray'
            from='500, 50'
            to='450 50'
            begin='0s'
            dur='2s'
            repeatCount='indefinite'
          />
          <animate
            attributeName='stroke-dashoffset'
            from='-40'
            to='-540'
            begin='0s'
            dur='2s'
            repeatCount='indefinite'
          />
        </path>

        <path
          id='loop-offset'
          d='M146.48,87.02c14.64,14.64,38.39,14.65,53.03,0s14.64-38.39,0-53.03s-38.39-14.65-53.03,0L120.5,60.5L94.52,87.02c-14.64,14.64-38.39,14.64-53.03,0c-14.64-14.64-14.64-38.39,0-53.03c14.65-14.64,38.39-14.65,53.03,0L120.5,60.5L146.48,87.02z'></path>

        <path
          id='socket'
          d='M7.5,0c0,8.28-6.72,15-15,15l0-30C0.78-15,7.5-8.28,7.5,0z'>
          <animateMotion
            dur='2s'
            repeatCount='indefinite'
            rotate='auto'
            keyTimes='0;1'
            keySplines='0.42, 0.0, 0.58, 1.0'>
            <mpath xlinkHref='#loop-offset' />
          </animateMotion>
        </path>

        <path
          id='plug'
          d='M0,9l15,0l0-5H0v-8.5l15,0l0-5H0V-15c-8.29,0-15,6.71-15,15c0,8.28,6.71,15,15,15V9z'>
          <animateMotion
            dur='2s'
            rotate='auto'
            repeatCount='indefinite'
            keyTimes='0;1'
            keySplines='0.42, 0, 0.58, 1'>
            <mpath xlinkHref='#loop-normal' />
          </animateMotion>
        </path>
      </svg>

      <div className='credit'>
        <a
          href='https://thenounproject.com/search/?q=energy&i=2064'
          target='_blank'>
          Original Sustainable Energy Icon by Iconathon
        </a>
      </div>
    </div>
  );
}

export default LoadingPage;
