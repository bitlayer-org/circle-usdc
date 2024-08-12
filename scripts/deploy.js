const { toWei, keccak256 } = require("web3-utils");
const hre = require("hardhat");
const { get_Default_fee_data, get_fee_data, DefaultArgs } = require("./utils");
require("dotenv").config();

async function deploy() {
  // deploy library
  const Signature = await hre.ethers.getContractFactory("SignatureChecker");
  const signature = await Signature.deploy();
  await signature.deployed();
  console.log("Signature deployed to:", signature.address);
  
  // 1. deploy impl contract
  const Impl = await hre.ethers.getContractFactory("FiatTokenV2_2", {
    libraries: {
      SignatureChecker: signature.address
    },
  })
  const impl = await Impl.deploy();
  await impl.deployed();
  console.log("Impl deployed to:", impl.address);

  // 2. initialize impl contract
  await impl.initialize(
    DefaultArgs.tokenName,
    DefaultArgs.tokenSymbol,
    DefaultArgs.tokenCurrency,
    DefaultArgs.tokenDecimals,
    DefaultArgs.newMasterMinter,
    DefaultArgs.newPauser,
    DefaultArgs.newBlacklister,
    DefaultArgs.newOwner
  )
  console.log('impl initialize success')
  await sleep(10000)

  await impl.initializeV2(DefaultArgs.tokenName)
  console.log('impl initializeV2 success')
  await sleep(10000)

  await impl.initializeV2_1(DefaultArgs.lostAndFound)
  console.log('impl initializeV2_1 success')
  await sleep(10000)

  await impl.initializeV2_2(
    [],
    DefaultArgs.tokenSymbol
  )
  console.log('impl initializeV2_2 success')
  await sleep(10000)

  // 3. deploy proxy contract
  const Proxy = await hre.ethers.getContractFactory("FiatTokenProxy");
  const proxy = await Proxy.deploy(impl.address);
  await proxy.deployed();
  console.log("Proxy deployed to:", proxy.address);

  // 4. change admin
  await proxy.changeAdmin(process.env.NEW_PROXY_ADMIN);
  console.log('proxy changeAdmin success')
  await sleep(10000) 

  // 4. initialize proxy contract
  const proxyInstance = Impl.attach(proxy.address);
  await proxyInstance.initialize(
    process.env.TOKEN_NAME,
    process.env.TOKEN_SYMBOL,
    process.env.TOKEN_CURRENCY,
    process.env.TOKEN_DECIMALS,
    process.env.NEW_MASTER_MINTER,
    process.env.NEW_PAUSER,
    process.env.NEW_BLACK_LISTER,
    process.env.NEW_OWNER
  )
  console.log('proxy initialize success')
  await sleep(10000)

  await proxyInstance.initializeV2(
    process.env.TOKEN_NAME
  )
  console.log('proxy initializeV2 success')
  await sleep(10000)

  await proxyInstance.initializeV2_1(
    DefaultArgs.lostAndFound
  )
  console.log('proxy initializeV2_1 success')
  await sleep(10000)

  await proxyInstance.initializeV2_2(
    [],
    process.env.TOKEN_SYMBOL
  )
  console.log('proxy initializeV2_2 success')
}

deploy().then().catch();

async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}