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
            //console.log('ODOS Quote:', quote);
            //console.log("the output amount is :", quote.outAmounts[0]);
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
        //console.log(pathId);

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
            //console.log('Transaction:', transaction);
            return await transaction;
        } else {
            console.error('Error in Transaction:', response);
            return;
        }
    }
    return await makeTransaction(_chainId, _slippage, _referral_code, _compact, _input_address, _output_address, _input_amount, _user_address)
}
(async () => {
let tx = await odos(42161, 0.3, 0, true, "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4", "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", "1000000000000000000", "0xc0DEF418E6A13b78a5320b9C3331D2bf21ADD4f2")
console.log("new \n\n",tx,"\n\n",tx.transaction);
})();