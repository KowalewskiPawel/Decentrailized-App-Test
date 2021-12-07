import { useState } from "react";
import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greeterAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

function App() {
  const [greeting, setGreetingValue] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum === "undefined") return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

    try {
      const data = await contract.greet();
      console.log(`data: ${data}`);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  async function setGreeting() {
    if (!greeting || typeof window.ethereum === "undefined") return;

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
    const transaction = await contract.setGreeting(greeting);
    setGreetingValue("");
    await transaction.wait();
    fetchGreeting();
  }

  return (
    <>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreeting}>Set Greeting</button>
      <input
        onChange={(e) => setGreetingValue(e.target.value)}
        placeholder='Set greeting'
        value={greeting}
      />
    </>
  );
}

export default App;
