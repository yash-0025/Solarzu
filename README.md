## Solarzu
The Solarzu Dapp enables users to connect with the platform and buy their chosen NFT for a fraction of the actual cost and repay the pending amount in any crypto over 3 months with interest. -Users can buy NFT on Solarzu by simply copying and pasting the URL of that NFT

* They can find the BNPL details after selecting the NFT
* Solarzu allows users to make a downpayment and place a bid for their NFT on Opensea testnet
* Polygon chain helps users to buy NFTs using Matic which makes the transactions cheaper and faster

##### [Live link](https://solarzu-moralis-hackathon.vercel.app/)  

## How we built it
We built Solarzu using Next and Tailwind CSS for frontend

* Solidity for smart contracts and hardhat for testing and deploying the smart contracts to Mumbai testnet.([link](https://mumbai.polygonscan.com/address/0x14751F6bF4c4F7E5d2c94EaebBd2C94c7128F147#code))
* The Dapp uses the Opensea API for interaction with opensea and ethers for interaction of smart contract with frontend
* It uses Moralis IPFS Api for storing data in IPFS .
* It uses Moralis Auth Api for user metamask auth.
* It uses Covalent Endpoint A for getting metadata of the NFT.


The way it works on POLYGON is -> When the user enters amount to place a bid for the NFT in the form of ETH we fetch the price and converts it into matic using coingecko-api and the user can view that price in the form of USD.

* But the transaction is taking place on the polygon chain using matic and the bid on the NFT will be made in the form of WETH on the marketplace as the NFT is minted on ETH blockchain.
* So we are enabling polygon matic users to buy NFTs on Ethereum without the hassle of converting their crypto.



## Getting Started

First install node modules and run the development server:

```bash
npm i && npm run dev
# or
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


