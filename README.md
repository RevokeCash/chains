[![Publish](https://github.com/RevokeCash/chains/actions/workflows/publish-release.yml/badge.svg)](https://github.com/RevokeCash/chains/actions/workflows/publish-release.yml) ![npm](https://img.shields.io/npm/v/@revoke.cash/chains?logoColor=blue)

# Eth Chains

Helper module for getting EVM chain info from [chainid.network](https://chainid.network/).

Note: This package was initially created by @taylorjdawson. We forked the repository so we can control the release process with an automated script and make additional changes. The original package can be found [here](https://github.com/taylorjdawson/eth-chains).

## Installation

```
yarn add @revoke.cash/chains
```

### Note on versioning

`@revoke.cash/chains` uses a weekly automated release script that updates its chain data. This release script takes breaking changes into account, so breaking changes (e.g. renamed chains) are released as a new major version, while non-breaking changes (e.g. new chains) are released as a new minor version.

## Usage

Import `chains` methods and enums:

```ts
import allChains, { ChainId, ChainName } from '@revoke.cash/chains'
```

### Chain names and ids via Enums:

```ts
console.log(ChainId.EthereumMainnet) // 1
console.log(ChainId.BinanceSmartChainMainnet) // 56
console.log(ChainName.EthereumMainnet) // "Ethereum Mainnet"
console.log(ChainName.Rinkeby) // "Rinkeby"
```

### Chain by ID:

```ts
getChainById(ChainId.EthereumMainnet) // { name: "Ethereum Mainnet", ..., "infoURL": "https://ethereum.org" }
// Equivalent
getChainById(1)
```

### Chain by Name:

```ts
getChainByName(ChainName.EthereumMainnet) // { name: "Ethereum Mainnet", ..., "infoURL": "https://ethereum.org" }
// Equivalent
getChainByName('Ethereum Mainnet')
```

### Get all Chains:

```ts
const chains = allChains()
// { 1: { name: "Ethereum Mainnet", ..., "infoURL": "https://ethereum.org" }, 2: {...}}
```

### Typescript Types:

```ts
import { Chain, NativeCurrency, Explorer } from '@revoke.cash/chains'
const ethereum: Chain = getChainById(ChainId.EthereumMainnet)
ethereum.chain // 'ETH'
```
