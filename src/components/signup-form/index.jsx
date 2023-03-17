import React, { Component, useState } from 'react';
import './signup-form.css';
import app from '../../firebase_config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { Link } from "react-router-dom";

const auth = getAuth(app);
export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state={
      fname: "",
      lname: "",
      phone: "",
      password: "",
      cpassword: "",
      verifyButton: false,
      verifyOtp: false,
      otp: "",
      verified: false,
      userType: "",
      secretKey: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this)
    this.verifyCode = this.verifyCode.bind(this);
  }

  setUserType = (userType) => {
    this.setState({ userType });
  }

  setSecretKey = (secretKey) => {
    this.setState({ secretKey });
  }


  onCaptchaVerify(){
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        this.onSignInSubmit();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    }, auth);
  }
  // verifyOtp
  onSignInSubmit(){
    this.onCaptchaVerify()
    const phoneNumber = "+63" + this.state.phone;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("otp sended")
      this.setState({ verifyOtp: true })
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }

  verifyCode(){
    window.confirmationResult.confirm(this.state.otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      alert("Veification success")
      this.setState( {
        verified: true,
        verifyOtp: false

      })
    }).catch((error) => {
      alert("Invalid Otp")
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  changeMobile(e) {
    this.setState({ phone: e.target.value }, () => {
      if (this.state.phone.length === 10) {
        this.setState({
          verifyButton: true,
        });
      }
    });
  }

  handleSubmit(e) {
    if(this.state.userType === "Admin" && this.state.secretKey !== "loveujai"){
      e.preventDefault();
      alert("Invalid Admin")
    }else {
      e.preventDefault();
      
      if(this.state.verified){
        const{ fname, lname, phone, password, cpassword } = this.state;
        console.log(fname, lname, phone, password, cpassword)

        fetch("http://localhost:5000/register",{
          method: "POST",
          crossDomain: true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body:JSON.stringify({
            fname,
            lname,
            phone,
            password,
            cpassword,
            userType: this.state.userType
          }),
        }).then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister")
          })
        } else{
          alert("Please Verify Mobile")
        }
    }
  }
  
  render() {
    return (
      <>
        <div className="form-container">
          <h2>LOGO</h2>
          <form onSubmit={this.handleSubmit}>

            <div id="recaptcha-container"></div>

            <div>
              <input type="radio" name='UserType' value="User" onChange={(e) => this.setUserType(e.target.value )}/>User

              <input type="radio" name='UserType' value="Admin" onChange={(e) => this.setUserType(e.target.value )}/>Admin
            </div>

            {this.state.userType == "Admin" ? (
            <div>
              <label>SECRET KEY</label>
              <br />
              <input type="text" onChange={(e) => this.setSecretKey(e.target.value )} className="w-100"/>
            </div>
            ) : null}
            
            <div className="d-flex gap-4 mt-3 mb-4">
              <div>
                <label>FIRSTNAME</label>
                <br />
                <input type="text" onChange={(e) => this.setState({ fname: e.target.value })}/>
              </div>
              <div>
                <label>LASTNAME</label>
                <br />
                <input type="text" onChange={(e) => this.setState({ lname: e.target.value })}/>
              </div>
            </div>

            <label>PHONE NUMBER</label> <br />
            <input type="number" className="mb-4 phone-number" onChange={(e) => this.changeMobile(e)}/>
            {this.state.verifyButton ? <input type="button" value={this.state.verified ? "Verified" : "Verify"} onClick={this.onSignInSubmit} className='verify-btn'/> : null}
            

            {this.state.verifyOtp ? 
            <div> 
              <label>OTP</label> <br />
              <input type="text" className="mb-4 phone-number" onChange={(e) => this.setState({ otp: e.target.value })}/>
              <input type="button" value="OTP" onClick={this.verifyCode} className='verify-btn'/>
            </div> : null }


            <div className="d-flex gap-4">
              <div>
                <label>PASSWORD</label>
                <br />
                <input type="password" onChange={(e) => this.setState({ password: e.target.value })}/>
              </div>
              <div>
                <label>CONFIRM PASSWORD</label>
                <br />
                <input type="password" onChange={(e) => this.setState({ cpassword: e.target.value })}/>
              </div>
            </div>

            <label className="d-flex mt-2">
              <input type="checkbox" name="terms-and-conditions" value="1" />
              <p className="ms-2 my-auto">
                I AGREE TO THE <a href="#">TERMS AND CONDITIONS</a>
              </p>
            </label>

            <input type="submit" value="SIGN-UP" className="px-5 mt-3" />
            <p className='mt-3'>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div> 
      </>
    );
  }
}
