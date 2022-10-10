const http = require('http');
const fs = require('fs');
const { Transform, pipeline } = require('stream');

const server = http.createServer((req, res)=>{
    if(req.url !== '/'){
        return res.end();
    }
    // Start Processing

    const readStream = fs.createReadStream('plan.txt');
    const writeStream = fs.createWriteStream('output.txt');
    // 1st Way
    function processing(){
        readStream.on('data', (chunk)=>{
            console.log('chunk '+chunk);
    
            // process  | whatever chunk i get convert string lowwer to upper
    
            const upperString = chunk.toString().toUpperCase();
    
            // pass in writAble stream
            writeStream.write(upperString);
        });
    }
    //processing();

    // Transform data processing - require from 'stream'
    function transFrom(){
        // convert string in upper case
        const replaceWordProcessing = new Transform({
            transform(chunk, encoding, callback){
                //replaceWordProcessing.emit('error', new Error('something went wrong'));  // to check error is work or not in pipeline
                const finalString = chunk.toString().replaceAll(/ajay/gi,'RAM');

                callback(null, finalString);
            }
        });
        // replace some words
        const toUpperWordProcessing = new Transform({
            transform(chunk, encoding, callback){

                const finalString = chunk.toString().toUpperCase();

                callback(null, finalString);
            }
        });
        // read whatEver get then tronform prcoess piping one process complete then move to another process at the end write

        // readStream
        // .pipe(replaceWordProcessing)
        // .on('error',(err)=>console.log("Error ",err))
        // .pipe(toUpperWordProcessing)
        // .on('error',(err)=>console.log("Error ",err))
        // .pipe(writeStream);
        
        // here problem is if we get any error then apply mutiple error check
        // instend of this we can use pipeline inbuild stream method
        pipeline(
            readStream,
            replaceWordProcessing,
            toUpperWordProcessing,
            writeStream,
            (err)=>{
                if(err){
                    console.log('Error ',err);
                }
            }
        );
    }
    transFrom();

    res.end();
})

const PORT = process.env.PORT || 8000;
server.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})