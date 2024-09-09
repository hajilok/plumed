import Web3 from "web3"; 

const abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "rwaType",
          "type": "uint256"
        },
        {
          "name": "image",
          "type": "string"
        }
      ],
      "name": "createToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  

const tokensasi = async (privateKey) => {
    const web3 = new Web3('https://testnet-rpc.plumenetwork.xyz/http')
    const account = web3.eth.accounts.privateKeyToAccount(privateKey)
    web3.eth.accounts.wallet.add(account)

    const contract = "0x485D972889Ee8fd0512403E32eE94dE5c7a5DC7b"

   const data = "0xe817e2ae00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000076376346d7867730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044954454d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b62767968787731357a7936000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c68747470733a2f2f6d696c65732e706c756d656e6574776f726b2e78797a2f696d616765732f6172632f726172652d736e65616b6572732e7765627000000000"
       
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
}

export default tokensasi