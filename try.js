const connectBtn = document.getElementById("connectBtn");
let provider;
let signer;
let wallet_address;
connectBtn.addEventListener("click", async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install a web3 wallet like MetaMask.");
      return;
    }
    provider = new ethers.providers.Web3Provider(window.ethereum)
    account = await provider.send("eth_requestAccounts", []);
    console.log(account[0]);
    signer = provider.getSigner();
    wallet_address = account[0];
    console.log("Connected to wallet")
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
});

const optimism_id = 10;
const binance_smart_chain_id = 56;
const arbitrum_id = 42161;
const polygon_id = 137;
const base_id = 8453;
const scroll_id = 534352;
const manta_pacific_id = 169;
const mode_id = 34443;
const ancient8_id = 888888888;
const zetachain_id = 7000;
const redstone_id = 690;

const optimism = "0xc110e7faa95680c79937ccaca3d1cab7902be25e";
const binance_smart_chain = "0xae4789D7C596fdED0e135Bca007152c87a0756f5";
const arbitrum = "0x233888F5Dc1d3C0360b559aBc029675290DAFa70";
const polygon = "0x0cb0354E9C51960a7875724343dfC37B93d32609";
const base = "0x0cb0354E9C51960a7875724343dfC37B93d32609";
const scroll_zk = "0xc0faBF14f8ad908b2dCE4C8aA2e7c1a6bD069957";
const manta_pacific = "0x75DAa6Eb3748C33b5fB3716465DAD9658BE42A8D";
const mode = "0x9970cB23f10dBd95B8A3E643f3A6A6ABB6f3cB9b";
const ancient8 = "0x7dFb5E7808B5eb4fB8b9e7169537575f6fF1a218";
const zetachain = "0xe35030B407C96C037190B63646AC1Eb34F43Cc2b";
const redstone = "0x49bF21531991742b0c1797230758992769771CcD";

const addressesMapping = {
  10: "0xc110e7faa95680c79937ccaca3d1cab7902be25e", // optimism_id
  56: "0xae4789D7C596fdED0e135Bca007152c87a0756f5", // binance_smart_chain_id
  42161: "0x233888F5Dc1d3C0360b559aBc029675290DAFa70", // arbitrum_id
  137: "0x0cb0354E9C51960a7875724343dfC37B93d32609", // polygon_id
  8453: "0x0cb0354E9C51960a7875724343dfC37B93d32609", // base_id
  534352: "0xc0faBF14f8ad908b2dCE4C8aA2e7c1a6bD069957", // scroll_id
  169: "0x75DAa6Eb3748C33b5fB3716465DAD9658BE42A8D", // manta_pacific_id
  34443: "0x9970cB23f10dBd95B8A3E643f3A6A6ABB6f3cB9b", // mode_id
  888888888: "0x7dFb5E7808B5eb4fB8b9e7169537575f6fF1a218", // ancient8_id
  7000: "0xe35030B407C96C037190B63646AC1Eb34F43Cc2b", // zetachain_id
  690: "0x49bF21531991742b0c1797230758992769771CcD" // redstone_id
};

const abi = [
  "function quoteBridge(uint32 _destination, uint amount) external view returns (uint fee)",
  "function bridgeETH(uint32 _destination, uint amount) public payable returns (bytes32 messageId)",
  "function bridgeWETH(uint32 _destination, uint amount) public payable returns (bytes32 messageId)",
]
// const token = new ethers.Contract(tokenAddress, abi, provider);

async function getQuote() {

  const contract = new ethers.Contract(base, abi, signer);
  const domain = 10; // Optimism 
  const amount = ethers.utils.parseEther("0.001"); // Will bridge 0.01 ETH
  const quote = await contract.quoteBridge(domain, amount);
  // only for L2s (have eth as native token)
  const tx = await contract.bridgeETH(domain, amount, { value: amount.add(quote) });
}
async function transaction_l2(source_chain, destination_chain, amount1) {
  const contract = new ethers.Contract(addressesMapping[source_chain], abi, signer);
  const amount = ethers.utils.parseEther(amount1);
  const quote = await contract.quoteBridge(destination_chain, amount);
  console.log(quote);
  const tx = await contract.bridgeETH(destination_chain, amount, { value: amount.add(quote) });
}
// only for alt L1s (bsc, polygon, etc.) 
// TODO: ensure bridge contract is approved to spend WETH 
// const tx = await contract.bridgeWETH(domain, amount, { value: quote });

const abi_erc20 = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function allowance(address owner, address spender) view returns (uint256)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];



async function checkAllowance(tokenAddress, spenderAddress, ownerAddress) {
  try {
    if (!provider) {
      console.error("Provider not initialized. Please connect to a node first.");
      return null;
    }

    const token = new ethers.Contract(tokenAddress, abi_erc20, provider);
    console.log("Token:", token);

    const allowance = await token.allowance(ownerAddress, spenderAddress);
    console.log("Allowance:", allowance);

    return allowance;
  } catch (error) {
    console.error("Error checking allowance:", error);
    return null;
  }
}


