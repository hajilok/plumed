import { Web3 } from 'web3'



const abi = [
    {
        "inputs": [],
        "name": "checkIn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


// Inisialisasi kontrak proxy

export default async function interactWithProxy(privateKey) {
try {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)
    const proxyAddress = '0x8Dc5b3f1CcC75604710d9F464e3C5D2dfCAb60d8';
    const implementationAddress = '0x61B9652704CAb03B118Ec30e42eFD83A9AdEe0B7';
    const proxyContract = new web3.eth.Contract(abi, implementationAddress);
    // Buat data transaksi
    const data = proxyContract.methods.checkIn().encodeABI();

    // Buat transaksi
    const tx = {
        from: account.address,
        to: proxyAddress,
        gas: 2000000,
        data: data,
        gasPrice: await web3.eth.getGasPrice()
    };

    // Tanda tangani dan kirim transaksi
    
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt
       
} catch (error) {
        return false
    }
}

// Panggil fungsi interactWithProxy


