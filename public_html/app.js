const express = require('express')

const app = express()

const port = 3030

const session = require("express-session")

const elastic = require("./myModules/elastic")

const ping = require('ping')

const fs = require("fs")

const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');

let loader = new TwingLoaderFilesystem('./site');

let twing = new TwingEnvironment(loader);

const request = require('axios')

const db = require('./myModules/mongodb');

const mobilMi = require("./myModules/ismobile")

const md5 = require("./myModules/md5")

const mail = require("./myModules/mail")

const bodyParser = require('body-parser');

const sizeOf = require('object-sizeof');

const nodemailer = require('nodemailer');

app.use("/urun/assets/", express.static(__dirname + '/assets/'))
app.use("/kategori/assets/", express.static(__dirname + '/assets/'))

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true

}))

let transporter = nodemailer.createTransport({
    host: 'webmail.toplucekilis.com',
    port: 465,
    secure: true,
    auth: {
        user: 'destek@toplucekilis.com',
        pass: 'Nikolatesla72'
    },
    tls: {
        rejectUnauthorized: false
    }
});

setTimeout(() => {
    db.write({}, "main").than(q => {
        if (q.insertedCount > 0) {
            console.log("yes")
        } else {
            console.log("no")
        }
    })
}, 2000);

app.listen(port, () => console.log("Sistem Başlatıldı"))