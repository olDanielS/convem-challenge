import { Router } from "express";
import { handleGenerateQrCode } from "./controlers/handleGenerateQrCode";

const router = Router();

router.post("/api/payment/", new handleGenerateQrCode().execute)

export {router};