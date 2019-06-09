class ContractData{
    getAddress(){
        return "0xe717de339c9520be8ea82c6b997d96cd1cd0faa9";
    }
    getRecommendedProvider(){
        return "http";
    }
    getAbi(){
        return [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            },
            {
                "name": "_tag",
                "type": "bytes32"
            }
        ],
        "name": "addApostille",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "getApostille",
        "outputs": [
            {
                "components": [
                    {
                        "name": "tag",
                        "type": "bytes32"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getApostillesOfUser",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_hash",
                "type": "bytes32"
            },
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "verify",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
    }   
}

module.exports = ContractData;