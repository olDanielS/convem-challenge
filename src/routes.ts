import { Router } from "express";
import { handleGenerateQrCode } from "./controlers/handleGenerateQrCode";
import { handleWebhook } from "./controlers/handleWebhook";

const router = Router();

router.post("/api/payment/", new handleGenerateQrCode().execute)

router.post("/api/webhook/", new handleWebhook().execute)

router.get("/", (req, res) => {
   res.send("OK")
})

export {router};