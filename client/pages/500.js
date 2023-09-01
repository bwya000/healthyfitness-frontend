//正式上線才用的到的報錯
import React from 'react';
import SplineEmbed from '@/components/video/SplineEmbed';

export default function Custom404() {
  return (
    <>
      <div className='title'>
        Oops... It looks like we spilled the milk on this one.
        <br />
        500 Internal Server Error
      </div>
      <div className='app'>
        <SplineEmbed />
      </div>
      <style jsx>
        {`
        .title{
          font-family: 'JetBrains Mono', monospace;
          position:absolute;
          color:white;
          font-size:30px;
          margin-top:50px;
          padding-left:200px;
        }
        .app {
          margin-top: 70px;
          height:1000px;
        }
        `}
      </style>
    </>
  );
}
