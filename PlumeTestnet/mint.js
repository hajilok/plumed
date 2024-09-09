import Web3 from "web3";

const abi = [{
    "inputs": [],
    "name": "mintAICK",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]

const mint = async(privateKey) => {
    try {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)

    const contract = '0x8504a242d86C7D84Fd11E564e6291f0A20d6C2a2'
    const mintFuntion = new web3.eth.Contract(abi, contract)
    const data = mintFuntion.methods.mintAICK().encodeABI()
    // const hexVote = '0x6966ee57'

    const tx = {
        from: account.address,
        to: contract,
        data: data,
        gas: await web3.eth.estimateGas(),
        gasPrice: await web3.eth.getGasPrice()

    }
    
    const getTrx = await web3.eth.accounts.signTransaction(tx, privateKey)
    const bayar = await web3.eth.sendSignedTransaction(getTrx.rawTransaction)

    return bayar
    } catch (error) {
        return error
    }


}

export default mint