import React, { useState, useRef } from 'react'
import logo from "./assets/logo.png"
import dash from "./assets/dash.png"
import grid from "./assets/grid.png"

const OTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef([]);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < otp.length - 1 && value) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleInputPaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').slice(0, 4);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
      if (i < otp.length - 1) {
        otpInputs.current[i + 1].focus();
      }
    }
    setOtp(newOtp);
  };

  const submitData=(e)=>{
    e.preventDefault();
    console.log('OTP:', otp.join(''));
  }

  const removeData=(e)=>{
    e.preventDefault();
    setOtp(['', '', '', ''])
  }

  return (
    <div>
      <div className='container'>
        <div className='left-section'>
          <img src={logo} alt=""></img>

          <div className='verification'>Verification</div>

          <div className='sms-container'>
            <div className='sms'>SMS OTP</div>
            <div className='send-on'>Sent on: 77777-77777</div>
          </div>

          <form onSubmit={submitData}>
            <div className='otp-box'>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  min="0"
                  max="9"
                  value={value}
                  onChange={(event) => handleInputChange(index, event)}
                  onPaste={handleInputPaste}
                  ref={(e) => (otpInputs.current[index] = e)}
                />
              ))}
            </div>

            <div className='Re-enter'><span>Entered Wrong Details?</span><span className='delete' onClick={removeData}>Re-enter</span></div>

            <input type='submit' value="Verify" className='button' />
          </form>


          <div className='back'>Go back to Home</div>
        </div>

        <div className='right-section'>
          <img src={grid} alt="" className='grid'></img>
          <img src={dash} alt="" className='dash'></img>
        </div>
      </div>
    </div>
  )
}

export default OTP