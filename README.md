![Surepay LOGO](https://green-enthusiastic-mite-198.mypinata.cloud/ipfs/QmSj1rEkNxw3XGHwndVtREKCcNEunXMVSieSXm9BLzGd2i)

# Surepay

Surepay is a wallet that wants to address the problem of sending tokens to the wrong addresses
### Installation 
Clone the repository: `git clone https://github.com/meisamtaher/Surepay.git`
## Front-end 
2. Go to front folder: `cd front`
3. install packages: `npm i`
4. run local react app: `npm run dev`

## Deploying smart contract wallet 
1. go to smartcontracts folder: `cd smartContract`
2. install packages: `npm i`
3. deploy smart contract wallets: `npx hardhat run scripts/smart-wallet/deploy.ts` you can use `--network <networkname>` to deploy on desired network 
4. deploy escrow contract: `npx hardhat run scripts/deploy_Escrow.ts`


