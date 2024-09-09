import Web3 from "web3";
import allowSpending from "./allowSpending.js";

const Nft = async (privateKey) => {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)
    


    const getFund = async (account, privateKey) => {
        try {
        const contractFaucet = '0x5Df3B533850E05e37cC4DfAf54EDd0c0C0fa5C12'
        const data = '0x359cf2b7'

        const tx = {
            from: account,
            to: contractFaucet,
            data: data,
            gasPrice: await web3.eth.getGasPrice(),
            gas: 2000000,

        }

        const getReceipt = await web3.eth.accounts.signTransaction(tx, privateKey)
        const bayar = await web3.eth.sendSignedTransaction(getReceipt.rawTransaction)
        return bayar
        } catch (error) {
            console.log(error)
        }   
    }

    const getSpending = await allowSpending(100, privateKey)
    return getSpending
}

export default Nft