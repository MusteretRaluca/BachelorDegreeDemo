pragma solidity >=0.4.25;
contract Owned{
    
     address owner;
    
    function getOwned() public {
        owner = msg.sender;
    }
    
   modifier onlyOwner {
       require(msg.sender == owner);
       _;
   }
}

contract MedicalRecord is Owned{
    
    struct medRecord{
        bytes16 doctorFName;
        bytes16 doctorLName;
        bytes16 specialty;
        bytes32 epicrisis;
        bytes32 diagnosis;
        bytes32 medication;
        bool medicalLeave;
    }
    
    mapping(address => medRecord) medicalRecords;
    address[] public listMedicalRecords;
    
    event medRecordEvent(
        bytes16 doctorFName,
        bytes16 doctorLName,
        bytes16 specialty,
        bytes32 epicrisis,
        bytes32 diagnosis,
        bytes32 medication,
        bool medicalLeave
    );
    
    function setMedicalRecord(address _address, bytes16 doctorFName,bytes16 doctorLName,bytes16 specialty, bytes32 epicrisis, bytes32 diagnosis, bytes32 medication,bool medicalLeave) onlyOwner public{
        
        
        medicalRecords[_address].doctorFName = doctorFName;
        medicalRecords[_address].doctorLName = doctorLName;
        medicalRecords[_address].specialty= specialty;
        medicalRecords[_address].epicrisis = epicrisis;
        medicalRecords[_address].diagnosis = diagnosis;
        medicalRecords[_address].medication = medication;
        medicalRecords[_address].medicalLeave = medicalLeave;
        
        listMedicalRecords.push (_address) -1;
        emit medRecordEvent(doctorFName, doctorLName, specialty, epicrisis, diagnosis, medication, medicalLeave);}
        
        function getMedicalRecord (address _address) view public returns (bytes16, bytes16, bytes16, bytes32, bytes32, bytes32, bool){
            return(medicalRecords[_address].doctorFName, medicalRecords[_address].doctorLName, medicalRecords[_address].specialty, medicalRecords[_address].epicrisis,
            medicalRecords[_address].diagnosis, medicalRecords[_address].medication, medicalRecords[_address].medicalLeave);
            
        }
        
    }
    
