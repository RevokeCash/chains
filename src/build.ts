import got from 'got'
import { promises as fs } from 'fs'
import { inspect } from 'util'
import { format } from 'prettier'
import { Options } from 'prettier'

import { Chain } from './types'
import { capitalize } from './helpers'
import prettierOptions from '../.prettierrc.json'
import { ENUM_KEY_OVERRIDES } from './constants'

const formatterOptions = {
  ...(prettierOptions as Options),
  parser: 'typescript'
}

const getEnumKey = (chainName: string) => {
  let enumKey = capitalize(chainName.replace(/\s/g, ''))
  // If the key starts with a number or contains ',' or '.' then wrap it in quotes
  enumKey = !!chainName.match(/^\d|[\-\.\()]/) ? `'${enumKey}'` : enumKey
  return enumKey
}

const getBuildEnums = (chains: Chain[]) =>
  chains
    .reduce(
      (enumStrings, chain, index, array) => {
        const key = ENUM_KEY_OVERRIDES[chain.chainId] ?? getEnumKey(chain.name)
        const tail = index === array.length - 1 ? ' }' : ', '
        enumStrings[0] += `${key} = '${chain.name}'${tail}`
        enumStrings[1] += `${key} = ${chain.chainId}${tail}`
        return enumStrings
      },
      ['export enum ChainName { ', 'export enum ChainId { ']
    )
    .join('\n')

const generateEnumFile = async (chains: Chain[]) => {
  fs.writeFile(
    './src/enums.ts',
    format(getBuildEnums(chains), {
      ...(prettierOptions as Options),
      parser: 'typescript'
    })
  )
}

const generateChainsFile = async () => {
  const initialChains: Chain[] = await got(
    'https://chainid.network/chains.json'
  ).json()

  const chains = await annotateIconUrls(initialChains)

  await generateEnumFile(chains).catch(() => {
    console.log('Error generating enum file')
  })

  const chainsJs = chains
    .map(chain => `${chain.chainId}: ${inspect(chain, { depth: null })}`)
    .join(',\n')

  fs.writeFile(
    './src/chains.ts',
    format(
      `import { Chains } from "./types"\nexport const chains: Chains = {\n${chainsJs}\n}`,
      formatterOptions
    )
  )
}

const annotateIconUrls = async (chains: Chain[]) => {
  return Promise.all(
    chains.map(async chain => {
      if (!chain.icon) return chain;

      const iconUrl = `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/icons/${chain.icon}.json`

      const [icon] = await got(iconUrl)
        .json<Array<{ url: string }>>()
        .catch(() => {
          console.log(`Error fetching icon for ${chain.name}`)
          return [];
        })

      const iconURL = icon?.url?.replace('ipfs://', 'https://ipfs.io/ipfs/')

      return { ...chain, iconURL }
    })
  );
};

generateChainsFile()
