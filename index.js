import 'dotenv/config';
import readline from 'readline'
import interactWithProxy from "./PlumeTestnet/checkin.js";
import swap from './PlumeTestnet/swap.js';
import stake from './PlumeTestnet/stake.js';
import vote from './PlumeTestnet/vote.js';
import swapMinato from './MinatoTestnet/minatoTestnet.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const main = async (privatekey) => {
    // buat tx terus 
    try {
        const getSwap = await swap(privatekey)
        const getStake = await stake(privatekey)
        const getVote = await vote(privatekey)
        const checkIn = await interactWithProxy(privatekey)
        const getSwapMinato = await swapMinato(privatekey)
        const getxHash = getStake.logs[0].transactionHash
        const blockhash = getSwap.logs[0].transactionHash
        const address = getSwap.from
        if (!checkIn) {
            console.log('Gagal daily karena sudah done')
        } else {
            console.log(`Success Checkin here is your tx : https://testnet-explorer.plumenetwork.xyz/tx/${checkIn.logs[0].transactionHash}`)
        }
        if (!getVote) {
            console.log('Gagal vote karena sudah habis Alokasi Votenya')
        } else {
            console.log(`Success Vote here is your tx : https://testnet-explorer.plumenetwork.xyz/tx/${getVote.logs[0].transactionHash}`)
        }


        const txlink = `Address\n ${address} Succes Swap ,  Your tx id = https://testnet-explorer.plumenetwork.xyz/tx/${blockhash}\n, Success Stake, Your link https://testnet-explorer.plumenetwork.xyz/tx/${getxHash}  ` 
        const minato = `Success Auto swap from testnet  Sonerium Minato , tx link = https://explorer-testnet.soneium.org/tx/${getSwapMinato.logs[0].transactionHash}`
        console.log(txlink)
        console.log(minato)
    } catch (error) {
        console.log(error)
    }

    // Panggil fungsi main lagi setelah 10 menit
    setTimeout(() => {
        main(privatekey);
    }, 600000);
}

const privatekey = process.env.PRIVATE_KEY

main(privatekey)