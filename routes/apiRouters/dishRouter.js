import express from 'express';
import * as dishController from '../../controllers/phoneController.js';

const router = express.Router();

router.get('/get', dishController.getAllDish)
router.get('/show', dishController.getDish)
router.post('/add', dishController.addDish)
router.post('/edit', dishController.editDish)
router.post('/delete', dishController.deleteDish)

export default router;