const BASE_URI = "https://router1.testnet.megayours.com";

export const prepareMegadataUri = (options?: { router?: string, path: string, identifier: string }) => {
  const router = options?.router ?? BASE_URI
  return `${router}/${options?.path}/${options?.identifier}`;
}
