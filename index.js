// 1. Required imports (Missing this caused your crash)
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 2. Initialize the client with container arguments
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', 
            '--disable-gpu'
        ],
        headless: true
    }
});

// 3. Generate QR Code in the container logs
client.on('qr', (qr) => {
    console.log('--- SCAN THE QR CODE BELOW ---');
    qrcode.generate(qr, { small: true });
});

// 4. Confirm connection
client.on('ready', () => {
    console.log('Success! Your Node.js WhatsApp client is ready.');
});

// 5. Basic listener for incoming messages
client.on('message', async (msg) => {
    console.log(`Received message from ${msg.from}: ${msg.body}`);

    if (msg.body.toLowerCase() === '!ping') {
        await msg.reply('!pong 🏓');
    }
});

// Start the client
client.initialize();

