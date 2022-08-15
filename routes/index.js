import express from 'express'
import os from 'os'
import multer from 'multer'
import { classify, testData, TrainData } from '../controllers/TrainController.js'
const upload = multer({ dest: os.tmpdir() })
const router = express.Router()


router.post('/train', upload.single('file'), TrainData)
router.post('/classify', classify)
router.post('/test', upload.single('file'), testData)

export default router