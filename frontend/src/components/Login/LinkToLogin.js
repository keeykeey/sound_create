import Style from './LinkToLogin.module.scss';
import {Link} from 'react-router-dom';

const LinkToLogin = ()=>{
  return(
    <div>
      <Link to='/login'>
        <button className={Style.linkToLoginPage}>
          Login
        </button>
      </Link>
    </div>
  )
}

export default LinkToLogin
