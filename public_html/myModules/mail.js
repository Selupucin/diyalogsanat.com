const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
let loader = new TwingLoaderFilesystem('./site');
let twing = new TwingEnvironment(loader);

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'mail.volkanmarin.com',
    port: 465,
    secure: false,
    auth: {
        user: 'info@volkanmarin.com',
        pass: 'eksioglu123'
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.send = (to, from, title, file, data) => {

    return twing.render(file, data).then(output => {
        var bilgiler = {
            from: "Volkan Marin" + from,
            to: to,
            subject: title,
            html: output
        }
        return transporter.sendMail(bilgiler)
    })

}

///// Örnek Mail Kullanım Methodu /////
// mail.send(req.body.store.email, "<info@etiketinyarisi.com>", req.body.store.storeName + " Mağaza Onayı", "mailing/mailing.html", { store: req.body.store }).then(() => {
//     res.send(req.body.store.email + " adresine mail gönderildi")
// }).catch(err => {
//     res.send(req.body.store.email + " adresine mail GÖNDERİLEMEDİ")
// })