// server.js or app.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thivakarsharma2004@gmail.com',
        pass: 'Dharani@2005@'
    }
});

// Route to send SMS
app.post('/send-sms', async (req, res) => {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
        return res.status(400).send('Phone number and message are required');
    }

    try {
        // Create an email message
        const mailOptions = {
            from: '',
            to: `${phoneNumber}@txt.att.net`, // Example for AT&T, change based on carrier
            subject: '',
            text: message
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('SMS sent successfully');
    } catch (error) {
        res.status(500).send('Error sending SMS');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
