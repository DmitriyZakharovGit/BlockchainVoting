const ejs = require('ejs');
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mailexpit@gmail.com',
        pass: '735249Az'
    }
});

const mailOptions = (data, email) => ({
        from: 'mailexpit@gmail.com',
        to: email,
        subject: 'Приглашение на участие в электронных выборах!',
        html: data
    });

let sendMessage = (voters, query) => {
    voters.forEach((voter) => {
        let emailInfo = {
            email: voter.email,
            uuid: voter.uuid,
            title: query.title,
            info: query.info,
            dtStart: query.dtStart,
            dtEnd: query.dtEnd
        };

        ejs.renderFile(__dirname + '/invitation_template.ejs', {
            title: emailInfo.title,
            info: emailInfo.info,
            dtStart: emailInfo.dtStart,
            dtEnd: emailInfo.dtEnd,
            link: `https://localhost:2018/vote/${emailInfo.uuid}`
        }, (err, data) => {
            transporter.sendMail(mailOptions(data, emailInfo.email))
        })
    });

};

module.exports = { sendMessage };