import nodemailer from 'nodemailer';

export const sendMail = async (name: string, email: string[], password: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    
    const mailOptions = {
      from: process.env.EMAIL, 
      to: email.join(', '), 
      subject: "Registration Complete - Addictive Media", 
      text: `Thank your for creating your account. Your Name: ${name}, Email: ${email}, Password: ${password}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
