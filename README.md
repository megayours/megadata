# Megadata

An easy-to-integrate alternative to static storage solutions such as IPFS and Arweave. It enables on-chain dynamic data that can evolve over time through on-chain logic. All logic is managed in a completely decentralized manner, and the only requirement for the external token creation interface is to offer Megadata as an option for metadata storage during the minting process.

Utilizing Megadata for metadata storage allows developers to store and use the metadata on-chain and extend it by attaching non-intrusive Modules at any time. These Modules can add various types of data, from 3D assets to multimedia and legal terms and conditions, as well as logic that defines the behavior or utility of those assets within DApps implementing such Modules, without altering the original asset.

Megadata can also be attached to existing collections using IPFS, Arweave or any metadata URI with the use of our MegaRouter as a gateway. That way existing collections with static metadata can actually be converted into dynamic metadata.

## SDKs

This repository contains SDKs for integrating and working with Megadata.

- [Solana TypeScript](./clients/ts/README.md)