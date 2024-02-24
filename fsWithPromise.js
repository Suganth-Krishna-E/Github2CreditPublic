const fs = require('fs');

function readFile(fname) {
    return new Promise(
        function(resolve, reject) {
            fs.readFile(fname, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.toString());
                }
            });        
        }
    )
}

function writeFile(fname,data) {
    return new Promise(
        function(resolve, reject) {
            fs.writeFile(fname, data, (err) => {
                if (err) {
                    reject(err);
                }
                else{
                    resolve("Done writing");
                }
            });        
        }
    )
}


let writeData = new Promise( function(){});

let readData = readFile(`${ __dirname }/politics.txt`);

readData.then( (value) =>
    {
        console.log("Read File Sucessful, The data is: \n" + value);
        writeData = writeFile(`${ __dirname }/writenn123.txt`,value);
    }
)
readData.catch( (err) => 
    {
        console.log("Read File unucessful, The error is: " + error);
    }
)

writeData.then( (value) =>
    {
        console.log("Write File Sucessful, The data is: \n" + value);
    }
)
writeData.catch( (err) =>
    {
        console.log("Write File unucessful, The error is: \n" + error);
    }
)

