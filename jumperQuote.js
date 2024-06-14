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
    return await getQuote(url);
}
async function getQuote(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: { 'accept': 'application/json' },
    })
    const quote = await response.json();
    console.log('lifi Quote:', quote);
    console.log('estimated out: ', quote.estimate.toAmount)
    console.log("values for transaction: ",quote.transactionRequest)
    return quote;
}
_constructor_lifi(42161,"0x0000000000000000000000000000000000000000","100000000000000000",8453,"0x0000000000000000000000000000000000000000","0xc0DEF418E6A13b78a5320b9C3331D2bf21ADD4f2")
