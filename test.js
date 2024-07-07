// const { ethers } = require('ethers');

const connectBtn = document.getElementById("connectBtn");

connectBtn.addEventListener("click", async () => {
    try {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install a web3 wallet like MetaMask.");
            return;
        }    provider = new ethers.providers.Web3Provider(window.ethereum)
        account = await provider.send("eth_requestAccounts", []);
        console.log(account[0]);
        wallet_address = account[0];
        console.log("Connected to wallet")
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
});
    
let optimism = "0xc110e7faa95680c79937ccaca3d1cab7902be25e";
let BNB = "0xae4789D7C596fdED0e135Bca007152c87a0756f5";
let arbitrum = "0x233888F5Dc1d3C0360b559aBc029675290DAFa70";
let polygon = "0x0cb0354E9C51960a7875724343dfC37B93d32609";
let base = "0x0cb0354E9C51960a7875724343dfC37B93d32609";
let scroll = "0xc0faBF14f8ad908b2dCE4C8aA2e7c1a6bD069957";

const abi = [
    "function quoteBridge(uint32 _destination, uint amount) external view returns (uint fee)",
    "function bridgeETH(uint32 _destination, uint amount) public payable returns (bytes32 messageId)",
    "function bridgeWETH(uint32 _destination, uint amount) public payable returns (bytes32 messageId)",
]
let contractAddress = "0x233888F5Dc1d3C0360b559aBc029675290DAFa70";

async function getBridgeFee(destinationChain, amount) {
    // const signer = await connectWallet();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const quote = await contract.quoteBridge(destinationChain, amount);
    console.log(quote);
    return quote;
  }

async function getQuote() {
const amount = ethers.utils.parseEther("0.01");
const quotee = getBridgeFee(10, amount);
}