# final project - escrow System

## Deployed version url:

divine-cherry-7104.on.fleek.co

## How to run this project locally:

### Prerequisites

- Node.js >= v6.14.5
- Truffle and Ganache
- live-server
- `git checkout master`

### Contracts

- run `truffle compile` to download version compiler
- run local ganache in port `8545` 
- trufle develop
- truffle migrate 
- Run tests in Truffle console: `test`
- run `live-server` in project root to 

### Frontend

- run `npm install -g live-server`

### How to populate locally deployed contract with listings
for run front-end:
- `cd client` for run folder that there is `index.html` 
- open cmd and run `live-server` it open automatically your index.html on `http://127.0.0.1:8080/`
for the back-end part :
- `truffle compile` to download the veriosn of the truffle and compile
- `truffle develop` for develop
- you can see the `package.json` that we named `escrowSystem.json` on build/contracts folder(the abi is there)
- open ganache gui 
- `truffle migrate ` 
- use the wallet on ganache and import them into the metamsk 
- use the imported address to work with project


## Screencast link
how button connect work and accept metamask:
https://youtu.be/m8RfAtpv85U
how to work with:
https://youtu.be/WTv84MzZHwc

## Public Ethereum wallet for certification:

0xACb8A9BA0F3Cf35A7415c1C24196E32779653e39

## Project description

escrow system is an smart contract between two people that want to work and like that...
and they do not trust to each other,they choose another person to judge. employer/worker , trust to this person and if there is any problem for this smart , judgement judge that the work is done or not.

## Simple workflow

1. enter the site 
2. login to metamask 
3. make your contract (you need to pay gas and address judgement and deposit that worker not done work,for lose time employer can get it)
4. next person who want to get the work,box and etc login to metamask and open site and complete (part deposit) with number contract and deposit.
5. when time is up,employer complete part confirm with his two parameter like number contract and true(if work is done) or false(work is not done).
6. if employer accept it it's finishe and worker can get his money from part widthdraw-worker.if not judgement judge about this in part judge that true is done and false mean not finishe and employer can get money+deposit.

## Directory structure

- `client`: project's front-end
- `contracts`:Smart contracts that are deployed
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Environment variables (not needed for running project locally)

```
ROPSTEN_INFURA_PROJECT_ID=
ROPSTEN_MNEMONIC=
```


## TODO features

- employer payments tracking
- judgement
- Fund withdrawal





