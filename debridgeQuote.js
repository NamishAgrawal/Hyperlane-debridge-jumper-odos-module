async function _constructor(src, src_token, src_amount, dest, dest_token) {

    const baseUrl = "https://api.dln.trade/v1.0/dln/order/quote";
    const queryParams ={
        srcChainId: src,
        srcChainTokenIn: src_token,
        srcChainTokenInAmount: src_amount,
        dstChainId: dest,
        dstChainTokenOut: dest_token,
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
    console.log('debridge Quote:', quote);
    return quote;
}
// fetch(`${url}?${params}`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Handle the response data here
//         console.log(data);
//     })
//     .catch(error => {
//         // Handle errors here
//         console.error('There was a problem with the fetch operation:', error);
//     });
_constructor(42161,"0x0000000000000000000000000000000000000000","100000000000000000",8453,"0x0000000000000000000000000000000000000000")
