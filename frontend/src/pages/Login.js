import React from 'react'
import LoginControl from '../components/Login/LoginControl'
import SimpleHeader from '../components/Header/SimpleHeader'
import Footer from '../components/Footer/Footer'
//import Layout from '../components/Layout/Layout'

const Login = () =>{
    return(
      <div>
        <div>
          <SimpleHeader/>
        </div>
        <div>
          <LoginControl/>
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    )
}

export default Login
