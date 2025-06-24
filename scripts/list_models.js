const db = require('../config/db');

async function listModels() {
  const [rows] = await db.query('SELECT * FROM classification_models ORDER BY training_date DESC');
  console.log(rows);
  process.exit();
}

listModels();
