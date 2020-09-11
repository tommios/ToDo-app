import config from "../config";

export default function (email, token) {
    return {
        to: email,
        from: config.sendgrid.emailFrom,
        subject: '[ToDo App] Please reset your password',
        html: `
            <p>Forgot your password?</p>
            <p>If not, please ignore this letter.</p>
            <br />
            <p>You can use the following link to reset your password:</p>
            <p><a href="${config.sendgrid.baseURL}/password/${token}">${config.sendgrid.baseURL}/password/${token}</a></p>
            <p>If you don’t use this link within 3 hours, it will expire. To get a new password reset link, visit <a href="${config.sendgrid.baseURL}/reset">${config.sendgrid.baseURL}/reset</a></p>
            <hr/>
            <h4>Go to <a href="${config.sendgrid.baseURL}">ToDo Application</a><h4>
            <br/>
            <p>Thanks,</p>
            <p>The ToDo App Team</p>
        `
    }
}