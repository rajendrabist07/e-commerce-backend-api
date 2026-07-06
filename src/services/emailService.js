const transporter = require("../config/mail");

const isEmailConfigured = () => (
    process.env.DISABLE_EMAIL !== "true" &&
    process.env.MAIL_HOST &&
    process.env.MAIL_PORT &&
    process.env.MAIL_USER &&
    process.env.MAIL_PASS &&
    process.env.MAIL_FROM
);

const sendEmail = async (

    to,

    subject,

    html

) => {

    if (!isEmailConfigured()) {

        return {
            skipped: true,
            reason: "Email service is not configured",
        };

    }

    await transporter.sendMail({

        from: process.env.MAIL_FROM,

        to,

        subject,

        html,

    });

};

module.exports = {

    sendEmail,

};
