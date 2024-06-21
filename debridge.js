async function _constructor(src, src_token, src_amount, dest, dest_token,wallet_address) {

    const baseUrl = "https://api.dln.trade/v1.0/dln/order/create-tx";
    const queryParams ={
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
    if(response.ok){
    console.log('debridge Quote:', quote);
    console.log("tx: ",quote.tx)
    console.log("points: ",quote.actualUserPoints)
}
    else{
        console.log('There was a problem with the fetch operation:', error);
    }
    return quote;
}   
_constructor(42161,"0x0000000000000000000000000000000000000000","100000000000000000",8453,"0x0000000000000000000000000000000000000000","0xc0DEF418E6A13b78a5320b9C3331D2bf21ADD4f2")
