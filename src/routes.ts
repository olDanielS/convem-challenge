import { Router } from "express";
import { HandleDepositController } from "./controlers/deposit/handleDepositController";
import {handleCreateClient} from "./controlers/Users/handleCreateClient";

import { HandleTransferController } from "./controlers/transfer/handleTransferController";

import { HandleWebhookDeposit } from "./services/WebHook/handleWebhookDeposit";
import { HandleWebhookTransfer } from "./services/WebHook/handleWebhookTransfer";


const router = Router();
// =-=-=-- USER
router.post("/api/users", new handleCreateClient().execute)

// =-=-=-- PAYMENTS
router.post("/api/payment/deposit", new HandleDepositController().execute)
router.post("/api/payment/transfer", new HandleTransferController().execute)

// =-=-=-- Webhook
router.post("/api/webhook/deposit", new HandleWebhookDeposit().execute)
router.post("/api/webhook/transfer", new HandleWebhookTransfer().execute)

router.get("/", (req, res) => {
   res.send("OK")
})

export {router};