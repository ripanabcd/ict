const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path'); 

// Initialize the client, routing the session storage into the writable /tmp directory
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.join('/tmp', '.wwebjs_auth') 
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', 
            '--disable-gpu'
        ]
    }
});

// 1. Generate and print the QR Code inside your container logs
client.on('qr', (qr) => {
    console.log('--- COPY AND SCAN THE QR CODE BELOW ---');
    qrcode.generate(qr, { small: true });
});

// 2. Log confirmation when successfully authenticated
client.on('ready', () => {
    console.log('Success! Your Node.js WhatsApp client is ready.');
});

// 3. Simple message listener for text testing
client.on('message', async (msg) => {
    console.log(`Received message from ${msg.from}: ${msg.body}`);

    // Test command: Send '!ping', get '!pong' back
    if (msg.body.toLowerCase() === '!ping') {
        await msg.reply('!pong 🏓');
    }
});

// Start the client engine
client.initialize();
