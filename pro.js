const fs = require('fs');

const writeStream = fs.createWriteStream('log.txt');

process.stdin.pipe(writeStream);

