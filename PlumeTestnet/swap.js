import Web3 from "web3";

const abi = [
    {
        "inputs": [
                {"internalType": "address", "name": "base", "type": "address"},
                {"internalType": "address", "name": "quote", "type": "address"},
                {"internalType": "uint256", "name": "poolIdx", "type": "uint256"},
                {"internalType": "bool", "name": "isBuy", "type": "bool"},
                {"internalType": "bool", "name": "inBaseQty", "type": "bool"},
                {"internalType": "uint128", "name": "qty", "type": "uint128"},
                {"internalType": "uint16", "name": "tip", "type": "uint16"},
                {"internalType": "uint128", "name": "limitPrice", "type": "uint128"},
                {"internalType": "uint128", "name": "minOut", "type": "uint128"},
                {"internalType": "uint8", "name": "reserveFlags", "type": "uint8"}
            ],
            "name": "swap",
            "outputs": [
                {"internalType": "int128", "name": "baseFlow", "type": "int128"},
                {"internalType": "int128", "name": "quoteFlow", "type": "int128"}
            ],
            "stateMutability": "payable",
            "type": "function"
     }
    
]

const swap = async (privateKey) => {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)
    const BASE = Web3.utils.toChecksumAddress('0x5c1409a46cd113b3a667db6df0a8d7be37ed3bb3');
    const QUOTE = Web3.utils.toChecksumAddress('0xba22114ec75f0d55c34a5e5a3cf384484ad9e733');
    const POOL_IDX = 36000;
    const IS_BUY = false;
    const IN_BASE_QTY = false;
    const QTY = 1000000000000000;
    const TIP = 0;
    const LIMIT_PRICE = 65537;
    const MIN_OUT = 989042646911599700;
    const RESERVE_FLAGS = 0;


    const contract = "0x4c722A53Cf9EB5373c655E1dD2dA95AcC10152D1"
    const proxyContract = new web3.eth.Contract(abi, contract);
    const data = proxyContract.methods.swap(BASE, QUOTE, POOL_IDX, IS_BUY, IN_BASE_QTY, QTY, TIP, LIMIT_PRICE, MIN_OUT, RESERVE_FLAGS).encodeABI();
    const gasEstimate = await web3.eth.estimateGas({
        from: account.address,
        to: contract,
        data: data
      });
  
      const gasPrice = await web3.eth.getGasPrice();
    const tx = {
        from: account.address,
        to: contract,
        gas: gasEstimate,
        data: data,
        gasPrice: gasPrice
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt

}

export default swap