const sendemail = require("@sendgrid/mail")


sendemail.setApiKey(process.env.MAIL_GRIDE)

const swelcomeMail = (email,name)=>{
    sendemail.send({
        from:'mohand30466@yahoo.com',
        to:email,
        subject:"thanks for join us",
        text:`welcome to our site${name } and enjoy our term is set up to you`
    })

}

const sdeleteMail = (email,name)=>{
    sendemail.send({
        from:'mohand30466@gmail.com',
        to:"email",
        subject:"leiving site",
        text:`sorry to see you go${name } hope to see you soon`
    })

}
module.exports = {
    swelcomeMail,
    sdeleteMail
}


