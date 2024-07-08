# Hyperlane-debridge-jumper-odos-module

## Overview
**Hyperlane-debridge-jumper-odos-module** is a module under active development aimed at facilitating blockchain transactions across various chains using multiple bridges (Hyperlane, Debridge, Jumper, Odos). This approach is designed to randomize chain movements, mitigating bot detection risks and enhancing onchain activity footprint.

## Development Status
This project is currently in active development. The plan is to consolidate all modules into a single JavaScript file for streamlined deployment and execution.
**Update:** consolidated all of them in a single file(index.js)
## Features
- **Multi-Bridge Integration:** Utilize Hyperlane, Debridge, Jumper, and Odos for chain-to-chain transactions and activity.
- **Randomized Chain Switching:** Enhance security and avoid bot detection with randomized chain movements and random swaps and.
- **Onchain Footprint Optimization:** Maximize onchain activity to increase engagement and network presence.

## Roadmap (Future Plans)
~~ Consolidate modules into a single JavaScript file for browser based wallets.~~
- make a version using nodeJs for automatic trasactions.
- Conduct testing and optimization for performance and security.

## Usage ()
as of now just run the html file and click on the `connect wallet` button, then click on `main` button to start the process, use rabby wallet for a better exxperience due autoSwitching of networks in that, then it will keep on prompting with transaction you can either manually click to approve or use an autoclicker, if you want to reduce the time delay in the code, the line 828 in `index.js` you can change the function `setTimeout(main, currentThing.time * 1000* 60, dataTxx);`.    
