export async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected accounts:", accounts);
      return accounts[0];
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw new Error(error.message || "Failed to connect wallet");
    }
  }
  
  export async function checkWalletConnection() {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        console.log("Wallet is connected:", accounts[0]);
        return accounts[0];
      }
      console.log("No wallet connected");
      return null;
    } catch (error) {
      console.error("Error checking connection:", error);
      throw new Error(error.message || "Failed to check wallet connection");
    }
  }
  
  export async function reconnectWallet() {
    try {
      const accounts = await window.ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
      console.log("Reconnected accounts:", accounts);
      return accounts[0];
    } catch (error) {
      console.error("Error reconnecting wallet:", error);
      throw new Error(error.message || "Failed to reconnect wallet");
    }
  }
  