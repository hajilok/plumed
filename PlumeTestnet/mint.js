import Web3 from "web3";
import arc from "../abi/mint.js";


// Generator for names and descriptions
function generateRandomName() {
    const adjectives = ["Fast", "Reliable", "Secure", "Efficient", "Innovative"];
    const nouns = ["System", "Application", "Service", "Platform", "Solution"];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adjective} ${noun}`;
}

function generateRandomDescription() {
    const actions = ["enhance", "optimize", "secure", "accelerate", "simplify"];
    const benefits = ["business processes", "application performance", "data security", "product development", "user experience"];
    
    const action = actions[Math.floor(Math.random() * actions.length)];
    const benefit = benefits[Math.floor(Math.random() * benefits.length)];
    
    return `This solution is designed to ${action} ${benefit}.`;
}

// Example usage


const mint = async(privateKey) => {
   const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
   const account = web3.eth.accounts.privateKeyToAccount(privateKey)
   web3.eth.accounts.wallet.add(account)

   const proxyContract = '0x485D972889Ee8fd0512403E32eE94dE5c7a5DC7b'
   const implementationCa = '0xe1F9e3D1293f92c1dF87aeC9258C5EE68ebF6087'
   const name = generateRandomName();
   const description = generateRandomDescription();
   const symbol = 'ITEM'
   const rwaType = 6
   const urlImg = 'https://miles.plumenetwork.xyz/images/arc/rare-sneakers.webp'
   const contract = new web3.eth.Contract(arc, implementationCa)
   const data = contract.methods.createToken(name, symbol, description, rwaType, urlImg).encodeABI()
   const estimateGas = await web3.eth.estimateGas({
     from: account.address,
     to: proxyContract,
     data: data,
   })

   const tx = {
    from: account.address,
    to: proxyContract,
    data: data,
    nonce: await web3.eth.getTransactionCount(account.address),
    gas: estimateGas,
    gasPrice: await web3.eth.getGasPrice()
   }

   const getReceipt = await web3.eth.accounts.signTransaction(tx, privateKey)
   const bayar = await web3.eth.sendSignedTransaction(getReceipt.rawTransaction)
   return bayar
}



export default mint
