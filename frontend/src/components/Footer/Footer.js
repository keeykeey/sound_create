import React from 'react'
import Style from './Footer.module.scss'

const Footer = () => {
  return(
    <div className = {Style.background}>
      <div className={Style.row_directed_display}>
        <p className={Style.text_inside}><a href='/#/terms'> 利用規約</a></p>
      </div>
    </div>
  )
}

export default Footer
