const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 465,
    // secure: true, // Use `true` for port 465, `false` for all other ports
    service: 'gmail',
    auth: {
        user: "dinhxuanlocct@gmail.com",
        pass: "tnhn affz uksz hrxg",
    },
});

const sendEmail = async (data) => {
    try {
        const { email, name, subject } = data
        const infor = {
            from: '"Maddison Foo Koch 👻" <dinhxuanlocct@gmail.com>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line\\
            html: `<h2>Hello ${name}</h2>`, // html body
        }
        await transporter.sendMail(infor)
    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = {sendEmail}