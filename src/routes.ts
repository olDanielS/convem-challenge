import { Router } from "express";
import { handleGenerateQrCode } from "./controlers/QrcodePayments/handleGenerateQrCode";
import { handleWebhook } from "./controlers/WebHook/handleWebhook";
import {handleCreateClient} from "./controlers/Users/handleCreateClient";

const router = Router();
// =-=-=-- USER
router.post("/api/users", new handleCreateClient().execute)

// =-=-=-- QRCOD
router.post("/api/payment", new handleGenerateQrCode().execute)

// =-=-=-- Webhook
router.post("/api/webhook", new handleWebhook().execute)

router.get("/", (req, res) => {
   res.send("OK")
})

export {router};