const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master-process körs: ${process.pid}`);

    // Starta en worker-process för varje CPU-kärna
    for (let i = 0; i < 1; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker-process ${worker.process.pid} avslutades`);
    });
} else {
    const clusterInfo = cluster.worker.process.pid;
    http.createServer(async (req, res) => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        res.writeHead(200);
        res.end(`Server svarar!: ${clusterInfo}`);
    }).listen(8000);
    console.log(`Worker-process körs: ${process.pid}`);
}
