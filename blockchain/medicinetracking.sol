// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedicineTracking {

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

    string[] public medicineIds;

    // ➕ ADD MEDICINE
    function addMedicine(
        string memory _id,
        string memory _name,
        string memory _manufacturer
    ) public {
        medicines[_id] = Medicine(_id, _name, _manufacturer);
        medicineIds.push(_id);
    }

    // 🔄 UPDATE STATUS
    function updateStatus(
        string memory _id,
        string memory _status,
        string memory _location
    ) public {
        history[_id].push(
            Status(_status, _location, block.timestamp)
        );
    }

    // 📜 GET HISTORY
    function getHistory(string memory _id)
        public
        view
        returns (Status[] memory)
    {
        return history[_id];
    }

    // 📦 GET ALL MEDICINE IDS
    function getAllMedicineIds()
        public
        view
        returns (string[] memory)
    {
        return medicineIds;
    }

    // ❌ DELETE MEDICINE
    function deleteMedicine(string memory _id) public {
        delete medicines[_id];
        delete history[_id];

        for (uint i = 0; i < medicineIds.length; i++) {
            if (
                keccak256(bytes(medicineIds[i])) ==
                keccak256(bytes(_id))
            ) {
                medicineIds[i] = medicineIds[medicineIds.length - 1];
                medicineIds.pop();
                break;
            }
        }
    }
}
