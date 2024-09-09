import Web3 from "web3";

const vote = async(privateKey) => {
    try {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)

    const contract = '0xBd06BE7621be8F92101bF732773e539A4daF7e3f'
    const hexVote = '0xb3f98adc0000000000000000000000000000000000000000000000000000000000000029'

    const tx = {
        from: account.address,
        to: contract,
        data: hexVote,
        gas: 2000000,
        gasPrice: await web3.eth.getGasPrice()

    }
    
    const getTrx = await web3.eth.accounts.signTransaction(tx, privateKey)
    const bayar = await web3.eth.sendSignedTransaction(getTrx.rawTransaction)

    return bayar
    } catch (error) {
        return false
    }


}

export default vote