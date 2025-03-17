# TypeScript SDK

## Usage

The SDK is currently experimental and configured to use our program on Solana devnet.

### Metaplex Integration

#### Minting

The example below displays the simple integration with the Metaplex SDK in order to mint a NFT with the metadata stored on-chain.

```ts
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { percentAmount } from '@metaplex-foundation/umi'
import { createMegadata } from '@megayours/megadata/solana';

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
});

await createNft(umi, {
  mint,
  name: 'My NFT',
  uri: megadataUri,
  sellerFeeBasisPoints: percentAmount(5.5),
}).sendAndConfirm(umi);
```

#### Updating Megadata

The example below allows the minter to update the megadata of an existing token. E.g. changing the hat equipped by the NFT.

```ts
import { updateMegadata } from '@megayours/megadata/solana';

await updateMegadata({
  umi,
  mint,
  megadata: {
    "equippables": {
      "Hat": "Red Cap"
    }
  }
})
```

## Development
To install dependencies:

```bash
bun install
```

To build:

```bash
bun run build
```
