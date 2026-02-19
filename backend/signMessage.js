import { ethers } from "ethers";

const PRIVATE_KEY = "b6e31fc417757d4bdbed2ad3c152ab1ec66acc21640008515def03d08f8d5549";
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const message = `localhost wants you to sign in with your Ethereum account:\n0xfa33eE1E498b7605cF9C5Dfa2624e21528Ee315B\n\nSign in securely using your Ethereum wallet.\n\nURI: http://localhost:3000\nVersion: 1\nChain ID: 11155111\nNonce: 3b18fbb7a29461c166d84c1a0f5af5ec\nIssued At: 2026-01-30T22:26:27.861Z\nExpiration Time: 2026-01-30T22:31:27.863Z`;


const signature = await wallet.signMessage(message);
console.log("Signature:", signature);
