import Web3 from "web3";

const abi = [
    {
        "constant": false,
        "inputs": [
            { "name": "amountIn", "type": "uint256" },
            { "name": "amountOutMin", "type": "uint256" },
            { "name": "path", "type": "address[]" },
            { "name": "to", "type": "address" },
            { "name": "deadline", "type": "uint256" }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
            { "name": "amounts", "type": "uint256[]" }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "amountIn", "type": "uint256" },
            { "name": "path", "type": "address[]" }
        ],
        "name": "getAmountsOut",
        "outputs": [
            { "name": "amounts", "type": "uint256[]" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, 

    {
        "constant": false,
        "inputs": [
            { "name": "spender", "type": "address" },
            { "name": "value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [
            { "name": "success", "type": "bool" }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const swapMinato = async (privatekey) => {
    const web3 = new Web3('https://rpc.minato.soneium.org/');
    const account = web3.eth.accounts.privateKeyToAccount(privatekey);
    web3.eth.accounts.wallet.add(account);

    const contracts = "0xd73995491Be61510F0163e0926618B57d0107FCa";
    const getFunction = new web3.eth.Contract(abi, contracts); 
    const amountIn = 1000000 // Contoh: 1 ETH
    const addresses = [
        "0x97368885747176170506a65c0096b91236b744e7",
        "0x7125e7d95c520c0835b5fcbad72a1c3c55e83269",
        "0x884f1df1639489e883ef3178af1356d1ecfd5454"
    ];

    const getAmounts = await getFunction.methods.getAmountsOut(amountIn, addresses).call();
    const amountOutMin = getAmounts[getAmounts.length - 1];
    const toAddress = '0xbbe071bec0232acaa16aa515915fed4640ee4e4d';
    const deadline = Math.floor(Date.now() / 1000) + 60 * 40; // 20 menit dari sekarang

    const data = getFunction.methods.swapExactTokensForTokens(amountIn, amountOutMin, addresses, toAddress, deadline).encodeABI();

    const gasEstimate = await getFunction.methods.swapExactTokensForTokens(amountIn, amountOutMin, addresses, toAddress, deadline).estimateGas({ from: account.address });

    const tx = {
        from: account.address,
        to: contracts,
        data: data,
        gas: gasEstimate,
        gasPrice: await web3.eth.getGasPrice()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privatekey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
};

export default swapMinato;
