const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res)=>{

    if(req.url !== '/'){
        return res.end();
    }
    //console.log('request is working', req.url);

    // downloading big file bad way
    function badWay(){
        const file = fs.readFileSync('plan.txt');  // this way file hold in memory 
        res.end(file)
    }
    //badWay();

    // downloding big file Good Way

    // nodejs has inbuild streaming
    function goodWay(){
        const readableStream = fs.createReadStream('plan.txt');

        // Pipe : if you have readble(request Obj) stream to writeable(response Obj) stream 
        readableStream.pipe(res);
    }
    //goodWay();

    //  --  Copy file one place to another place  --
    // copy big file bad way
    function copyFileBadWay(){
        const file = fs.readFileSync('plan.txt');
        fs.writeFileSync('output.txt',file);
        res.end();
    }
    //copyFileBadWay();

    // copy big file Good Way
    function copyFileGoodWay(){
        const readFile = fs.createReadStream('plan.txt');
        const writeFile = fs.createWriteStream('output.txt',readFile);

        // Here event Emmitter work
        readFile.on('data',(chunk)=>{
            console.log(chunk.toString());

            writeFile.write(chunk);
        });
    }
    copyFileGoodWay();

});

const PORT = process.env.PORT || 8000;
server.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})