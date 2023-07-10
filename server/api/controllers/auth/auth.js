const User = require("../../../models/user/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require("bcrypt");
const {generateOTP} = require("../../../Services/OTP");
const { sendMail } = require("../../../Services/Mail");

module.exports = {
    async signup (req,res){
        try{
            const {name , email , password }=req.body;
                const user = await User.findOne({email:email.toLowerCase()});
                if(user)
                return res.json({ message: "Email already registered" });

                const otp= generateOTP();

            const saveUser = new User({
                name,
                email:email.toLowerCase(),
                password: await bcrypt.hash(password,10),
                verificationToken:otp
            })
            await saveUser.save();
            const sendMailforOTP = await sendMail({
                to:email,
                OTP:otp
            })

            if(sendMailforOTP)
                return res.send({success:true , message:"OTP Sent Successfully"});
            else
                return res.status(500).send({error:"Server Error"});
        } catch(error){
            console.log(error);
            throw error;
        }
    },
    async verifyOTP (req,res ){
        try{
            const { email, otp } = req.body;
            const user = await User.findOne({ email, verificationToken: otp });
            if (!user) {
                return res.json({ message: "Invalid OTP Check Again" });
            }
            user.verificationToken = null; // Set verificationToken to null
            user.isVerified = true; // Set isVerified to true
            await user.save();

            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
            return res.json({ success: true, message: "Signup completed successfully", token });

        } catch(error){
            console.log(error);
            return res.status(500).json({ error: "Server Error" });
        }
    },
    async login (req,res){
        try{
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
            return res.json({ message: "Invalid email or password" });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.json({ message: "Invalid email or password" });
            }
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return res.json({ success: true, message: "Login successful", token });
        } catch(error) {
            console.log(error);
            return res.status(500).json({ error: "Server Error" });
        }
    }
}