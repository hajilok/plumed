import Web3 from "web3";
import allowSpending from "./allowSpending.js";

const landx = async (privateKey) => {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)
    const gnUSD = '0x5c1409a46cD113b3A667Db6dF0a8D7bE37ed3BB3'

    const approvegnUSD = await allowSpending(100, privateKey, gnUSD)
    if (!approvegnUSD) {
        return 'Proccess Approve error, operation landx not allowed '
    } 

    const multicallSwap = async (call, privateKey) => {
        const contractABI = [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "calls",
                        "type": "bytes[]"
                    }
                ],
                "name": "multicall",
                "outputs": [
                    {
                        "name": "blockNumber",
                        "type": "uint256"
                    },
                    {
                        "name": "returnData",
                        "type": "bytes[]"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        try {
          const nonce = await web3.eth.getTransactionCount(account.address, 'latest');
          const contract = '0x9990933B23c0D4e23dA4cb8096A478D42e687CE8'
          const getFunction = new web3.eth.Contract(contractABI, contract)
          const data = getFunction.methods.multicall(call).encodeABI()
          const tx = {
            from: account.address,
            to: contract,
            data: data,
            gas: await web3.eth.estimateGas(),
            gasPrice: await web3.eth.getGasPrice(),
            nonce: nonce

        }

        const getReceipt = await web3.eth.accounts.signTransaction(tx, privateKey)
        const bayar = await web3.eth.sendSignedTransaction(getReceipt.rawTransaction)
        return bayar
        } catch (error) {
            return error
        }
    }
    const calls = [
        "0x414bf3890000000000000000000000005c1409a46cd113b3a667db6df0a8d7be37ed3bb30000000000000000000000004e0dd48f5e13229553a18c8a584ea6764ed5bc990000000000000000000000000000000000000000000000000000000000000bb8000000000000000000000000bbe071bec0232acaa16aa515915fed4640ee4e4d0000000000000000000000000000000000000000000000000000000066dcb9290000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000"
    ];
    const getMultiSwap = await multicallSwap(calls, privateKey)
    return getMultiSwap
    // if (!getMultiSwap) {
    //     return 'Swap failed or nothing'
    // } 
    // const landxMiles = async (privateKey) => {
    //     const contract = "0x84d88f93749e4a5b678e432feab864fd643cd270f99246bf847e8345c66cb882"
    //     const data = '0x33637863000000000000000000000000bbe071bec0232acaa16aa515915fed4640ee4e4d'
    //     const tx = {
    //         from: account.address,
    //         to: contract,
    //         data: data,
    //         gas: await web3.eth.estimateGas(),
    //         gasPrice: await web3.eth.getGasPrice()
            
    //     }
    //     const getReceipt = await web3.eth.accounts.signTransaction(tx, privateKey)
    //     const bayar = await web3.eth.sendSignedTransaction(getReceipt.rawTransaction)
    //     return bayar     
    // }

    // const getLandx = await landxMiles(privateKey)
    // return getLandx


}

export default landx