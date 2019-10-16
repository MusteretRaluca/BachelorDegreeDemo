var medicalRecords=artifacts.require ("./MedicalRecord.sol/");
module.exports = function(deployer) {
      deployer.deploy(medicalRecords);
}