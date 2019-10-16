import Web3 from '../node_modules/web3';
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

    let source = fs.readFileSync('./contracts/MedicalRecord.sol', 'UTF-8');
    let compiled = solc.compile(source);

    const output = solc.compile(source.toString(), 1)
    const abi = output.contracts[':MedicalRecord'].interface
    

   // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8081'));

    util.log('>>>>> setup - Completed !!!')

 web3.eth.defaultAccount = web3.eth.accounts[0];

 var medicalContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listMedicalRecords","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getMedicalRecord","outputs":[{"name":"","type":"bytes16"},{"name":"","type":"bytes16"},{"name":"","type":"bytes16"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"doctorFName","type":"bytes16"},{"name":"doctorLName","type":"bytes16"},{"name":"specialty","type":"bytes16"},{"name":"epicrisis","type":"bytes32"},{"name":"diagnosis","type":"bytes32"},{"name":"medication","type":"bytes32"},{"name":"medicalLeave","type":"bool"}],"name":"setMedicalRecord","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getOwned","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"doctorFName","type":"bytes16"},{"indexed":false,"name":"doctorLName","type":"bytes16"},{"indexed":false,"name":"specialty","type":"bytes16"},{"indexed":false,"name":"epicrisis","type":"bytes32"},{"indexed":false,"name":"diagnosis","type":"bytes32"},{"indexed":false,"name":"medication","type":"bytes32"},{"indexed":false,"name":"medicalLeave","type":"bool"}],"name":"medRecordEvent","type":"event"}]);
 var mRecord = medicalContract.at('0xe2b3fee6472a0df3e56c273255eb3a4821850743');
 console.log(mRecord);

 var recordEvent = mRecord.medRecordEvent();

        recordEvent.watch(function(error, result){
            if (!error)
                {
                    $("#insTrans").html('Block hash: ' +result.blockHash);   
                    $("#record").html(web3.toAscii(result.args.DoctorFirstName) + ' ' + web3.toAscii(result.args.DoctorLastName) );
                } else {
                   
                    console.log(error);
                }
        });

        $("#button").click(function() {
            mRecord.setMedicalRecord(web3.eth.defaultAccount, $("#DoctorFirstName").val(), $("#DoctorLastName").val(), $("#DoctorSpecialty").val(),
            $("#Epicrisis").val(), $("#Diagnosis").val(), $('#Medication').val(), $("#MedicalLeave").val(), (err, res) => {
                if (err) {
                    console.log('Input not good');
                    }
                    else{
                        console.log('Registered');
                    }
                });
        });