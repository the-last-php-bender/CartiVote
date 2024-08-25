<a id="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
<!-- Dont forget to add the project logo -->
  <h3 align="center">CartiVote dapp</h3>
  <p align="center">
    The CartiVote (Cartesi Vote) dapp documentation.
  </p>
</div>

## About
<p>
    CartiVote is a decentralized application (dapp) powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">Cartesi Rollups</a> technology.
</p>
<p> 
    It's a blockchain-based voting system designed to ensure secure, transparent, and reliable voting processes. Users can add candidates, cast votes, and determine election results, all while leveraging the benefits of blockchain technology such as ownership assurance and decentralized operations.
</p>

## Getting Started

Below you'll find instructions on how to set up this dapp locally.

### Prerequisites

Here are some packages you need to have installed on your PC:

* [nodejs](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) 

* [docker](https://docs.docker.com/get-docker/)

* [cartesi-cli](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
  ```sh
  npm install -g @cartesi/cli
  ```

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/OsmanRodrigues/carti-vote-dapp.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Build and run the dapp via `cartesi-cli`
   ```sh
   cartesi build 
   ```
   and
   ```sh
   cartesi run 
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Here you can access examples of dapp communication and resource usage.

### Advanced Handlers
* #### createCandidate
  ```js
    description — Create a new candidate.
    param data — {public_key: address, name: string} 
  ```
  data sample
  ```json
    {
        "action":"createCandidate", 
        "data":{
            "public_key":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "name":"John Doe"
        }
    } 
  ```
  hex sample
  ``` 
  0x7b22616374696f6e223a2263726561746543616e646964222c202264617461223a7b227075626c69636b6570223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c20226e616d65223a224a6f686e20446f65227d7d
  ```
  interact
    - *via `cartesi cli`*, access your terminal and input these instructions:
  
    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a2263726561746543616e646964222c202264617461223a7b227075626c69636b6570223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c20226e616d65223a224a6f686e20446f65227d7d
    ```
    - *via `cast`*, access your terminal and input this single line instruction:
    
    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a2263726561746543616e646964222c202264617461223a7b227075626c69636b6570223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c20226e616d65223a224a6f686e20446f65227d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

* #### castVote
  ```js
    description — Cast a vote for a candidate.
    param required — { public_key: address}
  ```
  data sample
  ```json
    {
        "action":"castVote", 
        "data":{
            "public_key":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        }
    }
  ```
  hex sample
  ``` 
  0x7b22616374696f6e223a2263617374566f7465222c202264617461223a7b22766f7465725f7075626c69636b65223a223078313233343536373839306162636465663132333435363738393061626364656678223c20207075626c69636b223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636227d7d
  ``` 
  interact
    - *via `cartesi cli`*, access your terminal and input these instructions:
  
    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a2263617374566f7465222c202264617461223a7b22766f7465725f7075626c69636b65223a223078313233343536373839306162636465663132333435363738393061626364656678223c20207075626c69636b223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636227d7d
    ```
    - *via `cast`*, access your terminal and input this single line instruction:
    
    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a2263617374566f7465222c202264617461223a7b22766f7465725f7075626c69636b65223a223078313233343536373839306162636465663132333435363738393061626364656678223c20207075626c69636b223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636227d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

### Inspect Handlers
* #### getAllCandidates
  ```js
    description — Get all registered candidates.
  ```
  returned hex sample
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        "processed_input_count": 2
    }
  ```
  converted payload sample
  ```json 
    [
        {
            "public_key":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "name":"John Doe",
            "voteCount":10
        }
    ]
  ```
  interact
    - Access the Cartesi inspect endpoint on your browser:
  ```sh 
  http://localhost:8080/inspect/getAllCandidates
  ```
  ```
  * #### getWinner
  ```js
    description — Get all registered candidates.
  ```
  returned hex sample
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        "processed_input_count": 2
    }
  ```
  converted payload sample
  ```json 
    [
        {
            "public_key":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "name":"John Doe",
            "voteCount":10
        }
    ]
  ```
  interact
    - Access the Cartesi inspect endpoint on your browser:
  ```sh 
  http://localhost:8080/inspect/getWinner
  ```

## Acknowledgements

This project utilizes [Cartesi](https://docs.cartesi.io/cartesi-rollups/1.3/), a platform that enables the development of decentralized applications with advanced computational capabilities. Cartesi's Rollups technology powers the CartiVote dapp, ensuring secure, scalable, and efficient blockchain-based voting processes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>