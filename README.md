[![Publish](https://github.com/RevokeCash/chains/actions/workflows/publish-release.yml/badge.svg)](https://github.com/RevokeCash/chains/actions/workflows/publish-release.yml/badge.svg) ![npm](https://img.shields.io/npm/v/@revoke.cash/chains?logoColor=blue)

# Eth Chains

Helper module for getting EVM chain info from [chainid.network](https://chainid.network/).

Note: This package was initially created by @taylorjdawson. We forked the repository so we can control the release process with an automated script. The original package can be found [here](https://github.com/taylorjdawson/eth-chains).

## Installation

```
yarn add @revoke.cash/chains
```

### Note on versioning

`@revoke.cash/chains` uses a weekly automated release script that updates its chain data. This release script takes breaking changes into account, so breaking changes (e.g. renamed chains) are released as a new major version, while non-breaking changes (e.g. new chains) are released as a new minor version.

## Usage

Import `chains` methods and enums:

```ts
import chains, { ChainId, ChainName } from '@revoke.cash/chains'
```

### Easily get most popular chains:

```ts
import { chain } from '@revoke.cash/chains'

console.log(chain.ethereum.rinkeby)

console.log(chain.polygon.mumbai)
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
chains.getById(ChainId.EthereumMainnet) // { name: "Ethereum Mainnet", ..., "infoURL": "https://ethereum.org" }
// Equivalent
chains.getById(1)
```

### Chain by Name:

```ts
chains.getByName(ChainName.EthereumMainnet) // { name: "Ethereum Mainnet", ..., "infoURL": "https://ethereum.org" }
// Equivalent
chains.getByName('Ethereum Mainnet')
```

### Get all Chains:

```ts
const allChains = chains.all()
// { 1: { name: "Ethereum Mainnet", ..., "infoURL": "https://ethereum.org" }, 2: {...}}
```

### Typescript Types:

```ts
import { Chain, NativeCurrency, Explorer } from '@revoke.cash/chains'
const ethereum: Chain = chains.getById(ChainId.EthereumMainnet)
ethereum.chain // 'ETH'
```
