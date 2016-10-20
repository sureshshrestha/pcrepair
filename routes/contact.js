var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'username@gmail.com',
            password: 'password'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // var transporter = nodemailer.createTransport('smtps://username%40gmail.com:password@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Hero man <hero@hero.com>', // sender address
        to: 'surestha479@yahoo.com', // list of receivers
        subject: 'Website submission', // Subject line
        text: 'Hello world ' + req.body.name, // plaintext body
        html: '<b>Hello world</b> name:' + req.body.name // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
            res.redirect('/');
        }
        console.log('Message sent: ' + info.response);
        res.redirect('/');

    });

});

module.exports = router;
