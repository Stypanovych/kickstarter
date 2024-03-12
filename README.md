## Kickstarter with Solidity and Next.js
This is a sample project that makes use of Solidity-built Smart Contracts on top of the Ethereum blockchain and React Next.js. Users can create campaigns, donate ether, submit requests to withdraw money (for example, to purchase batteries for the kickstarter project), have their requests approved, and have their requests finalized once a sufficient number of users have approved them.

The smart contracts are in a package in the ethereum folder.json using the subsequent scripts:

npm install
npm run test
node compile.js
node deploy.js

Update ethereum/deploy.js and ethereum/web3.js files. Set your mnemonics and network. (You can set it as environment object as it's better approach).

After the deployment update file factory.js and add your smart contract address.
