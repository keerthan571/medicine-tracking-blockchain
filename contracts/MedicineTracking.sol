// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract MedicineTracking {

```
 struct Medicine {
     string id;
     string name;
     string manufacturer;
 }

 struct Status {
     string status;
     string location;
     uint timestamp;
 }

 mapping(string => Medicine) public medicines;
 mapping(string => Status[]) public history;

 function addMedicine(string memory _id, string memory _name, string memory _manufacturer) public {
     medicines[_id] = Medicine(_id, _name, _manufacturer);
 }

 function updateStatus(string memory _id, string memory _status, string memory _location) public {
     history[_id].push(Status(_status, _location, block.timestamp));
 }

 function getHistory(string memory _id) public view returns (Status[] memory) {
     return history[_id];
 }
```

}