async function setAllowance(tokenAddress, spenderAddress, amount) {
  try {
    const token = new ethers.Contract(tokenAddress, abi_erc20, provider);
    const signer = provider.getSigner();
    const allowanceAmount = ethers.utils.parseUnits(amount.toString(), 18);
    console.log("Allowance Amount:", allowanceAmount.toString());
    const tx = await token.connect(signer).approve(spenderAddress, allowanceAmount);
    await tx.wait();
    console.log("Approval Successful for", allowanceAmount.toString(), "tokens");
  } catch (error) {
    console.error("Error setting approval:", error);
  }
}

const weth_add = {
  137: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
  56: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
};

async function transaction_alt_l1(source_chain, destination_chain, amount1) {
  const contract = new ethers.Contract(addressesMapping[source_chain], abi, signer);
  const amount = ethers.utils.parseEther(amount1);
  console.log(weth_add[source_chain], addressesMapping[source_chain], wallet_address)
  const allowance = await checkAllowance(weth_add[source_chain], addressesMapping[source_chain], wallet_address);
  const approval = ethers.utils.parseEther(allowance.toString());
  console.log("amount = ", amount);
  console.log("approval = ", approval.toString());

  if (approval.lt(amount)) {
    console.log("Approval Required");
    await setAllowance(weth_add[source_chain], addressesMapping[source_chain], amount1);
  }

  console.log("Approval Done")
  const quote = await contract.quoteBridge(destination_chain, amount);
  console.log("quote = ", quote);
  const tx = await contract.bridgeWETH(destination_chain, amount, { value: quote });
}

async function l2() {
  transaction_l2(base_id, optimism_id, "0.0001");
}
async function l1() {
  transaction_alt_l1(polygon_id, base_id, "0.0001");
}



async function _constructor(src, src_token, src_amount, dest, dest_token, wallet_address) {

  const baseUrl = "https://api.dln.trade/v1.0/dln/order/create-tx";
  const queryParams = {
    srcChainId: src,
    srcChainTokenIn: src_token,
    srcChainTokenInAmount: src_amount,
    dstChainId: dest,
    dstChainTokenOut: dest_token,
    dstChainTokenOutRecipient: wallet_address,
    srcChainOrderAuthorityAddress: wallet_address,
    dstChainOrderAuthorityAddress: wallet_address,
    affiliateFeePercent: 0.01,
    affiliateFeeRecipient: "0xdd2a4dbf3fdc4ae3b34a11797f51350a4306f1bb"
  };
  const url = new URL(baseUrl); 
  url.search = new URLSearchParams(queryParams);
  return await getQuote(url);
}
async function getQuote(url) {
  let response = await fetch(url, {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  })
  const quote = await response.json();
  if (response.ok) {
    console.log('debridge Quote:', quote);
    const valueBN = ethers.BigNumber.from(quote.tx.value);
    valueHex = ethers.utils.hexlify(valueBN);
    const sentTx = await signer.sendTransaction({
      to: quote.tx.to,
      data: quote.tx.data,
      value: valueBN,
      gasLimit: 160000
    });
    console.log("Transaction sent! Hash:", sentTx.hash);
  }
  else {
    console.log('There was a problem with the fetch operation:', error);
  }
  return quote;
}

async function debridge() {

  _constructor(8453, "0x0000000000000000000000000000000000000000", "1000000000000000", 42161, "0x0000000000000000000000000000000000000000", wallet_address)

}


async function _constructor_lifi(src, src_token, src_amount, dest, dest_token,wallet_address) {

  const baseUrl = "https://li.quest/v1/quote";
  const queryParams ={
      fromChain: src,
      fromToken: src_token,
      fromAmount: src_amount,
      toChain: dest,
      toToken: dest_token,
      fromAddress:wallet_address
  };
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(queryParams);
  return await getQuote_lifi(url);
}
async function getQuote_lifi(url) {
  let response = await fetch(url, {
      method: 'GET',
      headers: { 'accept': 'application/json' },
  })
  const quote = await response.json();
  if(response.ok){
  console.log('lifi Quote:', quote);
  console.log('estimated out: ', quote.estimate.toAmount)
  console.log("values for transaction: ",quote.transactionRequest)
  const valueBN = ethers.BigNumber.from(quote.transactionRequest.value);
  valueHex = ethers.utils.hexlify(valueBN);
  const sentTx = await signer.sendTransaction({
    to: quote.transactionRequest.to,
    data: quote.transactionRequest.data,
    value: valueBN,
    gasLimit: quote.transactionRequest.gasLimit,
    gasPrice: quote.transactionRequest.gasPrice
  });
  console.log("Transaction sent! Hash:", sentTx.hash);
  return quote;
  }
  else{
      console.log('There was a problem with the fetch operation:', error);
  }
}

async function jumper() {
_constructor_lifi(8453,"0x0000000000000000000000000000000000000000","1000000000000000",42161,"0x0000000000000000000000000000000000000000","address")
}


