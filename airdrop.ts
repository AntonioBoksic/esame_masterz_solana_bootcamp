import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

import wallet from "./wallet.json";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//stabilisco connessione con devnet
const connection = new Connection("https://api.devnet.solana.com", "finalized");


(async () => {
    try {
        

        //richiedo 1 SOL di airdrop
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // Indirizzo pubblico a cui mandare i fondi
            1 * LAMPORTS_PER_SOL    // richiedo 1 SOL
        );

        // aspettiamo che si risolva la promise airdropSignature e poi andiamo a vedere transazione sull explorer
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();

// eseguire file con "npm run airdrop"

// vedere transazione a questo link:
// https://explorer.solana.com/tx/5996bmTVcqenyd5vVXCGVJ2jSBUFS5wJV1kPyrzi4hL96CnFrgS7kvQVVghkyVjKzXfbyUaNJGZQPD3GGPt4mJfQ?cluster=devnet
