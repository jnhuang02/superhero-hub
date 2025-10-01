import express from 'express'
import path from 'path'
import GiftsController from '../controllers/gifts.js'

import { fileURLToPath } from 'url'
import giftData from '../data/gifts.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()


router.get('/', GiftsController.getGifts)


// API endpoint for individual gift data
router.get('/3001/:giftId', (req, res) => {
  const raw = req.params.giftId
  // Only accept strictly numeric IDs
  if (!/^\d+$/.test(raw)) {
    return res.status(404).json({ error: 'Gift not found' })
  }
  const giftId = parseInt(raw, 10)
  const gift = giftData.find(g => g.id === giftId)
  
  if (gift) {
    res.status(200).json(gift)
  } else {
    res.status(404).json({ error: 'Gift not found' })
  }
})

// Serve the detail page HTML
router.get('/:giftId', (req, res) => {
  const raw = req.params.giftId
  // Strict numeric check to avoid parsing '1is' as 1
  if (!/^\d+$/.test(raw)) {
    return res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'))
  }

  const giftId = parseInt(raw, 10)
  const gift = giftData.find(g => g.id === giftId)
  
  if (gift) {
    res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
  } else {
    // Serve the 404.html file
    res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'))
  }
})

export default router

