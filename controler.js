// start at base
// let currentChain = "base";
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
    //console.log("Action:", action);

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
    //console.log("Selected Chain:", selectedChain);


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
    //console.log("Bridge:", bridge);
    //console.log("Bridge Name:", bridgeName[randomIndex]);

    let timediff = dataTx.time > 35 ? Math.ceil(Math.random() * 5) : Math.ceil(Math.random() * 120);

    //console.log("Time Difference:", timediff);

    let dataTxx = {
        "chain": selectedChain,
        "action": action,
        "bridge": bridgeName[randomIndex],
        "time": timediff
    }
    console.log(dataTxx);
    return selectThings(dataTxx);

}

console.log(selectThings({
    "chain": "base",
    "time": 0
}));

