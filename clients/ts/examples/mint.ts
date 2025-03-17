import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
  mplTokenMetadata, createNft,
  fetchDigitalAsset,
} from '@metaplex-foundation/mpl-token-metadata'
import { generateSigner, percentAmount, keypairIdentity, createSignerFromKeypair, publicKey } from '@metaplex-foundation/umi'
import { Keypair } from '@solana/web3.js'
import * as fs from 'fs'
import { createMegadata } from '../src/solana/bridge/mint'
import { updateMegadata } from '../src/solana/bridge/update'
// Read and create the keypair
const payerSecretKey = new Uint8Array(JSON.parse(fs.readFileSync('clients/ts/examples/payer-keypair.json', 'utf-8')));
const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

// Create the UMI instance
const umi = createUmi('https://api.devnet.solana.com').use(mplTokenMetadata());

// Create a UMI signer from the keypair
const payerSigner = createSignerFromKeypair(umi, {
  publicKey: publicKey(payerKeypair.publicKey.toBase58()),
  secretKey: payerKeypair.secretKey,
});

// Set it as the default identity
umi.use(keypairIdentity(payerSigner));

const mint = generateSigner(umi)

const megadataUri = await createMegadata({
  umi,
  mint,
  megadata: {
    "pfps": {
      "Hair": "Brown Textured Crop",
      "Length (CM)": "174"
    },
    "equippables": {
      "Hat": "Blue Cap",
      "Shirt": "Black T-Shirt",
      "Pants": "Shorts",
      "Shoes": "Brown Moccasins"
    }
  }
})

const status = await createNft(umi, {
  mint,
  name: 'My NFT',
  uri: megadataUri,
  sellerFeeBasisPoints: percentAmount(5.5),
}).sendAndConfirm(umi);

console.log("mint", status.signature.toString());

const asset = await fetchDigitalAsset(umi, mint.publicKey)

console.log(asset)

await updateMegadata({
  umi,
  mint,
  megadata: {
    "equippables": {
      "Hat": "Red Cap"
    }
  }
});