import Web3 from "web3";

const judiCultured = async (privateKey) => {
    try {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)

    const contract = "0x032139f44650481f4d6000c078820B8E734bF253"
    const data = '0xe940f6a900000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000001'

    const tx = {
        from: account.address,
        to: contract,
        data: data,
        gas: await web3.eth.estimateGas(),
        gasPrice: await web3.eth.getGasPrice()
    }

    const getReceipt = await web3.eth.accounts.signTransaction(tx, privateKey)
    const bayar = await web3.eth.sendSignedTransaction(getReceipt.rawTransaction)
    return bayar

    } catch (error) {
        return false
    }
}

export default judiCultured