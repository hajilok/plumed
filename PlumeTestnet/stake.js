import Web3 from "web3";

const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const stake = async (privateKey) => {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)

    const implementationAddress = "0x50B7175E40E0542DCAEA2e94B34f30587CB5f1B1" 
    const proxy = "0xA34420e04DE6B34F8680EE87740B379103DC69f6"
    const amout =  web3.utils.toWei('1', 'ether'); // Mengonversi 1 Ether ke Wei


    const proxyContract = new web3.eth.Contract(abi, implementationAddress)

    const data = proxyContract.methods.stake(amout).encodeABI();

    // Buat transaksi
    const tx = {
        from: account.address,
        to: proxy,
        gas: 2000000,
        data: data,
        gasPrice: await web3.eth.getGasPrice()
    };

    // Tanda tangani dan kirim transaksi
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt

    
}

export default  stake