import express from "express";
import crypto from "crypto";
import { SiweMessage } from "siwe";
import jwt from "jsonwebtoken";

import { createSiweMessage } from "../services/siweService.js";
import { storeNonce, getNonce, deleteNonce} from "../models/nonceStore.js";


const router = express.Router();

router.post("/siwe", (req, res) => {
  const { address, chainId } = req.body;

  if (!address || !chainId) {
    return res.status(400).json({ error: "Missing Fields" });
  }

  const nonce = crypto.randomBytes(16).toString("hex");

  storeNonce(address, nonce);

  console.log("SIWE_URI =", JSON.stringify(process.env.SIWE_URI));
  const message = createSiweMessage({ 
    address, 
    chainId,
    nonce,
    domain: process.env.DOMAIN,
    uri: process.env.SIWE_URI });

  res.json({ message });
});

/**
 * 2. Verify Route
 * 
 */

router.post("/verify", async (req,res) => {

  const {message, signature} = req.body;

  try {
    const siweMessage = new SiweMessage(message);
    await siweMessage.verify({signature});
    const storedNonce = getNonce(siweMessage.address);

    if (!storedNonce || storedNonce !== siweMessage.nonce) {
      return res.status(401).json({ error: "Invalid nonce"});
    }

    deleteNonce(siweMessage.address);

    const token = jwt.sign(
      { address: siweMessage.address},
      process.env.JWT_SECRET,
      {expriesIn: "1h"}
    );

    res.json ({ token });
  } catch (err) {
    res.status(401),json({ error: "SIWE verification failed"});
  }

})

export default router;
