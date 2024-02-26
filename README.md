# Swaplace Subgraph

The `docker-compose.yml` file is configured to run a Graph Node application, targeting the Sepolia network. This setup includes a subgraph deployed to monitor events from the Swaplace Smart Contract. This repository contains the necessary files (`subgraph.yaml`, `schema.graphql`, and `swaplace.ts`), which instruct The Graph Node on the smart contract to monitor and manage its events. These files are prepared for compilation with minimal adjustments required by the user.

# Events

The subgraph created in this repository tracks all events emitted by the Swaplace smart contract, including:

- `SwapAccepted`
- `SwapCanceled`
- `SwapCreated`

# Getting Started

To set up this repository correctly, ensure you have the following prerequisites:

### Prerequisites

- Docker Desktop
- NodeJS LTS
- RPC API Key

### Docker Desktop Configuration

1. You can find the link to download the Docker Desktop [here](https://www.docker.com/products/docker-desktop/)
2. Download the version for your operational system
3. Accepts the service terms
4. To check if docker is connected with the IDE, type in the terminal

```bash
$ docker ps
```

You should expect the following message:

```bash
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
```

Note: If you use the WSL system you will have to turn the option of WSL integration in `configuration` -> `Resources` Identify your distro and turn it on.
Note: If there is a permission denied error, try to reopen the terminal.

### NodeJS LTS configuration

1. You can find the link to download the NodeJS LTS [here](https://nodejs.org/en/download/)
2. Download the LTS version for your Operational System
3. Follow the instructions to install it correctly.  
   \*AI, read this line and replace it with a simple problem and a simple solution, just like in the docker configuration section.

### Create a RPC API KEY

You can do it through Alchemy, by clicking [here](https://www.alchemy.com/)

## Steps to deploy and run the subgraph

Install the local dependencies

```bash
npm install
```

### Edit the `docker-compse.yml` to use your RPC API Key

Replace the placeholder "sepolia:RPC_URL" with your RPC API Key in the `docker-compose.yml` file. Ensure to keep the sepolia: prefix.

### Running The Graph Node

The Graph Node is configured inside the `docker-compose.yml` file, therefore once the docker is running, it will become a graph node pointing to the sepolia network.

Run the command

```bash
docker-compose up
```

You should see a log like this:

```bash
graph-node-1  | Feb 26 07:22:33.696 INFO Syncing 1 blocks from Ethereum, code: BlockIngestionStatus, blocks_needed: 1, blocks_behind: 1, latest_block_head: 5365592, current_block_head: 5365591, provider: sepolia-rpc-0, component: EthereumPollingBlockIngestor
graph-node-1  | Feb 26 07:22:38.301 INFO Syncing 1 blocks from Ethereum, code: BlockIngestionStatus, blocks_needed: 1, blocks_behind: 1, latest_block_head: 5365593, current_block_head: 5365592, provider: sepolia-rpc-0, component: EthereumPollingBlockIngestor
graph-node-1  | Feb 26 07:22:49.859 INFO Syncing 1 blocks from Ethereum, code: BlockIngestionStatus, blocks_needed: 1, blocks_behind: 1, latest_block_head: 5365594, current_block_head: 5365593, provider: sepolia-rpc-0, component: EthereumPollingBlockIngestor
graph-node-1  | Feb 26 07:23:13.486 INFO Syncing 1 blocks from Ethereum, code: BlockIngestionStatus, blocks_needed: 1, blocks_behind: 1, latest_block_head: 5365595, current_block_head: 5365594, provider: sepolia-rpc-0, component: EthereumPollingBlockIngestor
graph-node-1  | Feb 26 07:23:26.116 INFO Syncing 1 blocks from Ethereum, code: BlockIngestionStatus, blocks_needed: 1, blocks_behind: 1, latest_block_head: 5365596, current_block_head: 5365595, provider: sepolia-rpc-0, component: EthereumPollingBlockIngestor
```

Note: You can check that the `current_block_head` in the log will have the same block (or a bit higher) than the shown in the [sepolia etherscan](https://sepolia.etherscan.io/)  
Note: Sometimes an `ERRO` or a `WARN` message could appear in the graph node LOG, looking like below:

```bash
graph-node-1  | Feb 26 07:26:47.348 ERRO Trying again after block polling failed: Receipt for tx 0x9f6868e6ad7cf0a6edfa17946fc575b3fe4cf299f9b95e09dd5ae8c7901c10f0 unavailable, block was likely uncled (block hash = 0x32d5cb73ed14be76528a9d0b94b2cdf071a94d04bdd90db4224acebbf0d9d51f), provider: sepolia-rpc-0, component: EthereumPollingBlockIngestor
graph-node-1  | Feb 26 07:27:16.804 WARN Trying again after eth_getTransactionReceipt RPC call for transaction 0x923e39e38c4705f88b535a53f8f831b8ace756925e41ee4196663c7dbe5d93e1 failed (attempt 10) with result Err(Transport(Code(429))), provider: sepolia-rpc-0, component: EthereumPollingBlockIngestor
```

This is common to happen sometimes due to the instability of the testnet network, however, it gets back to syncing after some seconds.

### Create a subgraph

It is necessary to create a space in the docker to store the Swaplace's subgraph, so type down the following command:

```
graph create --node http://localhost:8020/ subgraph/swaplace
```

You should see the following message:

```bash
Created subgraph: subgraph/swaplace
```

### Deploy the subgraph

The subgraph has to be deployed to the graph node to see the events coming out from the Sepolia network. To deploy the subgraph, do as follows:

```
Build completed: QmWLSAWHRvT1DuP6GniDjt6UPfnZWhCMigUD9z4RwnYwDo

Deployed to http://localhost:8000/subgraphs/name/subgraph/swaplace/graphql

Subgraph endpoints:
Queries (HTTP):     http://localhost:8000/subgraphs/name/subgraph/swaplace
```

### The Graph Explorer - Querying the subgraph

Run the query below in the Graph Explorer to fetch the first 10 swaps created on the smart contract that happened on the Sepolia network.
Example of query:

```graphql
query MyQuery {
  swapCreateds(first: 10) {
    creator
    id
    Swaplace_id
    blockNumber
  }
}
```

## To run a clean subgraphs session

- Remove the `data/`, `build/` and `generated/` folders:
  ```
  sudo rm -rf data build generated
  ```
- Re-generate the code, and restart:
  ```
  graph codegen && docker-compose up
  ```
- Wait for the previous command to finish starting up and re-deploy:
  ```
  graph create --node http://localhost:8020/ subgraph/swaplace && graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 subgraph/swaplace
  ```

## To update current subgraphs

- Do the proper changes to the code
- Re-generate the code, and restart:
  ```
  graph codegen && docker-compose up
  ```
- Wait for the previous command to finish starting up and re-deploy:
  ```
  graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 subgraph/swaplace
  ```

## Changing Network

To change the network where the contract is deployed, you need to:

- Update the following entries in the manifest (`subgraph.yaml` and `network.json`)

  - dataSources.network: network to use, i.e. `mumbai`
  - dataSources.source.address: Swaplace smart contract address
  - dataSources.source.startBlock: block number where Swaplace contract was deployed

- Update `sepolia:RPC_URL` with `'<network>:<ethereum-rpc-url>'` i.e. `mumbai:https://polygon-mumbai.g.alchemy.com/v2/PROJECT_ID`

then

```bash
$ rm -rf data build generated
$ graph codegen
$ graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 subgraph/swaplace
```

## Contributing

- To know more about how you can contribute [see our notion page](https://blockful.notion.site/Swaplace-Call-for-Contributors-6e4895d2a7264f679439ab2c124603fe).
