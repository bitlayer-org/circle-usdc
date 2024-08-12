require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
const { toWei } = require("web3-utils");

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    bitlayerTest: {
      url: "https://testnet-rpc.bitlayer.org",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/624a4335f9e449268072d9b2f12263dd`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    bitlayer: {
      url: "https://rpc.bitlayer.org",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      bitlayerTest: "ITKKXWXCAYY5PNMC82U6GP4DUFY1A8MWCT",
      bitlayer: "ITKKXWXCAYY5PNMC82U6GP4DUFY1A8MWCT",
    },
    customChains: [
      {
        network: "bitlayerTest",
        chainId: 200810,
        urls: {
          apiURL: "https://api-testnet.btrscan.com/scan/api",
        },
      },
      {
        network: "bitlayer",
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
        },
      },
    ],
  },
};
