# metatokens

Metatokens are first-class extensions to ERC-1155 contracts that allow for enhancements or restrictions to minting, burning, or transferring the underlying NFTs without requiring external oracles, intermediary transactions, or unsafe external calls1. They can be constructed to fit a particular purpose or simply to provide constraints on the underlying token, whether or not there are any metatokens actually minted. They can also describe the contract as a whole, rather than an individual token, and can be NFTs themselves. This eliminates intermediaries while ensuring the holder of an NFT is also its true owner.

Metatoken extensions act as nested ERC-1155 contracts that exist to support and enhance the base tokens. Extensions can be written to support current or future protocol standards, without requiring significant changes to the base contract. Extensions can issue a single metatoken that acts as an aggregate of all NFTs, or multiple metatokens that are matched one-to-one with base tokens. Metatokens are issued under the same base contract, for proof of authority, while offloading complex logic to external and standardizable contracts. They can be one-of-one NFTs, one-of- many NFTs, emulators of other token standards, and more.

RC-1155M contracts provide hooks into the mutability actions of ERC-1155 tokens. Each extension can be registered against any number of actions, and must provide appropriate external functions for these hooks. The ERC-1155M contract provides two hooks for each action: pre-action and post-action. This results in a total of 6 groups and 12 hooks for extensions to implement; however, they must implement both the pre-action and post-action hooks for the specific action they are registered for, with a minimum of one action per extension (see: IMetatoken1155). Hooks may revert if applicable, but the pre-action hooks’ mutability must be either view or pure.

[Read the whitepaper](./ERC-1155%20Metatokens.pdf)

## setup

- ensure `node` and `python` are installed and on your path
- run `yarn install --frozen-lockfile` to install all packages.

Primary workflow for running tests as code changes:

- open `metatokens.code-workspace` in VSCode
- choose `Terminal > Run Build Task...` to run all the watch tasks simultaneously. If you run into errors, you may need to restart one of the watches due to potential race conditions.
- you can also run one or more steps separately in a terminal

For documentation, here are the steps that run automatically above, if you needed to run manually:

- run `yarn build` once to generate `./tsc-alias-replacers/replacerA.js` (you'll see an error about "replacerA.ts is not under `rootDir")
- run `yarn build:tsc-alias`
- run `yarn test` to run tests

## development

To improve debugging of `delegatecall`, patch the hardhat network according to `hardhat_patch.js`.

## scripts

- `yarn build` - compiles the tests
- `yarn build:tsc-alias` - updates the import paths in the compiled tests
- `yarn genabi:watch` - updates generated contract abis when contracts are changed
- `yarn flatten:watch` - automatically generates flattened, single-source contract files
- `yarn test:watch` - restarts tests whenever a test file or contract is updated

## deployment

There are two primary contracts:

- the main contract `ERC1155M.sol` which should be a drop-in replacement for a standard ERC1155
- the metatoken extension contract `Metatoken155.sol` which supports the additional metatoken features

Deploy via:

- `rm tools/.flattencache` # to build from scratch if desired
- `yarn flatten`
- compile, deploy and verify contract
  - head over to https://remix.ethereum.org/
  - copy contract in, for example `flattened/ERC-1155M/ERC1155M_flattened.sol` or `flattened/examples/ERC1155M-Mint_flattened.sol`
  - compile and deploy via Remix VM (for testing) or wallet (for deploying to chain)
  - after deploy, in Remix UI, click on gear to add the "ETHERSCAN - CONTRACT VERIFICATION" plugin. Add your etherscan API key and you can verify the contract (and upload contract source)
