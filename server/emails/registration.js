import config from "../config";

export default function (email, hash) {

    return {
        to: email,
        from: config.sendgrid.emailFrom,
        subject: 'Account created',
        html: `
            <h1>Welcome!</h1>
            <p>You have successfully created an account with an email - ${email}</p>
            <p>To complete registration follow the link 
                <b><a href="${config.sendgrid.baseURL}/verify/${hash}">${config.sendgrid.baseURL}/verify/${hash}</a></b>
            </p> 
            <hr/>
            <p>Go to <a href="${config.sendgrid.baseURL}">ToDo Application</a><p>
        `
    }
}