const fs = require('fs');
const EventEmitter = require('events');
const { Transform } = require('stream');

const path = './sourceContent.txt';
const copiedPath = './copiedContent.txt';
const modifiedPath = './transformModified.txt';

const eventEmitter = new EventEmitter();

const randomContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

fs.writeFile(path, randomContent, (err) => {
    if (err) throw err;
    console.log('File has been created and content written.');

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('File content:', data);

        eventEmitter.emit('fileRead', data);
    });
});

eventEmitter.on('fileRead', (data) => {
    console.log('File read successfully. Data:', data);

    const readStream = fs.createReadStream(path, 'utf8');
    const writeStream = fs.createWriteStream(copiedPath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Data has been successfully written to copiedContent.txt');

        const readStreamForTransform = fs.createReadStream(path, 'utf8'); 

        const modifyStream = new Transform({
            transform(chunk, encoding, callback) {
                const modifiedChunk = chunk.toString().replace(/\s/g, '-');
                this.push(modifiedChunk);
                callback();
            }
        });

        const modifiedWriteStream = fs.createWriteStream(modifiedPath);
        readStreamForTransform
            .pipe(modifyStream)
            .pipe(modifiedWriteStream);

        modifiedWriteStream.on('finish', () => {
            console.log('Content has been modified and written to transformModified.txt');
        });
    });
});
