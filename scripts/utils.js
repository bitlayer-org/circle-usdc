const { ethers } = require("ethers");
const Web3 = require("web3");
async function get_fee_data(rpcUrl) {
  const web3 = new Web3(rpcUrl);
  const gasPrice = await web3.eth.getGasPrice();
  const data = {
    jsonrpc: "2.0",
    method: "eth_maxPriorityFeePerGas",
    id: 1,
  };

  let fee;
  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    fee = parseInt(json.result, 16);
  } catch (error) {
    console.error("Error calling Ethereum RPC:", error);
  }
  return {
    maxFeePerGas: fee,
    maxPriorityFeePerGas: fee,
    baseFeePerGas: gasPrice,
  };
}

async function get_Default_fee_data() {
  return {
    maxFeePerGas: ethers.utils.parseUnits("5", "gwei"),
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
    baseFeePerGas: ethers.utils.parseUnits("2", "gwei"),
  };
}

const DefaultArgs = {
  tokenName: "",
  tokenSymbol: "",
  tokenCurrency: "",
  tokenDecimals: 0,
  newMasterMinter: "0x0000000000000000000000000000000000000001",
  newPauser: "0x0000000000000000000000000000000000000001",
  newBlacklister: "0x0000000000000000000000000000000000000001",
  newOwner: "0x0000000000000000000000000000000000000001",
  lostAndFound: "0x0000000000000000000000000000000000000001",
};

module.exports = {
  get_fee_data,
  get_Default_fee_data,
  DefaultArgs,
};
