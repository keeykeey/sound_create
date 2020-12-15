import React from 'react';
import SimpleHeader from '../components/Header/SimpleHeader'
import RegisterControl from '../components/Register/RegisterControl'
import Footer from '../components/Footer/Footer'


const Register = () => {
    return(
      <div>
        <div>
          <SimpleHeader/>
        </div>
        <div>
　　       <RegisterControl/>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    )
}

export default Register
