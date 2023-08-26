// import e from "express";
import transport from "../../config/nodemailer.js";

const mail={

 signupmail:(name,email,otp)=>{
    transport.sendMail(
    {
        to:email,
        subject:"login",
        html:`<p>Welcome! ${name} this is your OTP ${otp}</p>`
    },
    (err,res)=>{
        if (err) console.log(err);
        else console.log(res,"abcddd");
    }
    );
 },
 
 loginmail:(name,email)=>{
    transport.sendMail(
    {
        to:email,
        subject:"login",
        html:`<p>Welcome! ${name} </p>`
    },
    (err,res)=>{
        if (err) console.log(err);
        else console.log(res,"abcddd");
    }
    );
 },

}
export default mail;