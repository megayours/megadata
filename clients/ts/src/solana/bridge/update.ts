import { type Umi, type Signer } from "@metaplex-foundation/umi";
import { buildOperationBuffer } from "./serialization";
import { sendMegaDataTx } from "./mega-tx";

const OPERATION_NAME = "solana.update_metadata";

export const updateMegadata = async (options: {
  umi: Umi,
  mint: Signer,
  megadata: Record<string, unknown>
}) => {
  const tokenAddress = options.mint.publicKey;

  const params = { address: tokenAddress, properties: options.megadata };
  const operationBuffer = buildOperationBuffer(OPERATION_NAME, params);

  await sendMegaDataTx(options.umi, operationBuffer);
}
