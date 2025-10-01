import { pool } from '../config/database.js'
import giftData from '../data/gifts.js'


const getGifts = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
    return res.status(200).json(results.rows)
  } catch (err) {
    // If DB is unavailable, fall back to local static data
    console.warn('DB query failed, falling back to local data:', err && err.message)
    return res.status(200).json(giftData)
  }
}

export default {
  getGifts
}

