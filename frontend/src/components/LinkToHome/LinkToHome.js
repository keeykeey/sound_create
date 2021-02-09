import Style from './LinkToHome.module.scss';
import {Link} from 'react-router-dom';

const LinkToHome = ()=>{
  return(
    <div>
      <Link to='/'>
        <button className={Style.linkToHome}>
          Sound_Create
        </button>
      </Link>
    </div>
  )
}

export default LinkToHome
