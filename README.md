# circle usdc

## Contract links

https://github.com/circlefin/stablecoin-evm/tree/v2.2.0/contracts

## Setup

### Development Environment

Requirements:

- Node 16.14.0
- Yarn 1.22.21

```sh
$ git clone git@github.com:bitlayer-org/circle-usdc.git
$ cd circle-usdc
$ nvm use
$ npm i -g yarn@1.22.21 # Install yarn if you don't already have it
$ yarn install          # Install npm packages
```

## Development

### Compile contracts

```sh
$ yarn compile
```

### Formatting

```sh
$ yarn fmt
```

### Testing

Run all tests:

```sh
$ yarn test
```

To run tests in a specific file, run:

```sh
$ yarn test [path/to/file]
```

### Deploy

1. Create a copy of the file `.env.example`, and name it `.env`. Fill in
   appropriate values in the `.env` file. This file must not be checked into the
   repository. 

```sh
cp .env.example .env
```

2. Update .env file key 

* `DEPLOYER_PRIVATE_KEY` deloyer private key
* `NEW_PROXY_ADMIN` proxy contract admin, default is deployer
* `TOKEN_NAME` USD Coin
* `TOKEN_SYMBOL` USDC
* `TOKEN_CURRENCY` USD
* `TOKEN_DECIMALS` token decimal
* `NEW_MASTER_MINTER` manager minter role and minter mint amount
* `NEW_PAUSER` manager project pause or unpause
* `NEW_BLACK_LISTER` manager black list 
* `NEW_OWNER` project owner, manager masterMinter role, pauser role, blacklist role

3. Run deploy cmd

```sh
yarn deploy bitlayer | bitlayerTest
```