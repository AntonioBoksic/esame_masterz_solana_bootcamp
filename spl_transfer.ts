import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
 } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("23bF7K18zBkPKQGUjv3qNgxBaRpAKtTcMADJXRbze9zD");
const fromAta = new PublicKey("5CcbUedV4JbqM5g3DhRw6y2JpUw2XHBDXYDVqQ1Uhnjw");


//creiamo una nuova keypair a cui mandare i token
const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    //mandiamo 120 token
    const amount = 120;

    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})()

//eseguo "npm run transferToken"

// in console ottengo:
/*
To:  Ey3zXzAEkyajZjzH1gbuVW1jFC8LvSMMp11RgMjxqNin
Associated Token Account:  ANc4ydiSXEegW2YuHVdoYfSyoanuZZQRb4fnyJeVPoG7
Amount in ATA:  0
Transferred 120 from 5CcbUedV4JbqM5g3DhRw6y2JpUw2XHBDXYDVqQ1Uhnjw to ANc4ydiSXEegW2YuHVdoYfSyoanuZZQRb4fnyJeVPoG7
*/