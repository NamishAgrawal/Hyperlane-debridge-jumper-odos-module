fetch("https://mainnet.base.org/", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.5",
      "cache-control": "max-age=0",
      "content-type": "application/json",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Brave\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "sec-gpc": "1",
      "Referer": "https://renzo.hyperlane.xyz/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "{\"method\":\"eth_call\",\"params\":[{\"to\":\"0x584ba77ec804f8b6a559d196661c0242c6844f49\",\"data\":\"0x70a08231000000000000000000000000dd2a4dbf3fdc4ae3b34a11797f51350a4306f1bb\"},\"latest\"],\"id\":42,\"jsonrpc\":\"2.0\"}",
    "method": "POST"
  }).then(response => response.json()).then(console.log);