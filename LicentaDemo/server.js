/*var http = require ('http');
const path = require('path');
var Web3 = require('web3');
var fs = require('fs');
var fs2 = require('fs')
var solc = require('solc');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let input = fs2.readFileSync('./contracts/MedicalRecord.sol', 'utf8');
let output = JSON.parse(solc.compile(JSON.stringify(input)));

if(output.errors) {
    output.errors.forEach(err => {
        console.log(err.formattedMessage);
    });
} else {
    const contracts = output.contracts["MedicalRecord.sol"];
    for (let contractName in contracts) {
        const contract = contracts[contractName];
        fs.writeFileSync(path.resolve(buildPath, `MedicalRecord.json`), JSON.stringify(contract.abi, null, 2), 'utf8');
    }
}
const compiled_contract = require('../contracts/MedicalRecord.sol');
let abi = compiled_contract.contracts['UsersContract.sol']['UsersContract'].abi;
let MyContract = new web3.eth.Contract(abi)
 web3.eth.defaultAccount = web3.eth.accounts[0];

var medicalContract = MyContract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listMedicalRecords","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getMedicalRecord","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"bytes16"},{"name":"","type":"bytes16"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"doctorFName","type":"bytes16"},{"name":"doctorLName","type":"bytes16"},{"name":"specialty","type":"bytes16"},{"name":"epicrisis","type":"bytes32"},{"name":"diagnosis","type":"bytes32"},{"name":"medication","type":"bytes32"},{"name":"medicalLeave","type":"bool"}],"name":"setMedicalRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getOwned","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"doctorFName","type":"bytes16"},{"indexed":false,"name":"doctorLName","type":"bytes16"},{"indexed":false,"name":"specialty","type":"bytes16"},{"indexed":false,"name":"epicrisis","type":"bytes32"},{"indexed":false,"name":"diagnosis","type":"bytes32"},{"indexed":false,"name":"medication","type":"bytes32"},{"indexed":false,"name":"medicalLeave","type":"bool"}],"name":"medRecordEvent","type":"event"}]);
var mRecord = medicalContract.at('0xe2b3fee6472a0df3e56c273255eb3a4821850743');
console.log(mRecord);

http.createServer(function(req, res){
    fs.readFile('index.html', function(err,data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
    });

*/
 var fs = require('fs');
var bodyparser = require('body-parser');
var http = require ('http')
var solc = require('solc');
var util = require('util');
var express = require('express');


var app = express();
app.use(express.static('app'));
app.use(express.static('build/contracts'));
app.use(bodyparser.json());
const PORT = 3000;
app.get('/', (req, res) => {
    res.sendFile(`index.html`);
 });

  app.get('*', (req, res) => {
    res.status(404);
    res.send('Ooops... this URL does not exist');
  });

app.use(function(req, res, next) {
    util.log(`Request => url: ${req.url}, method: ${req.method}`);
    next();
});
app.listen(PORT, () => {
  console.log(`ETB Ethereum ToDo List App running on port ${PORT}...`);
});

