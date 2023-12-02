/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const nodemailer = require('nodemailer');

// Function to send complaint email
const sendComplaintEmail = (userEmail, userMessage) => {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email address
            pass: 'your-password' // Replace with your email password or app-specific password
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'your-email@gmail.com', // Replace with your email address
        to: 'nicholas.munene@strathmore.edu', // Replace with the recipient's email address
        subject: 'Helpdesk Complaint',
        text: `User's Email: ${userEmail}\n\nComplaint:\n${userMessage}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending complaint email:', error);
        } else {
            console.log('Complaint email sent:', info.response);
        }
    });
};

// Example usage
const userEmail = 'user@example.com'; // Replace with the user's email
const userMessage = 'This is a test complaint message.'; // Replace with the actual complaint message
sendComplaintEmail(userEmail, userMessage);


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
