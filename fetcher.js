const request = require('request');
const fs = require('fs');
const readline = require('readline');

const URL = process.argv[2];
const filePath = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.exists(filePath, (exists) => {
  if (exists){
    rl.question(`file at ${filePath} already exists. Overwrite? (Y/N)`, (answer) => {
      if(answer === 'Y' || answer === 'y')
        fetcher(URL, filePath);
      else
        process.exit();
    });
  }
  else{
    fetcher(URL,filePath);
  }
});

const fetcher = function(url, filepath){
  request(url, (err, response, body) => {
    if(err){
      console.log(`URL error, exiting program`);
      process.exit();
    }
    fs.writeFile(filepath, body, (err) => {
      if(err){
        console.log('bad filepath');
        process.exit();
      }
      console.log(`Downloaded and saved ${fs.statSync(filepath).size} bytes to ${filepath}`);
      rl.close();
    });
  });
}