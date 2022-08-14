import express from 'express'
import os from 'os'
import multer from 'multer'
import { classify, TrainData } from '../controllers/TrainController.js'
const upload = multer({ dest: os.tmpdir() })
const router = express.Router()


router.post('/train', upload.single('file'), TrainData)
router.post('/classify', classify)

export default router