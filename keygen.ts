import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log(`public key: ${keypair.publicKey.toBase58()} \n\n secret key che va salvato in file json: [${keypair.secretKey}]`)

// eseguire file con "npm run keygen"

// public key generata: DgHinAL3hqWcah1uDDDiRR7AYCqjV6sdNvmgQ3zBjNYx 
// secret key la metto nel file wallet.json nella root del progetto, non la metto nel gitignore per semplicità ma so che andrebbe nascosto questo file e non andrebbe mai caricato in ambiente di produzione
