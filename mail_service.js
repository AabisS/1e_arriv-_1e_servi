var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'user@gmail.com',
    pass: '*******'
  }
});

var mailOptions = {
  from: 'user@gmail.com',
  to: 'test@gmail.com',
  subject: 'Erreur detecte!',
  text: 'Un changement a ete detecte sur le site!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});