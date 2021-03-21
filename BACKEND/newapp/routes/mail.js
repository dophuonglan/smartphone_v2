const mailer = require("nodemailer");
const { Hello } = require("./hello_template");
const { Thanks } = require("./thanks_template");

const getEmailData = (to, name, template) => {
    let data = null;

    switch (template) {
        case "hello":
            data = {
                from: "shopsmartphone1999",
                to,
                subject: `Hello ${name}`,
                html: Hello()
            }
            break;

        case "thanks":
            data = {
                from: "shopsmartphone1999",
                to,
                subject: `Hello ${name}`,
                html: Thanks()
            }
            break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, type) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "shopsmartphone1999",
            pass: "phuonglan@2019"
        }
    })

    const mail = getEmailData(to, name, type)

    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log( "email sent successfully")
        }
        smtpTransport.close();
    })


}

module.exports = { sendEmail }
// const nodemailer = require('nodemailer'); 
  
  
// let mailTransporter = nodemailer.createTransport({ 
//     service: 'Gmail', 
//     auth: { 
//         user: 'shopsmartphone1999', 
//         pass: 'phuonglan@2019'
//     } 
// }); 

// let mailDetails = { 
//     from: 'shopsmartphone1999', 
//     to: 'dophuonglan0299@gmail.com', 
//     subject: 'Test mail', 
//     text: 'Node.js testing mail for GeeksforGeeks'
// }; 
  
// mailTransporter.sendMail(mailDetails, function(err, data) { 
//     if(err) { 
//         console.log(err); 
//     } else { 
//         console.log('Email sent successfully'); 
//     } 
// }); 