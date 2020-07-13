const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const config = require('../config');

const GmailTransport = nodemailer.createTransport({
  service: config.gmailServiceName,
  host: config.gmailServiceHost,
  secure: config.gmailServiceSecure,
  port: config.gmailServicePort,
  auth: {
    user: config.gmailUsername,
    pass: config.gmailUserPassword,
  },
});

GmailTransport.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: 'views/emails/',
    defaultLayout: '',
    partialsDir: 'views/emails',
  },
  viewPath: 'views/emails',
  extName: '.hbs',
}));

module.exports = GmailTransport;
