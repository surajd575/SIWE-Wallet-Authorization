const nonceStore = new Map();

export function storeNonce(address, nonce) {

    nonceStore.set(address.toLowerCase(), {
        nonce, 
        expiresAt: Date.now() + 5 * 60 * 1000
     });
}

export function getNonce(address) {
    const entry = nonceStore.get(address.toLowerCase());
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
        nonceStore.delete(address.toLowerCase());
        return null;
    }

    return entry.nonce;
}

export function deleteNonce(address) {
    nonceStore.delete(address.toLowerCase());
}