import 'dotenv/config';
import readline from 'readline'
import interactWithProxy from "./PlumeTestnet/checkin.js";
import swap from './PlumeTestnet/swap.js';
import stake from './PlumeTestnet/stake.js';
import vote from './PlumeTestnet/vote.js';

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
        console.log(txlink)
  
    } catch (error) {
        console.log(error)
    }

    // Panggil fungsi main lagi setelah 10 menit
    setTimeout(() => {
        main(privatekey);
    }, 600000);
}

rl.question('Masukan Private Key mu ', (name) => {
    const formattedPrivateKey = name.startsWith('0x') ? name : '0x' + name;
    main(formattedPrivateKey)
    rl.close();
});

