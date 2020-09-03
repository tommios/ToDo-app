import config from "../config";

export default function (email) {

    return {
        to: email,
        from: config.sendgrid.emailFrom,
        subject: 'Account created',
        html: `
            <h1>Welcome!</h1>
            <p>You have successfully created an account with an email - ${email}</p> 
            <hr/>
            <h3>Go to <a href="${config.sendgrid.baseURL}">ToDo Application</a><h3>
        `
    }
}