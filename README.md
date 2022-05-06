# Basic DApp - React + Hardhat

Basic DApp using Hardhat ethereum development enviroment and frontend React app.

To run this project on a ethereum testnet like Ropsten you need and URL and an account of that testnet.

Example (with Ropsten):

```
https://ropsten.infura.io/v3/<your-project-id>
```

```
0x<your-account-private-key>
```

Then with this credentials you need to place them in the `hardhat.config.js` file like this:

```
module.exports = {
  ...
  networks: {
    ...
    ropsten: {
      url: '<YOUR_ROPSTEN_URL>',
      accounts: [`<YOUR_ROPSTEN_ACCOUNT_1>`],
    },
  },
};
```

Locally you can also run `npx hardhat node`

To deploy a contract firstable you need to compile solidity code with:

```
npx hardhat compile
```

Then, you can deploy the contract on the Ropsten or localhost network:

```
npx hardhat run scripts/deploy.js -- network localhost
```

or

```
npx hardhat run scripts/deploy.js -- network ropsten
```
