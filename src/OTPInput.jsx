import React, { useState, useRef } from 'react';
import './OTPInput.css'; // Import your CSS file for styling

const OTPInput = ({ length = 6 }) => {
  const [otp, setOTP] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric digits

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to the next input box
    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, value) => {
    if (value !== '' || index === 0) return;

    const newOTP = [...otp];
    newOTP[index - 1] = '';
    setOTP(newOTP);

    // Move focus to the previous input box
    inputRefs.current[index - 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, length);
    const newOTP = [...otp];

    for (let i = 0; i < pasteData.length; i++) {
      newOTP[i] = pasteData[i];
    }

    setOTP(newOTP);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP); // Display OTP in console

    // You can perform additional actions here, such as submitting the OTP to a server
    // or showing an alert to the user.
  };

  return (
    <form className="otp-input-form" onSubmit={handleSubmit}>
      <div className="otp-input-container">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(index, otp[index])}
            onPaste={handlePaste}
            ref={(input) => (inputRefs.current[index] = input)}
          />
        ))}
      </div>
      <button type="submit" disabled={otp.some((digit) => !digit)}>
        Submit
      </button>
    </form>
  );
};

export default OTPInput;
