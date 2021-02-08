import React from 'react';
import Style from './SimpleHeader.module.scss';
import LinkToHome from '../LinkToHome/LinkToHome.js';


const SimpleHeader = () => {
  return(
    <div>
      <h2 className={Style.top}>
        <LinkToHome/>
      </h2>
    </div>
  )
}

export default SimpleHeader
