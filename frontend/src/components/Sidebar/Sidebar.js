import React from 'react'
import Style from './Sidebar.module.scss'

const Sidebar = (props) => {

  return(
      <div>
        <button className={Style.button} id='button1'>ホーム</button>
        <button className={Style.button} id='button2'> 急上昇 </button>
        <button className={Style.button} id='button3'> 人気 </button>
        <button className={Style.button} id='button4'> マイページ </button>
      </div>
  )
}

export default Sidebar;
