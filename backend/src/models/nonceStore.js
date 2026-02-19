const nonces = new Map();

export function storeNonce(address, nonce) {
  console.log("STORE NONCE:", address.toLowerCase(), nonce);
  nonces.set(address.toLowerCase(), nonce);
}

export function getNonce(address) {
  console.log("GET NONCE FOR:", address.toLowerCase());
  console.log("CURRENT NONCES:", nonces);
  return nonces.get(address.toLowerCase()) || null;
}

export function deleteNonce(address) {
  nonces.delete(address.toLowerCase());
}
