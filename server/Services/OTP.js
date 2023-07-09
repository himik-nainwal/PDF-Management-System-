module.exports.generateOTP =() => {
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  const OTP = Math.floor(Math.random() * (max - min + 1)) + min;
  return OTP.toString(); // Convert to string if needed
};
