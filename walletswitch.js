const switchNetwork = async (networkId) => {
    try {
      // Ensure the MetaMask provider is available
      if (!window.ethereum) {
        console.error("MetaMask provider not found");
        return;
      }
  
      // Request switching to the desired network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${networkId.toString(16)}` }], // Convert networkId to hex format
      });
  
      // Optionally, you can listen for network change events
      window.ethereum.on('chainChanged', (chainId) => {
        console.log(`Switched to chainId: ${chainId}`);
        alert(`Switched to chainId: ${chainId}`);
      });
  
      console.log(`Switched to networkId: ${networkId}`);
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };
  