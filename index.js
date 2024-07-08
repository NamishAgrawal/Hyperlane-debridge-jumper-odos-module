const connectBtn = document.getElementById("connectBtn");
let provider;
let signer;
let inputDecimals;
let wallet_address;
let currentChain;
let __chainId;
const switchNetwork = async (networkId) => {
  try {
    if (!window.ethereum) {
      console.error("MetaMask provider not found");
      return;
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${networkId.toString(16)}` }],
    });

    window.ethereum.on('chainChanged', (chainId) => {
      console.log(`Switched to chainId: ${chainId}`);
      __chainId = networkId;
      // alert(`Switched to chainId: ${chainId}`);
    });

    console.log(`Switched to networkId: ${networkId}`);
  } catch (error) {
    console.error("Error switching network:", error);
  }
};

connectBtn.addEventListener("click", async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install a web3 wallet like MetaMask.");
      return;
    }
    provider = new ethers.providers.Web3Provider(window.ethereum,"any")
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

const networkIdToName = {

  "optimism": 10,
  "bsc": 56,
  "arb": 42161,
  "matic": 137,
  "base": 8453,
  "scroll": 534352,
  "manta": 169,
  "mode": 34443,
  "ancient8": 888888888,
  "zetachain": 7000,
  "redstone": 690,
  "linea": 59144

};

const abi = [
  "function quoteBridge(uint32 _destination, uint amount) external view returns (uint fee)",
  "function bridgeETH(uint32 _destination, uint amount) public payable returns (bytes32 messageId)",
  "function bridgeWETH(uint32 _destination, uint amount) public payable returns (bytes32 messageId)",
]


const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];


const top_base = ["0x0000000000000000000000000000000000000000", "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "0x50c5725949a6f0c72e6c4a641f24049a917db0cb", "0xb6fe221fe9eef5aba221c348ba20a1bf5e73624c", "0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91"];//eth,usd,usd,eth,w
const top_arb = ["0x0000000000000000000000000000000000000000", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9", "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8", "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f", "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4"];
const top_optimism = ["0x0000000000000000000000000000000000000000", "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58", "0x0b2c639c533813f4aa9d7837caf62653d097ff85", "0x68f180fcce6836688e9084f035309e29bf0a2095", "0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6"];
const top_bsc = ["0x0000000000000000000000000000000000000000", "0x2170ed0880ac9a755fd29b2688956bd959f933f8", "0x55d398326f99059ff775485246999027b3197955", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"];
const top_matic = ["0x0000000000000000000000000000000000000000", "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3", "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"];
const top_scroll = ["0x0000000000000000000000000000000000000000", "0xf55bec9cafdbe8730f096aa55dad6d22d44099df", "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4", "0xf610a9dfb7c89644979b4a0f27063e9e7d7cda32", "0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1"];
const top_mode = ["0x0000000000000000000000000000000000000000", "0xd988097fb8612cc24eeC14542bC03424c656005f", "0xf0F161fDA2712DB8b566946122a5af183995e2eD"];
const top_linea = ["0x0000000000000000000000000000000000000000", "0xA219439258ca9da29E9Cc4cE5596924745e12B93", "0x176211869cA2b568f2A7D4EE941E073a821EE1ff", "0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4", "0x5B16228B94b68C7cE33AF2ACc5663eBdE4dCFA2d"];

function choseTopToken(chainId) {
  switch (chainId) {
    case 8453: return top_base[Math.floor(Math.random() * top_base.length)];
      break;
    case 42161: return top_arb[Math.floor(Math.random() * top_arb.length)];
      break;
    case 10: return top_optimism[Math.floor(Math.random() * top_optimism.length)];
      break;
    case 56: return top_bsc[Math.floor(Math.random() * top_bsc.length)];
      break;
    case 137: return top_matic[Math.floor(Math.random() * top_matic.length)];
      break;
    case 534352: return top_scroll[Math.floor(Math.random() * top_scroll.length)];
      break;
    case 34443: return top_mode[Math.floor(Math.random() * top_mode.length)];
      break;
    case 59144: return top_linea[Math.floor(Math.random() * top_linea.length)];
      break;
    default: return "0x0000000000000000000000000000000000000000";
  }
}
async function getQuote() {

  const contract = new ethers.Contract(base, abi, signer);
  const domain = 10;
  const amount = ethers.utils.parseEther("0.001");
  const quote = await contract.quoteBridge(domain, amount);
  const tx = await contract.bridgeETH(domain, amount, { value: amount.add(quote) });
}
async function transaction_l2(source_chain, destination_chain, amount1) {
  const contract = new ethers.Contract(addressesMapping[source_chain], abi, signer);
  const amount = amount1;
  const quote = await contract.quoteBridge(destination_chain, amount);
  console.log(quote);
  const tx = await contract.bridgeETH(destination_chain, amount, { value: amount.add(quote) });
}

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


async function getPrice(addr) {
  try {
    const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
    const roundData = await priceFeed.latestRoundData();
    console.log("Latest Round Data:", roundData);
  } catch (error) {
    console.error("Error fetching price data:", error);
  }
}



async function checkBalance(tokenAddress, ownerAddress) {
  try {
    if (!provider) {
      console.error("Provider not initialized. Please connect to a node first.");
      return null;
    }
    if (tokenAddress == "0x0000000000000000000000000000000000000000") {
      console.log("Native Token");
      return getEthBalance(ownerAddress);
    }
    const token = new ethers.Contract(tokenAddress, abi_erc20, provider);
    console.log("Token:", token);
    const balance = await token.balanceOf(ownerAddress);
    const decimals = await token.decimals();
    console.log("Balance:", balance);
    return balance;
  } catch (error) {
    console.error("Error checking balance:", error);
    return null;
  }
}
function findMaxIndex(arr) {
  if (!arr || arr.length === 0) {
    return -1;
  }

  let maxIndex = 1;
  let maxValue = arr[1];

  for (let i = 2; i < arr.length; i++) {
    if (arr[i].gt(maxValue)) {
      maxIndex = i;
      maxValue = arr[i];
    }
  }

  return maxIndex;
}
async function getMaxBalance(chainid, wallet_address) {
  let arr;
  switch (chainid) {
    case 8453: arr = top_base;
      break;
    case 42161: arr = top_arb;
      break;
    case 10: arr = top_optimism;
      break;
    case 56: arr = top_bsc;
      break;
    case 137: arr = top_matic;
      break;
    case 534352: arr = top_scroll;
      break;
    case 34443: arr = top_mode;
      break;
    case 59144: arr = top_linea;
      break;
    default: console.log("Invalid chain id");
  }
  console.log("arr = ", arr);
  balances = await getMaxBalanceHelper(arr, wallet_address);
  console.log("balances = ", balances);
  const maxIndex = findMaxIndex(balances);
  console.log("maxIndex = ", maxIndex)
  console.log("Max Balance:", balances[maxIndex]);
  return maxIndex
}
async function getEthBalance(walletAddress) {
  try {
    const balance = await ethereum.request({ method: 'eth_getBalance', params: [walletAddress, 'latest'] });
    console.log("ETH Balance:", balance);
    return ethers.BigNumber.from(balance);
  } catch (error) {
    console.error("Error getting ETH balance:", error);
    return ethers.BigNumber.from(0);
  }
}
async function getMaxBalanceHelper(arr, wallet_address) {
  for (let i = 0; i < arr.length; i++) {
    let balance;
    if (arr[i] == "0x0000000000000000000000000000000000000000") {
      balance = await getEthBalance(wallet_address);
      console.log("balance(native) = ", balance);
    }
    else {
      balance = await checkBalance(arr[i], wallet_address);
    }
    balances[i] = balance;
  }
  return balances;
}

async function convertAllToEth(chainId, wallet_address) {
  let maxIndex = await getMaxBalance(chainId, wallet_address);
  let arr;
  switch (chainId) {
    case 8453: arr = top_base;
      break;
    case 42161: arr = top_arb;
      break;
    case 10: arr = top_optimism;
      break;
    case 56: arr = top_bsc;
      break;
    case 137: arr = top_matic;
      break;
    case 534352: arr = top_scroll;
      break;
    case 34443: arr = top_mode;
      break;
    case 59144: arr = top_linea;
      break;
    default: console.log("Invalid chain id");
  }
  while (true) {
    let tokenAddress = arr[maxIndex];
    let balance = await checkBalance(tokenAddress, wallet_address);
    console.log("balance = ", balance);
    let balance1 = balance.toString();
    console.log("balance1 = ", balance1);
    if (balance1 == "0") {
      console.log("No balance to convert");
      return;
    }
    else {
      await odos(chainId, 0.3, 0, true, tokenAddress, "0x0000000000000000000000000000000000000000", balance1, wallet_address)
    }
  }
}

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

  const amount = amount1;
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



async function _constructor_lifi(src, src_token, src_amount, dest, dest_token, wallet_address) {

  const baseUrl = "https://li.quest/v1/quote";
  const queryParams = {
    fromChain: src,
    fromToken: src_token,
    fromAmount: src_amount,
    toChain: dest,
    toToken: dest_token,
    fromAddress: wallet_address
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
  if (response.ok) {
    console.log('lifi Quote:', quote);
    console.log('estimated out: ', quote.estimate.toAmount)
    console.log("values for transaction: ", quote.transactionRequest)
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
  else {
    console.log('There was a problem with the fetch operation:', error);
  }
}



async function odos(_chainId, _slippage, _referral_code, _compact, _input_address, _output_address, _input_amount, _user_address) {
  async function _constructor_odos(_chainId, _slippage, _referral_code, _compact, _input_address, _output_address, _input_amount, _user_address) {

    const quoteRequestBody = {
      chainId: _chainId,
      inputTokens: [
        {
          tokenAddress: _input_address,
          amount: _input_amount,
        }
      ],
      outputTokens: [
        {
          tokenAddress: _output_address,
          proportion: 1
        }
      ],
      userAddr: _user_address,
      slippageLimitPercent: _slippage,
      referralCode: _referral_code,
      compact: _compact,
    };
    return await getQuote(quoteRequestBody);
  }

  async function getQuote(quoteRequestBody) {
    const quoteUrl = 'https://api.odos.xyz/sor/quote/v2';

    const response = await fetch(
      quoteUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteRequestBody),
      });

    if (response.status === 200) {
      const quote = await response.json();

      return await quote;
    } else {
      console.error('Error in Quote:', response);
      return;
    }
  }

  async function makeTransaction(_chainId, _slippage, _referral_code, _compact, _input_address, _output_address, _input_amount, _user_address) {

    const quote = await _constructor_odos(_chainId, _slippage, _referral_code, _compact, _input_address, _output_address, _input_amount, _user_address)
    const address = _user_address;
    const pathId = quote.pathId;


    const transactionUrl = "https://api.odos.xyz/sor/assemble";
    const transactionRequestBody = {
      "pathId": pathId,
      "simulate": false,
      "userAddr": address
    };
    return await getTransaction(transactionRequestBody, transactionUrl);
  }
  async function getTransaction(transactionRequestBody, transactionUrl) {
    const response = await fetch(
      transactionUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionRequestBody),
      });

    if (response.status === 200) {
      const transaction = await response.json();
;
      return await transaction;
    } else {
      console.error('Error in Transaction:', response);
      return;
    }
  }
  const data = await makeTransaction(_chainId, _slippage, _referral_code, _compact, _input_address, _output_address, _input_amount, _user_address)

  try {
    erc20_inp = new ethers.Contract(_input_address, abi_erc20, provider);
    if (_input_address == "0x0000000000000000000000000000000000000000") {
      inputDecimals = 18;
    }
    else {
      inputDecimals = await erc20_inp.decimals();
    }
    console.log("Got the data:", data);
    let allowance;
    if (_input_address != "0x0000000000000000000000000000000000000000") {

      allowance = await checkAllowance(_input_address, data.transaction.to, wallet_address);
      const approval = ethers.utils.parseUnits(allowance.toString(), inputDecimals);
      console.log("amount = ", _input_amount);
      console.log("approval = ", approval.toString());

      if (approval.lt(ethers.utils.parseUnits(_input_amount, inputDecimals))) {
        console.log("Approval Required");
        await setAllowance(_input_address, data.transaction.to, _input_amount);
      }
    }
    let valueHex;
    if (data.transaction.value === "0") {
      valueHex = "0x0";
    } else {
      const valueBN = ethers.BigNumber.from(data.transaction.value);
      valueHex = ethers.utils.hexlify(valueBN);
    }
    const gasBN = ethers.BigNumber.from(data.transaction.gas);
    const gasHex = ethers.utils.hexlify(gasBN);
    const gasPBN = ethers.BigNumber.from(data.transaction.gasPrice);
    const gasPHex = ethers.utils.hexlify(gasPBN);
    const sentTx = await signer.sendTransaction({
      gasLimit: gasHex,
      gasPrice: gasPHex,
      to: data.transaction.to,
      data: data.transaction.data,
      value: valueHex,
      chainId: data.transaction.chainId,
    });
    console.log("Transaction sent! Hash:", sentTx.hash);

    const receipt = await sentTx.wait();
    console.log("Transaction confirmed! Block number:", receipt.blockNumber);
  } catch (error) {
    console.error("Error handling swap:", error);

  }

}



function selectThings(dataTx) {

  function selectRandomWithWeights(chains, weights) {
    const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
    const random = Math.random() * totalWeight;
    let sum = 0;
    for (let i = 0; i < chains.length; i++) {
      sum += weights[i];
      if (random < sum) {
        return chains[i];
      }
    }
    return null;
  }
  let currentChain = dataTx.chain;
  let actions = ["bridge", "swap"];
  let action = selectRandomWithWeights(actions, [0.3, 1]);
  if (currentChain == "base" || currentChain == "scroll") {
    if (Math.random() < 0.05) {
      action = "deploy";
    }
  }
  else if (currentChain == "manta" || currentChain == "ancient8" || currentChain == "zetachain" || currentChain == "redstone") {
    action = "bridge";
  }


  const chains = ["arb", "matic", "bsc", "eth", "optimism", "base", "scroll", "manta", "mode", "ancient8", "zetachain", "redstone", "linea"];
  const weights = [1, 1, 1, 0, 1, 1, 1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.7];
  let count = Array(chains.length).fill(0);
  let selectedChain = selectRandomWithWeights(chains, weights);
  while (selectedChain == currentChain) {
    selectedChain = selectRandomWithWeights(chains, weights);
  }
  if (action == "deploy" || action == "swap") {
    selectedChain = currentChain;
  }



  const merkely = ["arb", "matic", "bsc", "optimism", "base", "scroll", "manta", "mode", "ancient8", "zetachain", "redstone"];
  const debridge = ["arb", "matic", "bsc", "eth", "optimism", "base", "linea"];
  const lifi = ["arb", "matic", "bsc", "eth", "optimism", "base", "scroll", "mode"];
  let bridge = [0, 0, 0];

  if (merkely.includes(selectedChain) && merkely.includes(currentChain)) {
    bridge[0] = 1;
  } if (debridge.includes(selectedChain) && debridge.includes(currentChain)) {
    bridge[1] = 1;
  } if (lifi.includes(selectedChain) && lifi.includes(currentChain)) {
    bridge[2] = 1;
  }
  let randomIndex = Math.floor(Math.random() * bridge.length);
  while (bridge[randomIndex] == 0) {
    randomIndex = Math.floor(Math.random() * bridge.length);
  }

  let bridgeName = ["Merkely", "Debridge", "Lifi"];

  //console.log("Bridge Name:", bridgeName[randomIndex]);

  let timediff = dataTx.time > 35 ? Math.ceil(Math.random() * 5) : Math.ceil(Math.random() * 120);


  let dataTxx = {
    "chain": selectedChain,
    "action": action,
    "bridge": bridgeName[randomIndex],
    "time": timediff
  }
  console.log(dataTxx);
  return dataTxx;

}
currentChain = "base";
let c = 1;
async function main(datatxx) {
  
  let currentThing = selectThings({
    "chain": datatxx.chain,
    "time": datatxx.time
  });
  
  console.log(currentThing.chain);
  let chain = networkIdToName[currentThing.chain];
  console.log(currentThing);
  console.log("Chain:", chain);
  if (chain == 42161 && currentThing.bridge == "Debridge") {
    currentThing.bridge = Math.random() < 0.5 ? "Merkely" : "Lifi";
  }
  if (currentThing.action == "bridge") {

    await convertAllToEth(networkIdToName[currentChain], wallet_address);

    let EthBalance = await getEthBalance(wallet_address);
    let transferBalance = (EthBalance.mul(ethers.BigNumber.from(90)).div(ethers.BigNumber.from(100))).toString();
    EthBalance = EthBalance.toString();
    console.log("Eth Balance:", EthBalance);
    if (EthBalance == "0") {
      console.log("No Eth Balance");
      return;
    }
    console.log("Transfer Balance:", transferBalance);
    if (currentThing.bridge == "Merkely") {
      try{
      console.log("Merkelying");
      if (chain == 56 || chain == 137) {
        await transaction_alt_l1(currentChain, chain, transferBalance);
      }
      else {
        await transaction_l2(currentChain, chain, transferBalance)
      }
    }
    catch(error){
      console.log("Error in merkelying:",error);
    
    }
    }
    else if (currentThing.bridge == "Debridge") {
      try{
      console.log("Debridging");
      console.log("Current Chain:", networkIdToName[currentChain]);
      console.log("newchain:", chain);
      console.log(wallet_address)
      await _constructor(networkIdToName[currentChain], "0x0000000000000000000000000000000000000000", transferBalance, chain, "0x0000000000000000000000000000000000000000", wallet_address)
      }
      catch(error){
        console.log("Error in debridging:",error);
      }
    }
    else if (currentThing.bridge == "Lifi") {
      try{
      console.log("lifing");
      console.log("Current Chain:", networkIdToName[currentChain]);
      console.log("newchain:", chain);
      console.log(wallet_address)
      await _constructor_lifi(networkIdToName[currentChain], "0x0000000000000000000000000000000000000000", transferBalance, chain, "0x0000000000000000000000000000000000000000", wallet_address);
    }
    catch(error){
      console.log("Error in lifing:",error);
    }
  }
  }
  else if (currentThing.action == "deploy") {
    console.log("Deploying contract");
  } else {
    try {
      console.log("Swapping tokens");
      console.log("chain:", networkIdToName[currentChain],);
      let dest_Token = choseTopToken(networkIdToName[currentChain]);
      while (dest_Token == "0x0000000000000000000000000000000000000000") {
        dest_Token = choseTopToken(networkIdToName[currentChain]);
      }
      console.log("dest_Token:", dest_Token);
      let amountToSwap = await checkBalance("0x0000000000000000000000000000000000000000", wallet_address);
      amountToSwap = (amountToSwap.mul(ethers.BigNumber.from(80)).div(ethers.BigNumber.from(100))).toString()
      console.log("swapping amount = ",amountToSwap)
      await odos(networkIdToName[currentChain], 0.3, 0, true, "0x0000000000000000000000000000000000000000", dest_Token, amountToSwap, wallet_address);
    }
    catch (error) {
      console.log("Error in swapping tokens:", error);
    }
  }
  console.log("Current Chain:", currentChain);
  console.log("newchain:", chain);
  console.log("newchain:", currentThing.chain);
  if(currentThing.action == "bridge"){
  currentChain = currentThing.chain;
  }
  let dataTxx = {
    "chain": currentChain,
    "time": currentThing.time
  }
  c++;
  console.log("DataTxx:", dataTxx);
  console.log("currentThing.time",currentThing.time)
  await switchNetwork(chain);
  setTimeout(main, currentThing.time * 1000* 60, dataTxx);

}

async function main_test() {
  let dataTxx = {
    "chain": "base",
    "time": "1"
  }
  main(dataTxx);
}





//tester functions
// async function CHECKbalance() {
//   checkBalance("0x9de16c805a3227b9b92e39a446f9d56cf59fe640", wallet_address);
// }
// async function l2() {
//   transaction_l2(base_id, optimism_id, "0.0001");
// }
// async function l1() {
//   transaction_alt_l1(polygon_id, base_id, "0.0001");
// }
// async function debridge() {
//   _constructor(8453, "0x0000000000000000000000000000000000000000", "1000000000000000", 42161, "0x0000000000000000000000000000000000000000", wallet_address)
// }
// async function jumper() {
//   _constructor_lifi(8453, "0x0000000000000000000000000000000000000000", "1000000000000000", 42161, "0x0000000000000000000000000000000000000000", wallet_address)
// }
// async function odos_transaction() {
//   odos(8453, 0.3, 0, true, "0x0000000000000000000000000000000000000000", "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", "1000000000000000000", wallet_address)
// }

// async function getbalances_test() {
//   getMaxBalance(8453, wallet_address);
// }
// async function getbalance_test(){
//   console.log(await checkBalance("0x0000000000000000000000000000000000000000", wallet_address));
// }
// async function getPrice_test() {
//   getPrice("0x000000000x7ceb23fd6bc0add59e62ac25578270cff1b9f619");
// }
// async function convertAllToEth_test() {
//   convertAllToEth(8453, wallet_address);
// }

