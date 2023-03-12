import React from 'react'
import './pages.css'

import LoginForm from '../components/login-form'
import LoginHeader from '../components/login-header'

function Login() {
  return (
    <div>
      <div className="row">
        <LoginHeader />

        <div className="col-lg-8 vh-100 login-hero-container login-hero d-flex align-items-center">
          <div className='w-60 mx-auto'>
            <p>Welcome back to EmoWall</p>
            <h2 className='fw-bold'>Your Safe Space to Confess and Connect</h2>
            <p className='mb-5'>Welcome back to the anonymous confession site, EmoWall! We're here to listen and support you</p>

            <img src="https://th.bing.com/th/id/OIG.gnkV7CfXSykaXE8Hsy68?pcl=1b1a19&pid=ImgGn" className='img-fluid mb-5 mt-5'/>

            <p className='mt-5'>Follow us on Social Media</p>
          </div>
        </div>

        <div className="col-lg-4 vh-100">
          <div className='p-5 mt-5'>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login