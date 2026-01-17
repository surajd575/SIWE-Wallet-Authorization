import { SiweMessage } from "siwe";
import crypto from "crypto";
import { storeNonce } from "../models/nonceStore.js";

export function createSiweMessage({ address, chainId, domain, uri}) {

const nonce = crypto.randomBytes(16).toString("hex");

storeNonce(address, nonce);

const message = new SiweMessage({

domain,
address,
statement: "Sign in Securely using your Ethereum wallet.",
uri,
version: "1",
chainId,
nonce,
issuedAt: new Date().toISOString(),
expirationTime: new Date(Date.now() + 5 * 60 * 1000).toISOString()

});

return message.prepareMessage();

}