import express from "express";
import { createSiweMessage } from "../services/siweService.js";

const router = express.Router();

router.post("/siwe", (req, res) => {

const { address, chainId } = req.body;

if (!address || !chainId) {

    return res.status(400).json({error: "Address and chainId Required"})

}

const message = createSiweMessage({
    address,
    chainId,
    domain: process.env.DOMAIN,
    uri: `http://${process.env.DOMAIN}:${process.env.PORT}`
});

res.json({message});


});

export default router;