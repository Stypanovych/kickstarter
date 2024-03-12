const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, `build`);
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['evm.bytecode', 'abi']
            }
        }
    }
};

const compiled = solc.compile(JSON.stringify(input));
const obj = JSON.parse(compiled);

fs.ensureDirSync(buildPath);

const fileJson = obj.contracts['Campaign.sol'];
const contracts = Object.keys(fileJson);
for (let i = 0; i < contracts.length; i++) {
    const contract = contracts[i];
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        fileJson[contract]
    );
}