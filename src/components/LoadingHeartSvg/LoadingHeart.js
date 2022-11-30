import React from 'react';

function LoadingHeart() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        margin: 'auto',
        background: 'rgb(255, 255, 255)',
        DarkreaderInlineBgimage: 'initial',
        DarkreaderInlineBgcolor: '#17191a',
        overflow: 'visible',
      }}
      width='200'
      height='200'
      display='block'
      preserveAspectRatio='xMidYMid'
      viewBox='0 0 100 100'>
      <path
        fill='#e90c59'
        d='M32.56-27.44a19.99 19.99 0 00-28.32 0L0-23.2l-4.24-4.24a19.99 19.99 0 00-28.32 0 19.99 19.99 0 000 28.32l4.24 4.24 9.92 9.84L0 33.36l18.4-18.4 9.92-9.92L32.56.8c7.76-7.84 7.76-20.48 0-28.24z'
        style={{ DarkreaderInlineFill: '#b10a43' }}
        transform='translate(50 50)'>
        <animateTransform
          attributeName='transform'
          calcMode='spline'
          dur='1.8181818181818181s'
          keySplines='0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1;0.215 0.61,0.355 1'
          keyTimes='0;0.05;0.39;0.45;0.6;1'
          repeatCount='indefinite'
          type='scale'
          values='0.68;0.8;0.6000000000000001;0.7200000000000001;0.68;0.6400000000000001'></animateTransform>
      </path>
    </svg>
  );
}

export default LoadingHeart;
