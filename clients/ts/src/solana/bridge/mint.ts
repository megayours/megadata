import { type Umi, type Signer } from "@metaplex-foundation/umi";
import { prepareMegadataUri } from "../../megarouter";
import { buildOperationBuffer } from "./serialization";
import { sendMegaDataTx } from "./mega-tx";
const OPERATION_NAME = "solana.register_token";

export const createMegadata = async (options: {
  umi: Umi,
  mint: Signer,
  megadata: Record<string, unknown>
}) => {
  const tokenAddress = options.mint.publicKey;
  const uri = prepareMegadataUri({ path: "solana", identifier: tokenAddress });

  const params = { address: tokenAddress, properties: options.megadata };
  const operationBuffer = buildOperationBuffer(OPERATION_NAME, params);

  await sendMegaDataTx(options.umi, operationBuffer);

  return uri;
}