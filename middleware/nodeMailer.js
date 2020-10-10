nodemailer = require("nodemailer");
config = require('../config/config');
module.exports = {

    sendMail(to, url) {
        var transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: config.email,
                pass: config.pass
            }
        });
        var mailOptions = {
            from: "Ecommerce ✔ <fundoo017@gmail.com>", // sender address
            to: to, // list of receivers
            subject: "Reset Your Password ", // Subject line
            text: "", // plaintext body
            html: "<h4>We received a request to reset the password for your Ecommerce account.</h4></br>\
               <h5>EmailId:<p>"+ to + "</p></h5> </br>\
               <p>click below link to generate a new password.</p>  </br>\
               \n \n  "+ url + "</br></br> <h5>Warm Regards</h5> </br><p>Team Ecommerce</p>"
        }

        transport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response);
            }
            transport.close(); // shut down the connection pool, no more messages
        });
    }
}