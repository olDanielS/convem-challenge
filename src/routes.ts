import { Router } from "express";
import { HandleGenerateQrCode } from "./controlers/QrcodePayments/handleGenerateQrCode";
import {handleCreateClient} from "./controlers/Users/handleCreateClient";

import { HandleWithdrawal } from "./controlers/Withdrawal/handleWithdrawal";

import { handleWebhookDeposit } from "./controlers/WebHook/handleWebhookDeposit";
import { handleWebhookWithdrawal } from "./controlers/WebHook/handleWebhookWithdrawal";


const router = Router();
// =-=-=-- USER
router.post("/api/users", new handleCreateClient().execute)

// =-=-=-- PAYMENTS
router.post("/api/payment", new HandleGenerateQrCode().execute)
router.post("/api/payment/withdrawal", new HandleWithdrawal().execute)


// =-=-=-- Webhook
router.post("/api/webhook/deposit", new handleWebhookDeposit().execute)
router.post("/api/webhook/withdrawal", new handleWebhookWithdrawal().execute)

router.get("/", (req, res) => {
   res.send("OK")
})

export {router};