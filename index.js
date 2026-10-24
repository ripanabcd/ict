const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Essential flags to allow Chromium to run inside a headless server container
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
