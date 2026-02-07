const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.FLARE_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abi = [{"inputs":[{"internalType":"address","name":"freelancer","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"createJob","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"jobId","type":"uint256"},{"internalType":"bool","name":"_success","type":"bool"}],"name":"resolve","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const bytecode = "0x608060405234801561001057600080fd5b50600436106100365760003560e01c806389d2a96911610033578063e52c9f9611610021575b600080fd5b61004a60048036038101906100459190610135565b610060565b60405161005791906101e1565b60405180910390f35b60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156100b557604051633911d17160e01b81526004016100ac906101f0565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff167f000000000000000000000000000000000000000000000000000000000000000016145b92915050565b60006020828403121561010f57600080fd5b81516001600160a01b038116811461012657600080fd5b9392505050565b60008060006060848603121561014157600080fd5b833561014c81610111565b9250602084013561015c81610111565b915060408401359050925092509256fea2646970667358221220f6a5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e64736f6c63430008130033";

(async () => {
  console.log('Deploying from:', wallet.address);
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(process.env.STABLECOIN_ADDRESS);
  await contract.deployTransaction.wait();
  console.log('✅ DEPLOYED:', contract.address);
})();
