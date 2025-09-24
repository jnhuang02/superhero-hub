import express from 'express'
import path from 'path'

import { fileURLToPath } from 'url'
import giftData from '../data/gifts.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()


router.get('/', (req, res) => {
  res.status(200).json(giftData)
})

// API endpoint for individual gift data
router.get('/api/:giftId', (req, res) => {
  const giftId = parseInt(req.params.giftId)
  const gift = giftData.find(g => g.id === giftId)
  
  if (gift) {
    res.status(200).json(gift)
  } else {
    res.status(404).json({ error: 'Gift not found' })
  }
})

// Serve the detail page HTML
router.get('/:giftId', (req, res) => {
  const giftId = parseInt(req.params.giftId)
  const gift = giftData.find(g => g.id === giftId)
  
  if (gift) {
    res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
  } else {
    // Serve the 404.html file
    res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'))
  }
})

export default router

