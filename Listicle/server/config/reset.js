// config/reset.js
import { pool } from '../config/database.js';
import './dotenv.js';
import giftData from '../data/gifts.js';

const createGiftsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      powers TEXT,
      universe TEXT,
      age TEXT,
      location TEXT,
      story TEXT,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 gifts table created successfully');
  } catch (err) {
    console.error('⚠️ error creating gifts table', err);
  }
};

const seedGiftsTable = async () => {
  await createGiftsTable();

  const insertText = `
    INSERT INTO gifts
      (name, powers, universe, age, location, story, image, description, submittedBy, submittedOn)
    VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  `;

  try {
    for (const gift of giftData) {
      const values = [
        gift.name,
        gift.powers ?? null,
        gift.universe ?? null,
        gift.age ?? null,
        gift.location ?? null,
        gift.story ?? null,
        gift.image,
        gift.description,
        gift.submittedBy,
        gift.submittedOn, // 'YYYY-MM-DD' is fine for TIMESTAMP
      ];

      // quick guard to avoid NOT NULL issues
      if (!gift.name || !gift.image || !gift.description || !gift.submittedBy || !gift.submittedOn) {
        throw new Error(`Missing required fields for "${gift.name ?? 'unknown'}"`);
      }

      await pool.query({ text: insertText, values });
      console.log(`✅ ${gift.name} added successfully`);
    }
    console.log('🌱 Seed complete');
  } catch (err) {
    console.error('⚠️ error inserting gift', err);
  } finally {
    await pool.end();
  }
};

seedGiftsTable();
