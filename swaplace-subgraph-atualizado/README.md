# swaplace-subgraph

## Pre requisites:

  #### Install Graph cli using NPM

#### NPM

```bash
$ npm install -g @graphprotocol/graph-cli
```

[Docker Desktop](https://docs.docker.com/get-docker/)

[nodeJS LTS](https://nodejs.org/en/download)

## Install dependencies

```bash
npm i
```

## Setting Up Local Blockchain

Run a Hardhat node:

```bash
npx hardhat node
```

> **_NOTE:_** Note: Use the first account to avoid errors.
## Deploying Smart Contracts to Local Blockchain

Deploy the Swaplace contract

```bash
npx hardhat run --network localhost scripts/deploy.ts
```

## Install subgraph dependencies
```bash
cd /swaplace-subgraph/
npm i
```

## Running docker

Go to the graph-node directory

```bash
cd swaplace-subgraph/graph-node
```

#### Make sure there is not any residual file remaining in the directory

```bash
rm -rf graph-node/data/
```

#### start the docker

```bash
docker-compose up
```

  You should see the log looking like this for the docker:


        *graph-node-graph-node-1  |* Oct 15 04:44:57.420 INFO Downloading latest blocks from Ethereum, this may take a few minutes..., provider: localhost-rpc-0, component: EthereumPollingBlockIngestor

  And looking something like this for hardhat:

        eth_blockNumber (2)
        eth_getBlockByNumber (19)
        eth_blockNumber (2)
        eth_getBlockByNumber (14)

## Create a subgraph

```
cd swaplace-subgraph
graph create --node http://localhost:8020/ subgraph/swaplace
```

## Deploy the subgraph

```
graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 subgraph/swaplace
```

## The Graph Explorer

Run the test scripts on the local network to generate events to check on The Graph Explorer with queries.
Example of query:

    query MyQuery {
  swapCreateds(first: 2) {
    creator
    id
    Swaplace_id
    blockNumber
  }
}

## In case you update the smart contract with new events to be added

1. Cancel and clean the docker.
   In the `graph-node` folder running the docker, press `crtl + c` and type `docker-compose down`, then delete the data folder `rm -rf /data`
2. Update the smart contract and compile it
3. Update the files `swaplace-subgraph/networks.json` and the `swaplace-subgraph/subgraph.yaml` with the new address
4. Copy and paste the new ABI on `swaplace-subgraph/abis/Swaplace.json`
5. Update the file `swaplace-subgraph/schema.graphql` with the new entities
6. Update the file `swaplace-subgraph/subgraph.ymal` with the new event handlers
7. Update the file `swaplace-subgraph/src/swaplace.ts` with the new functions and imports
8. Run the commands `graph codegen` and `graph build --network localhost` in the `swaplace-subgraph` folder.
9. Deploy the new version of the subgraph `graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 subgraph/swaplace`

## Tesnet and Mainnet

1. Access the studio https://thegraph.com/studio/, connect your wallet and create a subgraph
2. Give a name and select a network
3. Run the command line: `graph init --studio <your subgraph name>`
4. Choose the protocol you want to deploy the subgraph
5. Create the slug which will be the unique identifier your subgraph will be identified by
6. Create the name of the directory that will have the subgraph files
7. Choose the network you want to deploy the subgraph
8. Fill the address field with the smart contract deployed on the network
9. Set the path to the ABI file
10. Fill the block in which the contract was deployed to
11. Give the name of the contract
12. Press "Y" to index events as entities
13. Press "n" if you don't want to add another contract.
14. Run the command `graph auth --studio <your subgraph deploy key>`
15. Go to the subgraph's directory `cd swaplace-subgraph`
16. Run the commands `graph codegen && graph build` to generate the necessary files
17. Run the command `graph deploy --studio swaplace-subgraph` to deploy the subgraph 

Use The Graph Studio to play around with the queries. You can use the query mentioned earlier to start.
