import express from 'express';
import * as phoneController from '../../controllers/phoneController.js';

const router = express.Router();

router.post('/get-phone', phoneController.getPhones)
router.get('/assistant-phone', phoneController.getAssistantPhone)
router.post('/call-outbound', phoneController.callOutbound)
router.post('/buy-phone', phoneController.buyPhones)
router.post('/in-bound', phoneController.inBound)

export default router;