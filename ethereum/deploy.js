const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interfaces } = require('mocha');
const compiledFactory = require('./build/CampaignFactory.json');

const { abi, evm } = compiledFactory;

const provider = new HDWalletProvider(
    '', // add mnemonics
    '', // set network
);

const web3 = new Web3(provider);
const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from accounts');
        const result = await new web3.eth.Contract(abi)
            .deploy({
                data: evm.bytecode.object
            })
            .send({ gas: '10000000', from: accounts[0] });

        console.log('Contract deployed to', result.options.address);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
};
deploy().catch(error => {
    console.error('Unhandled promise rejection:', error);
});
