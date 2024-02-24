const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrGenL = require('qr-image');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://suganthkrishnae21aim:Suganth_7575@cluster0.naoabt7.mongodb.net/WhatsappMessageSender?retryWrites=true&w=majority";

let client,store;
let statusConnection = 'Not Connected';

mongoose.connect(MONGODB_URI).then(() => {
    store = new MongoStore({ mongoose: mongoose });
    console.log("Mongo DB Connected");    
});

app.get('/connect/:id',(req, res) =>{
    console.log("Connect Request Recieved");
    const clientId = req.params.id;
    client = new Client({
        puppeteer: {
            headless: false,
        },
        authStrategy: new RemoteAuth({
            store: store,
            clientId: clientId,
            backupSyncIntervalMs: 300000
        })
    });  
    

    client.on('qr', (qr) => {
        console.log("QR is being generated");
        let code = qrGenL.image(qr, { type: 'svg' });
        res.type('svg');
        code.pipe(res);
        console.log("QR sent to client web page");

        //const qrTemp = qrcode.generate(qr, { small: true });
    });

    client.on("remote_session_saved", () => {
        console.log("Remote Session saved in DB");
    })

    client.on('ready', () => {
        statusConnection = 'Connected';
        console.log("Client Connected Start sending messages");
    });

    client.initialize();

    client.on('error', (err) => {
        statusConnection = err;
        res.send("error"+err);
    });
})


app.use(express.json());

app.listen(port, () => {
    console.log( `Whatsapp connect app listening on port ${port} `);
})