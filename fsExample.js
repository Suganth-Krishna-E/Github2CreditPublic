const fs = require('fs');

let output = " Hello";

fs.readFile(__dirname+'/politics.txt', (err, data) => {
    if (err) {
      console.log("The following error occured \n" + err);
    }
    else {
      output += data.toString();
      console.log("The acquired data is: \n" + data.toString());
      writeData1();
    }
  });

const data1 = 'One Line';

function writeData1() {
  fs.writeFile(`${__dirname}/writenn1.txt`, output ,(err) => {
    if(err) {
      console.log(err);
    }
    else {
      console.log(output);
    }
  });  
}


