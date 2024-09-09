import Web3 from "web3";
const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const allowSpending = async (spending, privateKey, token) => {
    try {
        const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)
    const amount = web3.utils.toWei(spending, 'ether')

    const contract = token
    const getData = new web3.eth.Contract(contractABI, contract)
    const data = getData.methods.approve(account.address, amount).encodeABI()

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

export default allowSpending