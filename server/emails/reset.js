import config from "../config";

export default function (email, token) {
    return {
        to: email,
        from: config.sendgrid.emailFrom,
        subject: 'Access recovery',
        html: `
            <h1>Forgot your password?</h1>
            <p>If not, please ignore this letter.</p> 
            <p>To restore access, click on the link below:</p>
            <p><a href="${config.sendgrid.baseURL}/auth/password/${token}">Restore access</a></p>
            <hr/>
            <h3>Go to <a href="${config.sendgrid.baseURL}">ToDo Application</a><h3>
        `
    }
}