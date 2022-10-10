const {Readable, Writable} = require('stream');



const readableStream = new Readable({
    highWaterMark : 2,   // buffer size || size in KB
    read(){}
});

readableStream.on('data',(chunk)=>{
    console.log(chunk);
    // for writeAble Stream  what ever data we read move to writeable stream
    writeAbleStream.write(chunk)
});

console.log(readableStream.push('Hello i am Ajay')); // if we crros our highwaterMark then he return false nhi to true

// Writeable Stream

const writeAbleStream = new Writable({
    write(s){
        console.log('writting ',s );
    }
});

