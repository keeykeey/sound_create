import Style from './LinkToRegister.module.scss'
import {Link} from 'react-router-dom';

const LinkToRegister = () =>{
  return(
    <div>
    <Link to ='/register'>
      <button className={Style.linkToRegisterPage}>
        Register
      </button>
    </Link>
    </div>
  )
}

export default LinkToRegister
