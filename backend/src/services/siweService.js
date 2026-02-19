import { SiweMessage } from "siwe";
import { ethers } from "ethers";

export function createSiweMessage({
  address,
  chainId,
  nonce,
  domain,
  uri
}) {
  const checksummedAddress = ethers.getAddress(address);

  const message = new SiweMessage({
    domain,
    address: checksummedAddress,
    statement: "Sign in securely using your Ethereum wallet.",
    uri,
    version: "1",
    chainId: Number(chainId),
    nonce,
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  });

  return message.prepareMessage();
}
