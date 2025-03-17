import { Umi } from "@metaplex-foundation/umi";

import { generateSigner } from "@metaplex-foundation/umi";
import { PROGRAM_ID } from "../config";

export const sendMegaDataTx = async (umi: Umi, operationBuffer: Buffer) => {
  const chainAccount = generateSigner(umi);

  const transaction = umi.transactions.create({
    version: 0,
    blockhash: (await umi.rpc.getLatestBlockhash()).blockhash,
    instructions: [
      {
        keys: [
          { pubkey: chainAccount.publicKey, isSigner: true, isWritable: true },
          { pubkey: umi.payer.publicKey, isSigner: true, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data: operationBuffer
      }
    ],
    payer: umi.payer.publicKey
  })

  let signedTransaction = await umi.payer.signTransaction(transaction);
  signedTransaction = await chainAccount.signTransaction(signedTransaction);

  await umi.rpc.sendTransaction(signedTransaction);
}