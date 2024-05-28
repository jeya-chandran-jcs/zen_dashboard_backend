import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()
const Email=process.env.EMAIL
const Pass=process.env.PASS
let sendmail =async (receiver, text, html, subject) => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Email,
      pass: Pass,
    },
  });


  let mailOption = {
    
    to: receiver,
    subject: subject,
    text: text,
    html: html,
  };
  
  
  transport.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
   return error.message;

    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
};

// sendmail("tonyjeyatj@gmail.com","hello","<h1>hello</h1>","hello")

export default sendmail